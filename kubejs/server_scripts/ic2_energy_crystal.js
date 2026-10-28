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
    '6x ic2:glassfiber_cable_item',
    [
      'GGG',
      'SDS',
      'GGG'
    ],
    {
      G: 'minecraft:glass',
      S: 'ic2:dust_silver',
      D: 'kubejs:energium_dust'
    }
  )

  // ---------------------------------------------------------------
  // Iron plate + Forge Hammer  (IC2 Experimental 1.12.2 "plate" system)
  // IC2C 1.19.2 has no iron plates, no hammer and no Metal Former machine.
  // ---------------------------------------------------------------
  const hammerKeys = { I: 'minecraft:iron_ingot', S: 'minecraft:stick' }
  event.shaped('kubejs:forge_hammer', ['II ', 'ISS', 'II '], hammerKeys)
  event.shaped('kubejs:forge_hammer', [' II', 'SSI', ' II'], hammerKeys)

  event.shapeless('kubejs:iron_plate', ['minecraft:iron_ingot', 'kubejs:forge_hammer'])
    .damageIngredient('kubejs:forge_hammer', 1)

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

  // Cables: require the Metal Former, as in IC2 Experimental 1.12.2.
  ;[
    'ic2:copper_cable_item',
    'ic2:tin_cable_item',
    'ic2:gold_cable_item',
    'ic2:iron_cable_item'
  ].forEach(cable => event.remove({ output: cable }))

  // Wire cutters (IC2 Experimental 1.12.2 Cutter): 3 iron plates + 2 iron ingots
  // (the wiki gives the ingredients but not the grid; scissors shape is our choice).
  // Plate + cutters -> cables, the cutters lose 1 durability. Cable counts per
  // plate follow the Metal Former cutting values (docs/recipe-changes.md).
  event.shaped('kubejs:wire_cutters', [
    'I I',
    ' P ',
    'P P'
  ], {
    I: 'minecraft:iron_ingot',
    P: 'kubejs:iron_plate'
  })

  const cutterCables = [
    ['2x ic2:copper_cable_item', 'kubejs:copper_plate'],
    ['3x ic2:tin_cable_item', 'kubejs:tin_plate'],
    ['4x ic2:gold_cable_item', 'kubejs:gold_plate'],
    ['4x ic2:iron_cable_item', 'kubejs:iron_plate']
  ]
  cutterCables.forEach(r => {
    event.shapeless(r[0], [r[1], 'kubejs:wire_cutters'])
      .damageIngredient('kubejs:wire_cutters', 1)
  })

  // Advanced Machine Casing (adapted Experimental layout)
  event.remove({ output: 'ic2:advanced_machine_block' })
  const casingKeys = {
    S: 'kubejs:iron_plate',
    A: 'ic2:plate_advanced_alloy',
    C: 'ic2:carbon_plate',
    M: 'ic2:machine_block'
  }
  event.shaped('ic2:advanced_machine_block', ['SAS', 'CMC', 'SAS'], casingKeys)
  event.shaped('ic2:advanced_machine_block', ['SCS', 'AMA', 'SCS'], casingKeys)

  // Lapotron Crystal (IC2 Experimental 1.12.2 recipe).
  // IC2C: lapis lazuli + BASIC circuit. 1.12.2 Experimental: lapis DUST +
  // ADVANCED circuit around an Energy Crystal (any charge).
  // Lapis dust (kubejs:lapis_dust) is made in the macerator:
  // kubejs/data/ic2/ic2_recipes/macerator/.
  // The IC2C registry id is "lapatron_crystal" (sic), NOT "lapotron_crystal".
  event.remove({ output: 'ic2:lapatron_crystal' })
  event.shaped('ic2:lapatron_crystal', [
    'LCL',
    'LDL',
    'LCL'
  ], {
    L: 'kubejs:lapis_dust',
    C: 'ic2:advanced_circuit',
    D: 'ic2:energy_crystal'
  })

  // Mining Laser — requested layout: Rcc / AAC / AA
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

  // Nightvision Goggles — restore the full IC2 Experimental 1.12.2
  // ingredient set. The only substitution requested for this pack is
  // IC2 Classic RE Battery in place of the unavailable Advanced RE-Battery.
  // Ingredients: 2 advanced heat exchangers, 2 lamps, 2 rubber,
  // 1 RE Battery, 1 reinforced glass, 1 advanced circuit.
  event.remove({ output: 'ic2:nightvision_goggles' })
  event.shaped('ic2:nightvision_goggles', [
    'HLH',
    'RBR',
    'LGC'
  ], {
    H: 'ic2:heat_exchanger_advanced',
    L: 'ic2:construction_light',
    R: 'ic2:rubber',
    B: 'ic2:re_battery',
    G: 'ic2:reinforced_glass',
    C: 'ic2:advanced_circuit'
  })

  // Nano Helmet — preserve the native IC2 Classic electric armor item.
  // Only replace its recipe; do not create a KubeJS substitute item.
  // Shaped layout: carbon plates in corners, Energy Crystal top-center,
  // Nightvision Goggles center.
  event.remove({ output: 'ic2:nano_suit_helmet' })
  event.shaped('ic2:nano_suit_helmet', [
    'CEC',
    'CGC',
    '   '
  ], {
    C: 'ic2:carbon_plate',
    E: 'ic2:energy_crystal',
    G: 'ic2:nightvision_goggles'
  })

  // Metal Former machine (mod: mods-src/bs-machines, block bs_machines:metal_former)
  // Copper ingots, not copper cables: copper cable crafting is removed above and
  // cables are now made only in the Metal Former itself (would be a dead end).
  event.shaped('bs_machines:metal_former', [' C ', 'PMP', 'WWW'], {
    C: 'ic2:circuit',
    P: 'kubejs:iron_plate',
    M: 'ic2:machine_block',
    W: 'minecraft:copper_ingot'
  })
})
