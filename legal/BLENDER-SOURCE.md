# Blender corresponding source

The Apple Silicon installation archive contains the unmodified official
Blender **4.5.15 LTS** distribution, build
`5afeabba6097c311e11a3845dadf0f709adadeed`. The original macOS signature,
copyright notices and dependency licenses are retained in `runtime/Blender.app`.
Blender is provided under [GPL-3.0-or-later](GPL-3.0-or-later.txt).

- [Download the matching Blender source archive](https://download.blender.org/source/blender-4.5.15.tar.xz).
  SHA-256: `9c72bf73b5bf59890fd44e1320c3af308a2998db0cb330d68d5bd54cc8687e06`.
  The same revision is available in [Blender's source repository](https://github.com/blender/blender/tree/5afeabba6097c311e11a3845dadf0f709adadeed).
- [Library source URLs, versions and hashes for this exact revision](https://github.com/blender/blender/blob/5afeabba6097c311e11a3845dadf0f709adadeed/build_files/build_environment/cmake/versions.cmake)
  and the [build recipes and patches](https://github.com/blender/blender/tree/5afeabba6097c311e11a3845dadf0f709adadeed/build_files/build_environment)
  are also in the source archive. Use the [upstream macOS dependency build instructions](https://developer.blender.org/docs/handbook/release_process/build/macos/)
  to build them from source. The [matching macOS arm64 library build record](https://projects.blender.org/blender/lib-macos_arm64/commit/d0c2b138fad5b8e3d506966a2fa3e1cfa8c0067f)
  is pinned by the Blender release tree.
- [Original macOS disk image and upstream checksums](https://download.blender.org/release/Blender4.5/)
  identify the binary copied into the plugin; see also `runtime/manifest.json`.

The plugin's GPL Blender worker is included as readable Python source under
`worker/` and `skills/studio-space-review/scripts/`. The pure Python DXF
dependencies and their notices are in `runtime/vendor/`; their pinned
upstream packages are listed in [python-wheels.json](python-wheels.json).
The exact plugin source is available from the tag on the download page.
