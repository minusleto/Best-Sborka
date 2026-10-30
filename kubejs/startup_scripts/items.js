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
    lead: 'Lead Plate',
    // Not in IC2 1.12.2: aluminium replaces tin in the composite recipe
    aluminium: 'Aluminium Plate'
  }
  Object.keys(plates).forEach(metal => {
    event.create(metal + '_plate')
      .displayName(plates[metal])
      .tag('forge:plates')
      .tag('forge:plates/' + metal)
  })

  // IC2 Experimental 1.12.2 item casings (IC2C 1.19.2 and IC2C Extras have none).
  // 1.12.2 also has a steel casing; there is no steel in this pack, so it is skipped.
  // Used by the Electric Motor, Canner, RE Battery, Fluid Cell... in 1.12.2 (see docs/recipe-changes.md).
  const casings = {
    copper: 'Copper Item Casing',
    tin: 'Tin Item Casing',
    bronze: 'Bronze Item Casing',
    gold: 'Gold Item Casing',
    iron: 'Iron Item Casing',
    lead: 'Lead Item Casing'
  }
  Object.keys(casings).forEach(metal => {
    event.create(metal + '_item_casing')
      .displayName(casings[metal])
      .tag('forge:casings')
      .tag('forge:casings/' + metal)
  })

  // IC2 Experimental 1.12.2 Electric Motor (IC2C 1.19.2 has none): 2 coils + 2 tin casings + iron ingot.
  event.create('electric_motor')
    .displayName('Electric Motor')

  // IC2 Experimental 1.12.2 Forge Hammer (IC2C 1.19.2 has none). 80 uses.
  event.create('forge_hammer')
    .maxDamage(80)
    .parentModel('minecraft:item/handheld')
    .displayName('Forge Hammer')
    .tag('forge:tools')

  // Late-game materials from the IC2 Additions 1.12.2 mod (schakaloff), adapted to crafting-table
  // recipes (the mod makes them in its own Advanced Assembler). See docs/recipe-changes.md.
  const additions = {
    carbon_sheathing: 'Carbon Sheathing',
    nano_sheathing: 'Nano Sheathing',
    quantum_sheathing: 'Quantum Sheathing',
    advanced_coil: 'Advanced Coil',
    nano_coil: 'Nano Coil',
    quantum_coil: 'Quantum Coil',
    advanced_electric_motor: 'Advanced Electric Motor',
    nano_electric_motor: 'Nano Electric Motor',
    quantum_electric_motor: 'Quantum Electric Motor',
    hybrid_circuit: 'Hybrid Circuit',
    nano_circuit: 'Nano Circuit',
    quantum_circuit: 'Quantum Circuit',
    quantum_core: 'Quantum Core'
  }
  Object.keys(additions).forEach(id => {
    event.create(id).displayName(additions[id])
  })
})
