// Best-Sborka custom items — Minecraft Forge 1.19.2
// Textures: kubejs/assets/kubejs/textures/item/<id>.png
// Russian names: kubejs/assets/kubejs/lang/ru_ru.json
StartupEvents.registry('item', event => {

  // IC2 Experimental 1.12.2 Energy Crystal route (see docs/recipe-changes.md)
  event.create('energium_dust')
    .displayName('Energium Dust')

  // IC2 Experimental 1.12.2 "plate" system (IC2C 1.19.2 has no iron plates)
  event.create('iron_plate')
    .displayName('Iron Plate')
    .tag('forge:plates')
    .tag('forge:plates/iron')

  // IC2 Experimental 1.12.2 Forge Hammer (IC2C 1.19.2 has none). 80 uses.
  event.create('forge_hammer')
    .maxDamage(80)
    .parentModel('minecraft:item/handheld')
    .displayName('Forge Hammer')
    .tag('forge:tools')
})
