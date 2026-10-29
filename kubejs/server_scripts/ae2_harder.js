// Harder AE2 recipes that need IC2 late-game materials (issue #23).
// The materials come from IC2 Additions 1.12.2 and are made in kubejs/server_scripts/ic2_energy_crystal.js.
// Original AE2 recipes (appliedenergistics2 12.9.12) are noted next to each change.
ServerEvents.recipes(event => {

  // ME Controller. Original: smooth sky stone in the corners.
  event.remove({ output: 'ae2:controller' })
  event.shaped('ae2:controller', [
    'ABA',
    'BCB',
    'ABA'
  ], {
    A: 'kubejs:nano_sheathing',
    B: 'ae2:fluix_crystal',
    C: 'ae2:engineering_processor'
  })

  // Quantum Ring. Original: iron ingots in the corners.
  event.remove({ output: 'ae2:quantum_ring' })
  event.shaped('ae2:quantum_ring', [
    'ABA',
    'CDE',
    'ABA'
  ], {
    A: 'kubejs:nano_sheathing',
    B: 'ae2:logic_processor',
    C: 'ae2:engineering_processor',
    D: 'ae2:energy_cell',
    E: '#ae2:smart_dense_cable'
  })
})
