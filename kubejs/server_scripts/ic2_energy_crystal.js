// Best-Sborka — IC2 Classic recipe balance
// Minecraft Forge 1.19.2
//
// Replaces the easy recipe (1 diamond + redstone) with a recipe
// requiring 4 IC2 Classic diamond dust + 5 redstone dust.
// Diamond Dust item ID confirmed from IC2Classic 2.1.3.4 assets: ic2:dust_diamond.

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
      D: 'ic2:dust_diamond'
    }
  )
})
