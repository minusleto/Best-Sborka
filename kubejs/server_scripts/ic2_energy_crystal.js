// Best-Sborka — IC2 Classic recipe balance
// Minecraft Forge 1.19.2
//
// Intended balance: 4 diamond dust + 5 redstone dust.
// This recipe uses all nine crafting slots, so each dust has its own slot.
// NOTE: Verify item IDs against JEI in the target instance.

ServerEvents.recipes(event => {
  event.remove({ output: 'ic2:energy_crystal' })

  event.shaped(
    'ic2:energy_crystal',
    [
      'RDR',
      'DRD',
      'RDR'
    ],
    {
      R: 'minecraft:redstone',
      D: 'ic2:diamond_dust'
    }
  )
})
