// Final block of the pack (issue #26). Texture: kubejs/assets/kubejs/textures/block/build_core.png
// Russian name: kubejs/assets/kubejs/lang/ru_ru.json
StartupEvents.registry('block', event => {
  event.create('build_core')
    .displayName('Build Core')
    .material('metal')
    .hardness(50.0)
    .resistance(1200.0)
    .lightLevel(0.8)
    .requiresTool(true)
    .tagBlock('minecraft:mineable/pickaxe')
    .tagBlock('minecraft:needs_diamond_tool')
})
