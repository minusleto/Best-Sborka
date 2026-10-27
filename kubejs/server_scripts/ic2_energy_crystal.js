// Best-Sborka — IC2 Classic recipe balance
// Minecraft Forge 1.19.2
// Full change log with checkboxes: docs/recipe-changes.md

ServerEvents.recipes(event => {

  // ---------------------------------------------------------------
  // Energy Crystal  (IC2 Experimental 1.12.2 route)
  // 4 IC2 diamond dust + 5 redstone -> 9 Energium Dust (crafting table)
  // 9 Energium Dust -> 1 Energy Crystal (compressor, see
  // kubejs/data/ic2/ic2_recipes/compressor/energium_dust.json)
  // IDs checked against IC2Classic 2.1.3.4 JAR.
  // ---------------------------------------------------------------
  event.remove({ output: 'ic2:energy_crystal' })

  event.shaped(
    '9x kubejs:energium_dust',
    [
      'RDR',
      'DRD',
      'RDR'
    ],
    {
      R: 'minecraft:redstone',
      D: 'ic2:dust_diamond'
    }
  )

  // Energium Dust is also used for glass fibre cable in IC2 Experimental 1.12.2.
  // 6 glass + 1 silver dust + 1 Energium Dust -> 6 glass fibre cables.
  event.remove({ output: 'ic2:glass_cable_item' })
  event.shaped('6x ic2:glass_cable_item', ['GGG', 'DSD', 'GGG'], {
    G: 'minecraft:glass',
    D: 'kubejs:energium_dust',
    S: 'ic2:dust_silver'
  })

  // ---------------------------------------------------------------
  // Iron plate + Forge Hammer  (IC2 Experimental 1.12.2 "plate" system)
  // IC2C 1.19.2 has no iron plates, no hammer and no Metal Former machine.
  //  - Forge Hammer: 5 iron ingots + 2 sticks (1.12.2 layout, both mirrors)
  //  - Iron Plate:   iron ingot + hammer (hammer loses 1 durability), shapeless
  //  - Iron Plate:   iron ingot in the Compressor (stand-in for Metal Former
  //    "rolling"): kubejs/data/ic2/ic2_recipes/compressor/iron_plate.json
  // ---------------------------------------------------------------
  const hammerKeys = { I: 'minecraft:iron_ingot', S: 'minecraft:stick' }
  event.shaped('kubejs:forge_hammer', ['II ', 'ISS', 'II '], hammerKeys)
  event.shaped('kubejs:forge_hammer', [' II', 'SSI', ' II'], hammerKeys)

  event.shapeless('kubejs:iron_plate', ['minecraft:iron_ingot', 'kubejs:forge_hammer'])
    .damageIngredient('kubejs:forge_hammer', 1)

  // Other plates, same hammer rule as iron (the Metal Former rolls them too)
  const hammerPlates = {
    'kubejs:copper_plate': 'minecraft:copper_ingot',
    'kubejs:tin_plate': 'ic2:ingot_tin',
    'kubejs:bronze_plate': 'ic2:ingot_bronze',
    'kubejs:gold_plate': 'minecraft:gold_ingot'
  }
  Object.keys(hammerPlates).forEach(plate => {
    event.shapeless(plate, [hammerPlates[plate], 'kubejs:forge_hammer'])
      .damageIngredient('kubejs:forge_hammer', 1)
  })

  // ---------------------------------------------------------------
  // Cables: require the Metal Former, as in IC2 Experimental 1.12.2.
  // Remove direct crafting recipes that turn ingots into cables; the
  // Metal Former extrusion recipes live in data/ic2/ic2_recipes/metal_former_extruding.
  // Keep plate -> cable cutting recipes in the Metal Former.
  // ---------------------------------------------------------------
  ;[
    'ic2:copper_cable_item',
    'ic2:tin_cable_item',
    'ic2:gold_cable_item',
    'ic2:iron_cable_item'
  ].forEach(cable => event.remove({ output: cable }))

  // ---------------------------------------------------------------
  // Advanced Machine Casing  (IC2 Experimental 1.12.2 layout)
  // machine casing + 2 advanced alloy + 2 carbon plate + 4 iron plates.
  // (1.12.2 uses steel plates; there is no steel in this pack, so iron plates.)
  // ---------------------------------------------------------------
  event.remove({ output: 'ic2:advanced_machine_block' })

  const casingKeys = {
    S: 'kubejs:iron_plate',
    A: 'ic2:plate_advanced_alloy',
    C: 'ic2:carbon_plate',
    M: 'ic2:machine_block'
  }

  event.shaped('ic2:advanced_machine_block', ['SAS', 'CMC', 'SAS'], casingKeys)
  event.shaped('ic2:advanced_machine_block', ['SCS', 'AMA', 'SCS'], casingKeys)

  // ---------------------------------------------------------------
  // Metal Former machine (mod: mods-src/bs-machines, block bs_machines:metal_former)
  // 1.12.2: circuit + toolbox + machine casing + coils. IC2C has no toolbox/coil,
  // so: circuit on top, iron plates on the sides of the casing, 3 copper cables below.
  // Modes use IC2 datapack recipes: kubejs/data/ic2/ic2_recipes/metal_former_*/
  // ---------------------------------------------------------------
  event.shaped('bs_machines:metal_former', [' C ', 'PMP', 'WWW'], {
    C: 'ic2:circuit',
    P: 'kubejs:iron_plate',
    M: 'ic2:machine_block',
    W: 'ic2:copper_cable_item'
  })
})
