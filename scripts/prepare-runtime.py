"""Prepare this checkout's private Apple Silicon Blender runtime."""

import argparse
import hashlib
import json
import platform
import subprocess
import tempfile
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / "runtime"


def download(url, target, sha256, byte_limit):
    subprocess.run([
        "/usr/bin/curl", "-q", "--fail", "--silent", "--show-error", "--location",
        "--proto", "=https", "--proto-redir", "=https", "--max-time", "420",
        "--max-filesize", str(byte_limit), "--output", str(target), url,
    ], check=True, timeout=425)
    digest = hashlib.sha256()
    with target.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    if digest.hexdigest() != sha256:
        raise ValueError(f"SHA-256 mismatch: {target.name}")


def copy_blender(source, destination):
    if not source.is_dir() or not (source / "Contents/Info.plist").is_file():
        raise ValueError(f"Expected a Blender.app bundle at {source}")
    subprocess.run(["/bin/cp", "-cRp", str(source), str(destination)], check=True, timeout=180)


def verify(stage):
    subprocess.run([
        "/usr/bin/codesign", "--verify", "--deep", "--strict", str(stage / "runtime/Blender.app"),
    ], check=True, timeout=120)
    subprocess.run([
        "node", "--input-type=module", "-e",
        "import {verifyRuntime} from './src/engine.js'; await verifyRuntime(process.argv[1]);",
        str(stage),
    ], cwd=ROOT, check=True, timeout=120)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--blender-app", type=Path, help="reuse the exact official Blender.app instead of downloading the DMG")
    args = parser.parse_args()
    manifest = json.loads((RUNTIME / "manifest.json").read_text())
    if (platform.system(), platform.machine()) != ("Darwin", "arm64"):
        raise ValueError("The runtime is for Apple Silicon macOS only.")

    app, vendor = RUNTIME / "Blender.app", RUNTIME / "vendor"
    with tempfile.TemporaryDirectory(prefix=".prepare-", dir=RUNTIME) as directory:
        # A separate, fixed name prevents two setup processes from installing over each other.
        lock = RUNTIME / ".prepare-lock"
        lock.mkdir()
        try:
            if any(path.exists() or path.is_symlink() for path in (app, vendor)):
                if not all(path.is_dir() and not path.is_symlink() for path in (app, vendor)):
                    raise ValueError("Incomplete runtime. Move aside the existing runtime/Blender.app or runtime/vendor and retry.")
                verify(ROOT)
                print("Existing runtime verified.")
                return

            stage = Path(directory)
            payload = stage / "runtime"
            payload.mkdir()
            (payload / "manifest.json").symlink_to(RUNTIME / "manifest.json")
            (stage / "assets").symlink_to(ROOT / "assets", target_is_directory=True)
            staged_app, staged_vendor = payload / app.name, payload / vendor.name
            if args.blender_app:
                copy_blender(args.blender_app.resolve(strict=True), staged_app)
            else:
                image = stage / "Blender.dmg"
                print(f"Downloading official Blender {manifest['blenderVersion']} for Apple Silicon…", flush=True)
                download(manifest["source"], image, manifest["upstreamSha256"], 512 * 1024 * 1024)
                mount = stage / "mount"
                mount.mkdir()
                subprocess.run([
                    "/usr/bin/hdiutil", "attach", "-readonly", "-nobrowse", "-mountpoint",
                    str(mount), str(image),
                ], check=True, timeout=120)
                try:
                    copy_blender(mount / "Blender.app", staged_app)
                finally:
                    subprocess.run(["/usr/bin/hdiutil", "detach", str(mount)], check=True, timeout=90)
                image.unlink()

            wheels = json.loads((ROOT / "legal/python-wheels.json").read_text())
            staged_vendor.mkdir()
            for wheel in wheels:
                archive = stage / wheel["file"]
                download(wheel["url"], archive, wheel["sha256"], wheel["bytes"])
                with zipfile.ZipFile(archive) as contents:
                    contents.extractall(staged_vendor)
                archive.unlink()

            verify(stage)
            staged_app.rename(app)
            try:
                staged_vendor.rename(vendor)
            except OSError:
                app.rename(staged_app)
                raise
            print(f"Verified Blender {manifest['blenderVersion']} and CAD dependencies in {RUNTIME}.")
        finally:
            lock.rmdir()


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, subprocess.SubprocessError) as error:
        raise SystemExit(f"Runtime setup failed: {error}") from error
