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

  // Build Core (final block). Each cell is the capstone of one branch of the pack:
  //   energy:  Ultimate Lappack, Quantum Accumulator   sun: Ultimate Hybrid Solar Panel
  //   tools:   Vajra                                   storage: AE 16M Super Storage Cell
  //   matter:  Mass Fabricator, Quantum Core           transport: Teleporter Hub
  //   armor:   Quantum Chestplate
  // The recipe cannot require a charge (KubeJS cannot read the EU of an item), so the energy
  // requirement is enforced by the cost of the capstones and by the final quest.
  event.shaped('kubejs:build_core', ['LSV', 'CQT', 'AKM'], {
    L: 'gravisuit:ultimate_lappack',
    S: 'advanced_solars:ultimate_hybrid_solar_panel',
    V: 'gravisuit:vajra',
    C: 'ae2additions:super_cell_16m',
    Q: 'ic2:quantum_accumulator',
    T: 'ic2:teleporter_hub',
    A: 'ic2:quantum_suit_chestplate',
    K: 'kubejs:quantum_core',
    M: 'ic2:mass_fabricator'
  })
})
