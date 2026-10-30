// Skulls are not craftable in vanilla, but the Nether Star (Wither) is needed for the Quantum Core
// and the Void Heart. Bones -> skeleton skull -> wither skeleton skull (issue #26).
ServerEvents.recipes(event => {
  // Skeleton skull: a ring of 8 bones around a bone meal.
  event.shaped('minecraft:skeleton_skull', ['BBB', 'BMB', 'BBB'], {
    B: 'minecraft:bone',
    M: 'minecraft:bone_meal'
  })
  // Wither skeleton skull: a skeleton skull, soul sand (the soul of the Nether) and coal.
  event.shaped('minecraft:wither_skeleton_skull', ['CSC', 'SKS', 'CSC'], {
    C: '#minecraft:coals',
    S: 'minecraft:soul_sand',
    K: 'minecraft:skeleton_skull'
  })
})
