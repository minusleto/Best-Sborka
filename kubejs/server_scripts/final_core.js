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

  // Build Core (final block). Only real components, no finished gear: every cell is the core of
  // one branch of the pack (the center is the energy heart of the pack).
  //   tools/gravity: Vajra Core        quantum: Quantum Core       sun/molecular: MT Core
  //   iridium: Reinforced Iridium Plate   energy: Glowtronic Crystal   AE2: Quantum Entangled Singularity
  //   quantum set: Quantum Sheathing, Quantum Coil, Quantum Electric Motor
  // The recipe cannot require a charge (KubeJS cannot read the EU of an item), so the energy
  // requirement is enforced by the cost of the Glowtronic Crystal and by the final quest.
  event.shaped('kubejs:build_core', ['VQM', 'IGS', 'ECO'], {
    V: 'gravisuit:vajra_core',
    Q: 'kubejs:quantum_core',
    M: 'advanced_solars:mt_core',
    I: 'ic2:iridium',
    G: 'ic2:glowtronic_crystal',
    S: 'ae2:quantum_entangled_singularity',
    E: 'kubejs:quantum_sheathing',
    C: 'kubejs:quantum_coil',
    O: 'kubejs:quantum_electric_motor'
  })
})
