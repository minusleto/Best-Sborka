// Best-Sborka — IC2 Classic recipe balance
// Minecraft Forge 1.19.2
// Full change log with checkboxes: docs/recipe-changes.md

ServerEvents.recipes(event => {

  // ---------------------------------------------------------------
  // Energy Crystal  (IC2 Experimental 1.12.2 route)
  // 4 IC2 diamond dust + 5 redstone -> 9 Energium Dust (crafting table)
  // 9 Energium Dust -> 1 Energy Crystal (compressor, see
  // kubejs/data/ic2/ic2_recipes/compressor/energium_dust.json)
  // IDs checked against IC2Classic 2.1.3.4 JAR.
  // ---------------------------------------------------------------
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

  // ---------------------------------------------------------------
  // Advanced Machine Casing  (IC2 Experimental 1.12.2 layout)
  // machine casing + 2 advanced alloy + 2 carbon plate + 4 "steel" plates.
  // There is NO steel in this pack (IC2C, IC2C Extras, IC2C Additions have none),
  // so CASING_PLATE is a stand-in. Change this one line to swap the material.
  // ---------------------------------------------------------------
  const CASING_PLATE = 'ic2:plate_dense_copper'

  event.remove({ output: 'ic2:advanced_machine_block' })

  const casingKeys = {
    S: CASING_PLATE,
    A: 'ic2:plate_advanced_alloy',
    C: 'ic2:carbon_plate',
    M: 'ic2:machine_block'
  }

  event.shaped('ic2:advanced_machine_block', ['SAS', 'CMC', 'SAS'], casingKeys)
  event.shaped('ic2:advanced_machine_block', ['SCS', 'AMA', 'SCS'], casingKeys)
})
