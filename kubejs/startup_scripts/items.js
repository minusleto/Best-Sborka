// Best-Sborka custom items — Minecraft Forge 1.19.2
// Textures: kubejs/assets/kubejs/textures/item/<id>.png
// Russian names: kubejs/assets/kubejs/lang/ru_ru.json
StartupEvents.registry('item', event => {

  // IC2 Experimental 1.12.2 Energy Crystal route (see docs/recipe-changes.md)
  event.create('energium_dust')
    .displayName('Energium Dust')

  // IC2 Experimental 1.12.2 lapis dust (IC2C has none). Made in the macerator,
  // used by the Lapotron Crystal recipe.
  event.create('lapis_dust')
    .displayName('Lapis Lazuli Dust')
    .tag('forge:dusts')
    .tag('forge:dusts/lapis')

  // IC2 Experimental 1.12.2 "plate" system (IC2C 1.19.2 has no iron plates)
  event.create('iron_plate')
    .displayName('Iron Plate')
    .tag('forge:plates')
    .tag('forge:plates/iron')

  // More IC2 Experimental 1.12.2 plates (made by hammer or in the Metal Former)
  const plates = {
    copper: 'Copper Plate',
    tin: 'Tin Plate',
    bronze: 'Bronze Plate',
    gold: 'Gold Plate',
    // Not in IC2 1.12.2: aluminium replaces tin in the composite recipe
    aluminium: 'Aluminium Plate'
  }
  Object.keys(plates).forEach(metal => {
    event.create(metal + '_plate')
      .displayName(plates[metal])
      .tag('forge:plates')
      .tag('forge:plates/' + metal)
  })

  // IC2 Experimental 1.12.2 Tin Item Casing (IC2C 1.19.2 and IC2C Extras have none).
  // Used by the Electric Motor, Canner, RE Battery, Fluid Cell... in 1.12.2 (see docs/recipe-changes.md).
  event.create('tin_item_casing')
    .displayName('Tin Item Casing')
    .tag('forge:casings')
    .tag('forge:casings/tin')

  // IC2 Experimental 1.12.2 Forge Hammer (IC2C 1.19.2 has none). 80 uses.
  event.create('forge_hammer')
    .maxDamage(80)
    .parentModel('minecraft:item/handheld')
    .displayName('Forge Hammer')
    .tag('forge:tools')

  // IC2 Experimental 1.12.2 Cutter (wire cutters): cuts plates into cables.
  // Durability 60 as in 1.12.2 (ItemToolCutter).
  event.create('wire_cutters')
    .maxDamage(60)
    .parentModel('minecraft:item/handheld')
    .displayName('Wire Cutters')
    .tag('forge:tools')
})
