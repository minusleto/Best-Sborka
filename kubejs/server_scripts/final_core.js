// Stages 6 and 7 of the progression (issue #26, docs/concept-progression.md): late gear and the final block.
ServerEvents.recipes(event => {

  // Vajra (Gravisuit). The recipe lives in Java in Gravisuit (IC2C crafting manager), so check in JEI
  // that only this one recipe is shown. Layout of the 1.12.2 original (all 9 slots are used):
  //   iron plate, energy crystal, iron plate / carbon plate, Vajra Core, carbon plate /
  //   composite plate, lapotron crystal, composite plate.
  // Here the top row (iron plate, energy crystal, iron plate) is replaced by three tools,
  // so the Vajra is the sum of the pack's tools: mining laser, advanced drill, nano saber.
  event.remove({ output: 'gravisuit:vajra' })
  event.shaped('gravisuit:vajra', ['LDS', 'PCP', 'ABA'], {
    L: 'ic2:mining_laser',
    D: 'ic2:advanced_drill',
    S: 'ic2:nano_saber',
    P: 'ic2:carbon_plate',
    C: 'gravisuit:vajra_core',
    A: 'ic2:plate_advanced_alloy',
    B: 'ic2:lapatron_crystal'
  })

  // ---- Unique components of the Build Core (each one is the core of one branch of the pack) ----

  // Iridium Matrix: every plate metal of the pack in one layer cake, with a reinforced iridium plate in the middle.
  // copper, tin, bronze / gold, iridium, lead / aluminium, iron, aluminium
  event.shaped('kubejs:iridium_matrix', ['CTB', 'GIL', 'AFA'], {
    C: 'kubejs:copper_plate',
    T: 'kubejs:tin_plate',
    B: 'kubejs:bronze_plate',
    G: 'kubejs:gold_plate',
    I: 'ic2:iridium',
    L: 'kubejs:lead_plate',
    A: 'kubejs:aluminium_plate',
    F: 'kubejs:iron_plate'
  })

  // Singularity Matrix (AE2 + IC2): a PAIR of entangled singularities (one explosion craft gives two)
  // between all three AE2 processors, with a quantum circuit in the middle.
  event.shaped('kubejs:singularity_matrix', ['LSC', 'EQE', 'CSL'], {
    L: 'ae2:logic_processor',
    S: 'ae2:quantum_entangled_singularity',
    C: 'ae2:calculation_processor',
    E: 'ae2:engineering_processor',
    Q: 'kubejs:quantum_circuit'
  })

  // Solar Heart (Advanced Solars): MT Core surrounded by enriched sunnarium alloy and irradiant glass.
  event.shaped('kubejs:solar_heart', ['GAG', 'AMA', 'GAG'], {
    G: 'advanced_solars:irradiant_glass_pane',
    A: 'advanced_solars:enriched_sunnarium_alloy',
    M: 'advanced_solars:mt_core'
  })

  // Quantum Drive (our quantum parts + Gravisuit cooling): a quantum motor that must be cooled.
  event.shaped('kubejs:quantum_drive', ['SGS', 'HMH', 'III'], {
    S: 'kubejs:quantum_sheathing',
    G: 'gravisuit:cooling_core',
    H: 'ic2:heat_exchanger_advanced',
    M: 'kubejs:quantum_electric_motor',
    I: 'ic2:plate_iridium'
  })

  // Gravity Core (Gravisuit): Vajra Core and a gravitation engine in an iridium cage.
  event.shaped('kubejs:gravity_core', ['IAI', 'RVR', 'IEI'], {
    I: 'ic2:plate_iridium',
    A: 'ic2:advanced_machine_block',
    R: 'ic2:reflector_iridium',
    V: 'gravisuit:vajra_core',
    E: 'gravisuit:gravitation_engine'
  })

  // Matter Core (UU matter): the Mass Fabricator (which needs AE2 processors) in a shell of UU matter and ender dust.
  event.shaped('kubejs:matter_core', ['UDU', 'DMD', 'UDU'], {
    U: 'ic2:uumatter',
    D: 'ae2:ender_dust',
    M: 'ic2:mass_fabricator'
  })

  // Void Heart (vanilla bosses + AE2): a nether star in a ring of fluix pearls and charged certus quartz.
  event.shaped('kubejs:void_heart', ['CPC', 'PNP', 'CPC'], {
    C: 'ae2:charged_certus_quartz_crystal',
    P: 'ae2:fluix_pearl',
    N: 'minecraft:nether_star'
  })

  // ---- Build Core (final block): 7 unique components + the Quantum Core + the Glowtronic Crystal ----
  //   gravity core, singularity matrix, solar heart
  //   iridium matrix, GLOWTRONIC CRYSTAL (energy heart, center), quantum core
  //   quantum drive, matter core, void heart
  // The recipe cannot require a charge (KubeJS cannot read the EU of an item), so the energy
  // requirement is enforced by the cost of the Glowtronic Crystal and by the final quest.
  event.shaped('kubejs:build_core', ['GSH', 'IXQ', 'DMV'], {
    G: 'kubejs:gravity_core',
    S: 'kubejs:singularity_matrix',
    H: 'kubejs:solar_heart',
    I: 'kubejs:iridium_matrix',
    X: 'ic2:glowtronic_crystal',
    Q: 'kubejs:quantum_core',
    D: 'kubejs:quantum_drive',
    M: 'kubejs:matter_core',
    V: 'kubejs:void_heart'
  })
})
