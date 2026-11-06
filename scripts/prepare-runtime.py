"""Prepare the private Blender runtime and its local resource files."""

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


def verify_download(target, sha256, byte_limit):
    if target.stat().st_size > byte_limit:
        raise ValueError(f"File exceeds size limit: {target.name}")
    digest = hashlib.sha256()
    with target.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    if digest.hexdigest() != sha256:
        raise ValueError(f"SHA-256 mismatch: {target.name}")


def download(url, target, sha256, byte_limit):
    subprocess.run([
        "/usr/bin/curl", "-q", "--fail", "--silent", "--show-error", "--location",
        "--proto", "=https", "--proto-redir", "=https", "--max-time", "420",
        "--max-filesize", str(byte_limit), "--output", str(target), url,
    ], check=True, timeout=425)
    verify_download(target, sha256, byte_limit)


def prepare_assets(stage, manifest, args):
    # Match only the pinned resource bytes, regardless of the upstream ZIP layout.
    pending = {}
    for entry in manifest["entries"]:
        relative = Path(entry["path"])
        if relative.parts[0] == "assets":
            if ".." in relative.parts or "link" in entry:
                raise ValueError("Invalid resource manifest path")
            pending.setdefault((entry["bytes"], entry["sha256"]), []).append(relative)

    def save(data, key):
        for relative in pending.pop(key, []):
            destination = stage / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)

    if args.assets_dir:
        for key, paths in list(pending.items()):
            source = args.assets_dir / Path(*paths[0].parts[1:])
            verify_download(source, key[1], key[0])
            save(source.read_bytes(), key)
    else:
        for source in json.loads((ROOT / "legal/asset-sources.json").read_text()):
            limit = source.get("archiveBytes", 8 * 1024 * 1024)
            local_zip = args.furniture_zip if source["id"] == "kenney-furniture-kit" else None
            archive = local_zip or (stage / (source["id"] + ".zip"))
            if local_zip:
                verify_download(archive, source["archiveSha256"], limit)
            else:
                try:
                    download(source["downloadUrl"], archive, source["archiveSha256"], limit)
                except subprocess.SubprocessError as error:
                    raise ValueError(
                        f"Cannot download {source['id']}. See README for local asset setup."
                    ) from error
            sizes = {size for size, _ in pending}
            with zipfile.ZipFile(archive) as contents:
                for item in contents.infolist():
                    if not item.is_dir() and item.file_size in sizes:
                        data = contents.read(item)
                        save(data, (len(data), hashlib.sha256(data).hexdigest()))
            if not local_zip:
                archive.unlink()
    if pending:
        raise ValueError("Missing verified resources: " + ", ".join(
            str(path) for paths in pending.values() for path in paths))


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
    assets_input = parser.add_mutually_exclusive_group()
    assets_input.add_argument("--assets-dir", type=Path, help="reuse a complete local assets directory")
    assets_input.add_argument("--furniture-zip", type=Path, help="use the official Furniture Kit ZIP downloaded manually")
    args = parser.parse_args()
    manifest = json.loads((RUNTIME / "manifest.json").read_text())
    if (platform.system(), platform.machine()) != ("Darwin", "arm64"):
        raise ValueError("The runtime is for Apple Silicon macOS only.")

    app, vendor, assets = RUNTIME / "Blender.app", RUNTIME / "vendor", ROOT / "assets"
    with tempfile.TemporaryDirectory(prefix=".prepare-", dir=RUNTIME) as directory:
        # A separate, fixed name prevents two setup processes from installing over each other.
        lock = RUNTIME / ".prepare-lock"
        lock.mkdir()
        try:
            has_runtime = any(path.exists() or path.is_symlink() for path in (app, vendor))
            if has_runtime:
                if not all(path.is_dir() and not path.is_symlink() for path in (app, vendor)):
                    raise ValueError("Incomplete runtime. Move aside the existing runtime/Blender.app or runtime/vendor and retry.")
            has_assets = assets.exists() or assets.is_symlink()
            if has_assets and (not assets.is_dir() or assets.is_symlink()):
                raise ValueError("Expected assets to be a real directory.")

            stage = Path(directory)
            targets = []
            if not has_assets:
                prepare_assets(stage, manifest, args)
                targets.append(assets)
            if not has_runtime:
                staged_app, staged_vendor = stage / app.name, stage / vendor.name
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
                targets.extend((app, vendor))

            installed = []
            try:
                for target in targets:
                    if target.exists() or target.is_symlink():
                        raise ValueError(f"Local setup will not replace {target}.")
                    (stage / target.name).rename(target)
                    installed.append(target)
                verify(ROOT)
            except BaseException:
                for target in reversed(installed):
                    target.rename(stage / target.name)
                raise
            print(f"Verified Blender {manifest['blenderVersion']}, CAD dependencies and local resources.")
        finally:
            lock.rmdir()


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, subprocess.SubprocessError) as error:
        raise SystemExit(f"Runtime setup failed: {error}") from error
