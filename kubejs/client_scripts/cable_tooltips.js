// Best-Sborka: cable info in the item tooltip, in Russian.
// Values are read from the IC2 Classic 2.1.3.4 code (Cables$*Cable classes):
//   capacity = conductor breakdown energy - 1 (max EU/t before the cable burns)
//   loss     = conduction loss, EU lost per cable block
// Insulation does not change capacity in IC2C, only the loss (and shock protection).
const CABLE_INFO = {
  'ic2:tin_cable_item':                       { cap: 5,     loss: '0,025' },
  'ic2:copper_cable_item':                    { cap: 32,    loss: '0,3' },
  'ic2:copper_insulated_cable_item':          { cap: 32,    loss: '0,2' },
  'ic2:gold_cable_item':                      { cap: 128,   loss: '0,5' },
  'ic2:gold_insulated_cable_item':            { cap: 128,   loss: '0,45' },
  'ic2:gold_double_insulated_cable_item':     { cap: 128,   loss: '0,4' },
  'ic2:bronze_cable_item':                    { cap: 128,   loss: '0,7' },
  'ic2:bronze_insulated_cable_item':          { cap: 128,   loss: '0,65' },
  'ic2:bronze_double_insulated_cable_item':   { cap: 128,   loss: '0,6' },
  'ic2:iron_cable_item':                      { cap: 2048,  loss: '1' },
  'ic2:iron_insulated_cable_item':            { cap: 2048,  loss: '0,95' },
  'ic2:iron_double_insulated_cable_item':     { cap: 2048,  loss: '0,9' },
  'ic2:iron_triple_insulated_cable_item':     { cap: 2048,  loss: '0,8' },
  'ic2:aluminium_cable_item':                 { cap: 8192,  loss: '1,2' },
  'ic2:aluminium_insulated_cable_item':       { cap: 8192,  loss: '1,15' },
  'ic2:aluminium_double_insulated_cable_item':{ cap: 8192,  loss: '1,1' },
  'ic2:aluminium_triple_insulated_cable_item':{ cap: 8192,  loss: '1,05' },
  'ic2:aluminium_quadruple_insulated_cable_item': { cap: 8192, loss: '1' },
  'ic2:glassfiber_cable_item':                { cap: 512,   loss: '0,025' },
  'ic2:super_cable_item':                     { cap: 8192,  loss: '0,001' },
  'ic2:plasma_cable_item':                    { cap: 32768, loss: '1,2' }
}

// NOTE: in KubeJS 1902.6.x a Text/Component is Iterable (itself + each sibling), so passing
// `Text.gray(..).append(..)` straight to event.add() prints the line and then the sibling again
// as a separate line (duplicated values). Wrapping each line in an array keeps it as one line.
ItemEvents.tooltip(event => {
  Object.keys(CABLE_INFO).forEach(id => {
    const info = CABLE_INFO[id]
    event.add(id, [Text.gray('Пропускная способность: ').append(Text.yellow(info.cap + ' EU/t'))])
    event.add(id, [Text.gray('Потери: ').append(Text.yellow(info.loss + ' EU на блок'))])
  })
})
