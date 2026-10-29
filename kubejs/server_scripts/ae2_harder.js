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

  // --- Batch 2: use the remaining Additions materials in AE2 (issue #23). Originals from AE2 12.9.12 data. ---

  // Dense Energy Cell. Original: 8 energy cells around a Calculation Processor.
  event.remove({ output: 'ae2:dense_energy_cell' })
  event.shaped('ae2:dense_energy_cell', ['AAA', 'ABA', 'AAA'], {
    A: 'ae2:energy_cell',
    B: 'kubejs:hybrid_circuit'
  })

  // 64k cell component. Original: quartz glass in the middle.
  event.remove({ output: 'ae2:cell_component_64k' })
  event.shaped('ae2:cell_component_64k', ['ABA', 'CDC', 'ACA'], {
    A: '#forge:dusts/glowstone',
    B: 'ae2:calculation_processor',
    C: 'ae2:cell_component_16k',
    D: 'kubejs:carbon_sheathing'
  })

  // 256k cell component. Original: Calculation Processor on top.
  event.remove({ output: 'ae2:cell_component_256k' })
  event.shaped('ae2:cell_component_256k', ['ABA', 'CDC', 'ACA'], {
    A: 'ae2:sky_dust',
    B: 'kubejs:hybrid_circuit',
    C: 'ae2:cell_component_64k',
    D: 'ae2:quartz_glass'
  })

  // Spatial components. Original: Engineering Processor in the middle.
  event.remove({ output: 'ae2:spatial_cell_component_16' })
  event.shaped('ae2:spatial_cell_component_16', ['ABA', 'BCB', 'ABA'], {
    A: '#forge:dusts/glowstone',
    B: 'ae2:spatial_cell_component_2',
    C: 'kubejs:hybrid_circuit'
  })
  event.remove({ output: 'ae2:spatial_cell_component_128' })
  event.shaped('ae2:spatial_cell_component_128', ['ABA', 'BCB', 'ABA'], {
    A: '#forge:dusts/glowstone',
    B: 'ae2:spatial_cell_component_16',
    C: 'kubejs:nano_circuit'
  })

  // Spatial Pylon. Original: fluix dust on the sides.
  event.remove({ output: 'ae2:spatial_pylon' })
  event.shaped('ae2:spatial_pylon', ['ABA', 'CDC', 'ABA'], {
    A: 'ae2:quartz_glass',
    B: 'ae2:fluix_glass_cable',
    C: 'kubejs:carbon_sheathing',
    D: '#ae2:all_fluix'
  })

  // Spatial IO Port. Original: iron ingots on the bottom row.
  event.remove({ output: 'ae2:spatial_io_port' })
  event.shaped('ae2:spatial_io_port', ['AAA', 'BCB', 'DED'], {
    A: '#forge:glass',
    B: 'ae2:fluix_glass_cable',
    C: 'ae2:io_port',
    D: 'kubejs:nano_sheathing',
    E: 'ae2:engineering_processor'
  })

  // Quantum Link Chamber. Original: empty middle.
  event.remove({ output: 'ae2:quantum_link' })
  event.shaped('ae2:quantum_link', ['ABA', 'BCB', 'ABA'], {
    A: 'ae2:quartz_glass',
    B: 'ae2:fluix_pearl',
    C: 'kubejs:quantum_sheathing'
  })
})
