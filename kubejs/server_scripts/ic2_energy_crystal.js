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
  // Glass fibre cable  (IC2 Experimental 1.12.2 recipe, ANY glass)
  // 6 glass + 2 silver dust + Energium Dust -> 6 glass cables.
  // IC2C's own recipe (6 glass + 2 redstone + 1 diamond -> 4 cables) and the
  // earlier plain-glass version are removed: this is the only recipe now.
  // '#forge:glass' accepts every glass block (plain, stained, tinted).
  // ---------------------------------------------------------------
  event.remove({ output: 'ic2:glassfiber_cable_item' })

  event.shaped(
    '6x ic2:glassfiber_cable_item',
    [
      'GGG',
      'SDS',
      'GGG'
    ],
    {
      G: '#forge:glass',
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
    'kubejs:gold_plate': 'minecraft:gold_ingot',
    'kubejs:aluminium_plate': 'ic2:ingot_aluminium',
    'kubejs:lead_plate': 'ic2c_extras:lead_ingot'
  }
  Object.keys(hammerPlates).forEach(plate => {
    event.shapeless(plate, [hammerPlates[plate], 'kubejs:forge_hammer'])
      .damageIngredient('kubejs:forge_hammer', 1)
  })

  // Item casings (1.12.2): plate + hammer -> 2 casings.
  // The Metal Former rolls them too: data/ic2/ic2_recipes/metal_former_rolling/<metal>_item_casing.json
  const casingMetals = ['copper', 'tin', 'bronze', 'gold', 'iron', 'lead']
  casingMetals.forEach(metal => {
    event.shapeless('2x kubejs:' + metal + '_item_casing', ['kubejs:' + metal + '_plate', 'kubejs:forge_hammer'])
      .damageIngredient('kubejs:forge_hammer', 1)
  })

  // Composite (advanced alloy) ingot: IC2 Experimental 1.12.2 recipe from plates
  // (III/BBB/TTT iron/bronze/tin plates -> 2 ingots), with aluminium instead of tin.
  // IC2C 1.19.2 uses ingots (refined iron/bronze/aluminium); that recipe is removed.
  event.remove({ output: 'ic2:ingot_advanced_alloy' })
  event.shaped('2x ic2:ingot_advanced_alloy', [
    'III',
    'BBB',
    'AAA'
  ], {
    I: 'kubejs:iron_plate',
    B: 'kubejs:bronze_plate',
    A: 'kubejs:aluminium_plate'
  })

  // Cables: require the Metal Former, as in IC2 Experimental 1.12.2.
  ;[
    'ic2:copper_cable_item',
    'ic2:tin_cable_item',
    'ic2:gold_cable_item',
    'ic2:iron_cable_item'
  ].forEach(cable => event.remove({ output: cable }))

  // Wire cutters (IC2 Experimental 1.12.2 Cutter, grid "A A| A |I I" from the jar):
  // 3 iron plates + 2 iron ingots. Plate + cutters -> cables, the cutters lose
  // 1 durability (60 uses, as in 1.12.2). Cable counts per plate: 1.12.2 shapeless recipes.
  event.shaped('kubejs:wire_cutters', [
    'P P',
    ' P ',
    'I I'
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

  // ---------------------------------------------------------------
  // Electric Motor and its 1.12.2 uses (issues #13, #14)
  // 1.12.2: coils + tin casings + iron ingot, two layouts.
  // Coil: ic2c_extras:coil (IC2C Extras). Not restored (no equivalent in this pack):
  // Kinetic/Electric Kinetic Generator, Power Unit, Small Power Unit, Scanner machine,
  // Fluid Regulator, Block Cutting Machine, Electric Boat, Fluid Ejector/Pulling upgrades.
  // ---------------------------------------------------------------
  const motorKeys = { X: 'minecraft:iron_ingot', C: 'ic2c_extras:coil', T: 'kubejs:tin_item_casing' }
  event.shaped('kubejs:electric_motor', [' T ', 'CXC', ' T '], motorKeys)
  event.shaped('kubejs:electric_motor', [' C ', 'TXT', ' C '], motorKeys)

  // Heat Vent: 1.12.2 puts the motor in the middle of iron plates and iron bars.
  // Only the base recipe is replaced (the vent upgrade conversions stay).
  event.remove({ id: 'ic2:vent_heat_0' })
  event.shaped('ic2:heat_vent', ['BIB', 'IMI', 'BIB'], {
    B: 'minecraft:iron_bars',
    I: 'kubejs:iron_plate',
    M: 'kubejs:electric_motor'
  })

  // Thermal Centrifuge (IC2C Extras): same layout as 1.12.2, motor instead of the heat conductor.
  // Refined iron ingots stay (this pack's iron ingot). 1.12.2: CMC/RAR/RER.
  event.remove({ output: 'ic2c_extras:thermal_centrifuge' })
  event.shaped('ic2c_extras:thermal_centrifuge', ['CLC', 'RMR', 'RER'], {
    C: 'ic2c_extras:coil',
    L: 'ic2:mining_laser',
    R: 'ic2:ingot_refined_iron',
    M: 'ic2:advanced_machine_block',
    E: 'kubejs:electric_motor'
  })

  // Ore Washing Plant (IC2C Extras): 1.12.2 recipe III/BAB/EWE (iron plates, buckets, machine, motors, circuit).
  event.remove({ output: 'ic2c_extras:ore_washing_plant' })
  event.shaped('ic2c_extras:ore_washing_plant', ['III', 'BAB', 'EWE'], {
    I: 'kubejs:iron_plate',
    B: 'minecraft:bucket',
    A: 'ic2:machine_block',
    E: 'kubejs:electric_motor',
    W: 'ic2:circuit'
  })

  // ---------------------------------------------------------------
  // IC2 Additions 1.12.2 late-game materials, adapted (see docs/recipe-changes.md).
  // Originals use the mod's Advanced Assembler (EU, sulfuric acid, lithium), which this pack
  // does not have, so they are crafting-table recipes. Not integrated into other recipes yet.
  // ---------------------------------------------------------------
  // Carbon sheathing: 2 carbon plates (original: Advanced Assembler, 25000 EU)
  event.shapeless('kubejs:carbon_sheathing', ['ic2:carbon_plate', 'ic2:carbon_plate'])
  // Nano sheathing: 2 carbon sheathing + 3 energium dust (as in the original)
  event.shapeless('kubejs:nano_sheathing', ['kubejs:carbon_sheathing', 'kubejs:carbon_sheathing', 'kubejs:energium_dust', 'kubejs:energium_dust', 'kubejs:energium_dust'])
  // Quantum sheathing: the original needs 4 carbon + 6 iridium + 4 nano + 4 irradiant uranium (18 items,
  // does not fit a 3x3 grid), so here it is about half of that.
  event.shaped('kubejs:quantum_sheathing', ['NIN', 'CIC', 'UIU'], {
    N: 'kubejs:nano_sheathing',
    C: 'kubejs:carbon_sheathing',
    I: 'ic2:plate_iridium',
    U: 'advanced_solars:irradiant_uranium'
  })

  // Coils: advanced (original recipe, lapis block instead of the dense lapis plate),
  // nano and quantum (original recipes; Sanarium = Sunnarium of Advanced Solars)
  event.shaped('kubejs:advanced_coil', ['ICI', 'CLC', 'ICI'], {
    I: 'ic2:iron_triple_insulated_cable_item',
    C: 'ic2c_extras:coil',
    L: 'minecraft:lapis_block'
  })
  event.shaped('kubejs:nano_coil', ['RAR', 'ACA', 'RAR'], {
    R: 'advanced_solars:reinforced_iridium_iron_plate',
    A: 'kubejs:advanced_coil',
    C: 'kubejs:energium_dust'
  })
  event.shaped('kubejs:quantum_coil', ['ICI', 'CRC', 'ICI'], {
    I: 'ic2:plate_iridium',
    C: 'kubejs:nano_coil',
    R: 'advanced_solars:irradiant_reinforced_plate'
  })

  // Electric motors (the dense steel plate is a dense iron plate: there is no steel in the pack)
  event.shaped('kubejs:advanced_electric_motor', [' S ', 'CDC', ' S '], {
    S: 'ic2c_extras:dense_iron_plate',
    C: 'kubejs:advanced_coil',
    D: 'minecraft:diamond'
  })
  event.shaped('kubejs:nano_electric_motor', [' C ', 'NBN', ' C '], {
    C: 'kubejs:carbon_sheathing',
    N: 'kubejs:nano_coil',
    B: 'ic2:advanced_machine_block'
  })
  event.shaped('kubejs:quantum_electric_motor', [' S ', 'CIC', ' S '], {
    S: 'advanced_solars:sunnarium',
    C: 'kubejs:quantum_coil',
    I: 'advanced_solars:irradiant_glass_pane'
  })

  // Circuits (the originals need lithium dust and 2000 mB sulfuric acid, neither is in the pack):
  // hybrid = advanced circuit + glowstone dust instead of lithium + hydrated coal dust;
  // nano and quantum keep the original ingredient lists, without the acid.
  event.shapeless('kubejs:hybrid_circuit', [
    'ic2:advanced_circuit', 'minecraft:glowstone_dust', 'minecraft:glowstone_dust', 'minecraft:glowstone_dust', 'ic2:dust_hydrated_coal', 'ic2:dust_hydrated_coal'
  ])
  event.shapeless('kubejs:nano_circuit', [
    'kubejs:carbon_sheathing', 'kubejs:carbon_sheathing', 'kubejs:carbon_sheathing', 'kubejs:carbon_sheathing', 'minecraft:redstone', 'minecraft:redstone', 'minecraft:redstone', 'kubejs:hybrid_circuit', 'kubejs:nano_electric_motor'
  ])
  event.shapeless('kubejs:quantum_circuit', [
    'ic2:heat_exchanger_advanced', 'ic2:heat_exchanger_advanced', 'ic2:heat_exchanger_advanced', 'ic2:heat_exchanger_advanced', 'kubejs:quantum_electric_motor', 'ic2:reflector_iridium', 'ic2:reflector_iridium', 'ic2:reflector_iridium', 'kubejs:nano_circuit'
  ])

  // Quantum core
  event.shaped('kubejs:quantum_core', ['SNS', 'NCN', 'SNS'], {
    S: 'advanced_solars:enriched_sunnarium_alloy',
    N: 'minecraft:nether_star',
    C: 'kubejs:quantum_circuit'
  })
})
