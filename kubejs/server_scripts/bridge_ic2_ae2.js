// Stage 3 of the progression (issue #26, docs/concept-progression.md): bridge between IC2 and AE2.
// Rule: 2 requirements per block at most. AE2 needs IC2 materials; IC2 needs AE2 processors.
// Original AE2 recipes: appliedenergistics2 12.9.12 data. Original IC2 layouts: IC2 Experimental 1.12.2
// shaped_recipes.ini (IC2C 1.19.2 keeps its recipes in Java, so these are the reference layouts).
ServerEvents.recipes(event => {

  // --- AE2 needs IC2 ---

  // ME Drive. Original: 4 iron ingots, 2 engineering processors, 2 fluix glass cables, empty middle.
  // Now: advanced alloy plates (IC2 composite chain) + an advanced circuit in the middle.
  event.remove({ output: 'ae2:drive' })
  event.shaped('ae2:drive', ['ABA', 'CDC', 'ABA'], {
    A: 'ic2:plate_advanced_alloy',
    B: 'ae2:engineering_processor',
    C: 'ae2:fluix_glass_cable',
    D: 'ic2:advanced_circuit'
  })

  // Inscriber. Original: iron ingots, 2 sticky pistons, copper ingot, empty middle.
  // Now: an electric motor drives the presses (the motor goes into the empty middle slot).
  event.remove({ output: 'ae2:inscriber' })
  event.shaped('ae2:inscriber', ['ABA', 'CMA', 'ABA'], {
    A: '#forge:ingots/iron',
    B: 'minecraft:sticky_piston',
    C: '#forge:ingots/copper',
    M: 'kubejs:electric_motor'
  })

  // Charger. Original: 4 iron ingots, 2 copper ingots. Now: the copper becomes two real coils
  // (IC2C Extras) and an electric motor fills the empty slot.
  event.remove({ output: 'ae2:charger' })
  event.shaped('ae2:charger', ['ABA', 'AM ', 'ABA'], {
    A: '#forge:ingots/iron',
    B: 'ic2c_extras:coil',
    M: 'kubejs:electric_motor'
  })

  // --- IC2 needs AE2 ---

  // Mass Fabricator. 1.12.2 "GCG|ALA|GCG": the two advanced circuits are replaced by AE2 Calculation
  // Processors (matter generation is a computation task).
  event.remove({ output: 'ic2:mass_fabricator' })
  event.shaped('ic2:mass_fabricator', ['GCG', 'ALA', 'GCG'], {
    G: '#forge:dusts/glowstone',
    C: 'ae2:calculation_processor',
    A: 'ic2:advanced_machine_block',
    L: 'ic2:lapatron_crystal'
  })

  // Teleporter. 1.12.2 "GFG|CMC|GDG": the diamond becomes an AE2 Quantum Link Chamber
  // (teleportation and quantum entanglement are the same idea).
  event.remove({ output: 'ic2:teleporter' })
  event.shaped('ic2:teleporter', ['GFG', 'CMC', 'GQG'], {
    G: 'ic2:advanced_circuit',
    F: 'ic2:frequency_transmitter',
    C: 'ic2:glassfiber_cable_item',
    M: 'ic2:advanced_machine_block',
    Q: 'ae2:quantum_link'
  })
})
