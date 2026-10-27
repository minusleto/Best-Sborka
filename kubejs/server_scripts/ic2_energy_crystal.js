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

  // ---------------------------------------------------------------
  // Glass fibre cable — additional IC2 Experimental 1.12.2 recipe.
  // 6 glass + Energium Dust + silver dust -> 6 glass cables.
  // Keep IC2 Classic's existing glass-cable recipes; this is an extra
  // alternative, not a replacement for the crystal-based recipes.
  // ---------------------------------------------------------------
  event.shaped(
    '6x ic2:glass_cable_item',
    [
      'GGG',
      'SDS',
      'GGG'
    ],
    {
      G: 'minecraft:glass',
      S: '#forge:dusts/silver',
      D: 'kubejs:energium_dust'
    }
  )

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
  // Lapotron Crystal — use Advanced Circuit instead of the regular Circuit,
  // following the recipe on the Russian Minecraft Wiki.
  // Keep the existing lapis lazuli and Energy Crystal ingredients.
  // ---------------------------------------------------------------
  event.remove({ output: 'ic2:lapotron_crystal' })
  event.shapeless('ic2:lapotron_crystal', [
    'minecraft:lapis_lazuli',
    'ic2:advanced_circuit',
    'ic2:energy_crystal'
  ])

  // ---------------------------------------------------------------
  // Mining Laser — add a second Advanced Circuit by replacing one
  // composite/advanced-alloy ingredient in the IC2 Experimental recipe.
  // Requested layout: Rcc / AAC / AA
  // R = redstone, A = advanced alloy plate (composite), C = advanced circuit,
  // c = Energy Crystal. Recipe verified against IC2 Experimental 1.12.2
  // shaped_recipes.ini; test in JEI in the 1.19.2 pack.
  // ---------------------------------------------------------------
  event.remove({ output: 'ic2:mining_laser' })
  event.shaped('ic2:mining_laser', [
    'Rcc',
    'AAC',
    ' AA'
  ], {
    R: 'minecraft:redstone',
    A: 'ic2:plate_advanced_alloy',
    C: 'ic2:advanced_circuit',
    c: 'ic2:energy_crystal'
  })

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
