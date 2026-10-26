// Best-Sborka — IC2 Classic recipe balance
// Minecraft Forge 1.19.2
//
// Replaces the easy recipe (1 diamond + 8 redstone) with the
// classic-style recipe requiring 4 diamond dust + 5 redstone dust.
// The four diamond dust items occupy four separate crafting slots.

ServerEvents.recipes(event => {
  // Remove existing crafting recipes that produce the IC2 energy crystal.
  event.remove({ output: 'ic2:energy_crystal' })

  // Four diamond dust + five redstone dust.
  event.shaped(
    'ic2:energy_crystal',
    [
      'RRR',
      'RDD',
      'RDR'
    ],
    {
      R: 'minecraft:redstone',
      D: 'ic2:diamond_dust'
    }
  )
})
