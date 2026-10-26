// Best-Sborka — IC2 Classic recipe balance
// Minecraft Forge 1.19.2
//
// Classic progression: 4 IC2 diamond dust + 5 redstone -> 9 Energium Dust.
// One Energium Dust is then compressed into an Energy Crystal.
// IDs checked against IC2Classic 2.1.3.4 JAR assets.

ServerEvents.recipes(event => {
  event.remove({ output: 'ic2:energy_crystal' })

  event.shaped(
    '9x kubejs:energium_dust',
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
