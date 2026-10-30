// Final block of the pack and the unique components of its recipe (issue #26).
// Textures: kubejs/assets/kubejs/textures/{block,item}/<id>.png (the block texture is animated).
// Russian names: kubejs/assets/kubejs/lang/ru_ru.json
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

StartupEvents.registry('item', event => {
  // Unique components of the Build Core recipe. Recipes: kubejs/server_scripts/final_core.js
  event.create('iridium_matrix').displayName('Iridium Matrix')
  event.create('singularity_matrix').displayName('Singularity Matrix')
  event.create('solar_heart').displayName('Solar Heart')
  event.create('quantum_drive').displayName('Quantum Drive')
  event.create('gravity_core').displayName('Gravity Core')
  event.create('matter_core').displayName('Matter Core')
  event.create('void_heart').displayName('Void Heart')
})
