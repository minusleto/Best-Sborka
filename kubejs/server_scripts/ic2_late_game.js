// Late-game IC2 recipes that use the Additions materials (issue #23).
// Layouts from IC2 Experimental 1.12.2 (shaped_recipes.ini); only the circuit is swapped.
ServerEvents.recipes(event => {

  // MFSU: 1.12.2 "LCL|LML|LAL", Advanced Circuit replaced by Hybrid Circuit.
  event.remove({ output: 'ic2:mfsu' })
  event.shaped('ic2:mfsu', ['LCL', 'LML', 'LAL'], {
    L: 'ic2:lapatron_crystal',
    C: 'kubejs:hybrid_circuit',
    M: 'ic2:mfe',
    A: 'ic2:advanced_machine_block'
  })

  // EV transformer: 1.12.2 " c |CED| c ", Advanced Circuit replaced by Hybrid Circuit.
  event.remove({ output: 'ic2:transformer_ev' })
  event.shaped('ic2:transformer_ev', [' c ', 'CED', ' c '], {
    c: 'ic2:iron_triple_insulated_cable_item',
    C: 'kubejs:hybrid_circuit',
    E: 'ic2:transformer_hv',
    D: 'ic2:lapatron_crystal'
  })
})
