# Best-Sborka Machines

Forge 1.19.2 addon for IC2 Classic. Adds the **Metal Former** from IC2 Experimental 1.12.2 with its three modes
(rolling, extruding, cutting). The mode is switched with a button in the machine GUI.

Recipes are not hard-coded: they are IC2 datapack JSON files (same format as IC2C compressor recipes):

```
data/<namespace>/ic2_recipes/metal_former_rolling/<name>.json
data/<namespace>/ic2_recipes/metal_former_extruding/<name>.json
data/<namespace>/ic2_recipes/metal_former_cutting/<name>.json
```

The pack's recipes live in `kubejs/data/ic2/ic2_recipes/` in the repository root.

## Build

CI builds it (`.github/workflows/build-bs-machines.yml`) and publishes the jar to the
`bs-machines-latest` release. Local build: JDK 17, `./gradlew build`, jar in `build/libs/`.

## Credits and license

Project structure and IC2 integration patterns follow **IC2C Extras** by Trinsdar
(https://github.com/Trins-mods/Ic2-Classic-Extras, LGPL-3.0). This mod is therefore LGPL-3.0-or-later.
Block textures are from IC2 Experimental 1.12.2.
