# Матрица инвентаря: IC2 Experimental 1.12.2 и сборка (IC2C 1.19.2 + аддоны)

Составлено для [#15](https://github.com/minusleto/Best-Sborka/issues/15). **Статический анализ, в игре и в JEI не проверялось.**

**Источники 1.12.2:** jar `industrialcraft-2-2.8.222-ex112.jar`, перечисления `ItemName` (143 предмета), `BlockName`, `TeBlock` (114 типов машин), `FluidName` (29), типы ресурсов (`CraftingItemType`, `PlateResourceType` и др.), `shaped_recipes.ini`, `shapeless_recipes.ini`, `metal_former_*.ini`, `uu_*.ini`.
**Источники сборки:** реестры `IC2Items` / `IC2Blocks` из `IC2Classic-1.19.2-2.1.3.4.jar`, его `items_en_us.json` / `blocks_en_us.json` (945 названий предметов и блоков), локализации `IC2CExtras`, `ic2c-additions`, `advancedsolars`, `gravisuit`, а также кастомные предметы KubeJS в репозитории.

Статусы: **✓** есть в IC2C; **А** есть в аддоне; **≈** есть аналог или другая реализация; **К** добавлено нами в KubeJS; **✗** не найдено ни в реестре, ни в локализации; **?** нужна проверка кода или игры.
Отсутствие названия в локализации не доказывает отсутствие механики, поэтому ✗ значит «не найдено по реестру и lang».

## 1. Материалы

| 1.12.2 | Статус | Что в сборке |
|---|---|---|
| Руды: олово, свинец, серебро, уран | ✓ / А | `TIN_ORE`, `SILVER_ORE`, `URANIUM_ORE` (IC2C); свинец `lead_ore` (Extras). Алюминиевая руда `ALUMINUM_ORE_NETHER` есть только в Незере, в 1.12.2 алюминия нет |
| Базальт (`resource#basalt`) | ✗ | не найден |
| Слитки: олово, бронза, серебро, рафинированное железо, уран, сплав | ✓ | `INGOT_*`; свинец (Extras) |
| Сталь (слиток, пластина, корпус, блок, расплав) | ✗ | стали нет; заменяет рафинированное железо `INGOT_REFINED_IRON` |
| Пыль: бронза, глина, уголь, медь, алмаз, золото, железо, обсидиан, серебро, олово, незерак | ✓ | `DUST_*` |
| Пыль: свинец, камень, энергий, малые пыли | А | Extras (`lead_dust`, `stone_dust`, `energium_dust`, `tiny_*_dust`). Энергий также в KubeJS |
| Пыль: лазурит | К | `kubejs:lapis_dust` |
| Пыль: литий, сера, кремнезём, жемчуг Эндера, глаз Эндера, молоко, изумруд, влажное олово | ✗ | не найдены; кремнезём нужен для `raw_crystal_memory`, литий для трития |
| Пластины: железная, медная, оловянная, бронзовая, золотая, свинцовая | К | `kubejs:*_plate` (молот, металлоформовщик); в 1.12.2 есть ещё лазурит, обсидиан, сталь |
| Пластины: лазурит, обсидиан, сталь | ✗ | не добавлены |
| Плотные пластины | ≈ | `DENSE_COPPER` (IC2C), железная и свинцовая (Extras); остальных нет |
| Корпуса (casing): медь, олово, бронза, золото, железо, свинец | К | `kubejs:*_item_casing`; стального нет |
| Алюминий | ✓ | `INGOT_ALUMINIUM`, сырьё, пыль, блок, инструменты, броня; пластина `kubejs:aluminium_plate` (К), в 1.12.2 нет |
| Угольные предметы (ball/chunk/block) | ✓ | `COAL_BALL`, `COAL_CHUNK`, `CHARCOAL_BLOCK`, `HYDRATED_COAL_COMPRESSED` |
| Пепел, шлак, йод (`misc_resource`) | ✗ | не найдены (есть `Slag Generator`, предмета шлака нет) |
| Иридий: руда, осколок, пластина | ✓ / А | `ORE_IRIDIUM`, `PLATE_IRIDIUM`, осколок в Extras |
| UU-Matter (`matter`), смола, листы воды/лавы | ≈ | `UUMATTER`, `STICKY_RESIN`; листов воды/лавы нет |

## 2. Крафтовые компоненты

| 1.12.2 | Статус | Что в сборке |
|---|---|---|
| Резина, схема, продвинутая схема | ✓ | `RUBBER`, `CIRCUIT`, `ADVANCED_CIRCUIT` (+ `COMPLEX_CIRCUIT`) |
| Сплав (композит), иридиевая пластина, карбон | ✓ | `INGOT_ADVANCED_ALLOY`, `PLATE_ADVANCED_ALLOY`, `CARBON_*`. Рецепт композита в сборке заменён на пластинный |
| Катушка (coil), теплопроводник | А | Extras (`Coil`, `Heat Conductor`) |
| Электромотор | К | `kubejs:electric_motor` |
| Малый и обычный блок питания (`power_unit`) | ✗ | не найдены ни в реестре, ни в lang IC2C и Extras; в рецептах 1.12.2 нужны для бура, пилы, электромотыги. Чем IC2C заменяет их в рецептах инструментов, не проверено |
| Котёл (`copper_boiler`) | ✗ | не найден |
| Валы (железный, стальной, бронзовый) | ✗ | кинетика, см. #17 |
| Лопасти ротора, паровая турбина | ≈ | роторы: `WOODEN_ROTOR`, `IRON_ROTOR`, `CARBON_ROTOR`, `MIXED_ALLOY_ROTOR`, `IRIDIUM_ROTOR`; бронзового и стального нет |
| `raw_crystal_memory`, `crystal_memory` | ✗ | решение по #16: репликатор не делаем; `MEMORY_STICK` другой |
| Монеты, `scrap`, `scrap_box`, пеллеты | ✓ | `COIN*`, `SCRAP`, `SCRAPBOX`, `CF_PELLET` |
| Банка (`tin_can`), канистра, пустая канистра | ✓ | `TIN_CAN`, `FUEL_CAN` |
| Тритий, литий, тяжёлая вода, дейтерий (`FluidName`) | ✗ | не найдены; ядерная ветка заменена Extras (ториевые, плутониевые, MOX стержни) |

## 3. Инструменты и броня

| 1.12.2 | Статус | Что в сборке |
|---|---|---|
| Гаечный ключ, электроключ, резак (`cutter`), чертежный бур, кран | ✓ | `WRENCH`, `ELECTRIC_WRENCH`, `PRECISION_WRENCH`, `CUTTER` (`insulation_cutter`), `TREETAP`, `ELECTRIC_TREETAP` |
| Кузнечный молот (`forge_hammer`) | К | `kubejs:forge_hammer` |
| Кусачки как инструмент для кабелей | ✓ | родной `ic2:cutter` (128 использований); рецепты «пластина + кусачки → кабели» добавлены в KubeJS |
| Лом (`crowbar`), метка ветра (`wind_meter`), плазменная пушка | ✗ | не найдены |
| Мотыга, бур, алмазный и иридиевый бур, пила, лазер, нано-сабля | ✓ | `ELECTRIC_HOE`, `DRILL*`, `CHAINSAW*`, `MINING_LASER`, `NANO_SABER` |
| Обскуратор, анализатор культур, термометр, EU Reader | ✓ | `OBSCURATOR`, `CROP_ANALYZER`, `THERMOMETER`, `EU_READER` |
| Сканеры (OD / OV / `advanced_scanner`) | ✓ | `SCANNER_OD`, `SCANNER_OV` + варианты |
| Пропалыватель (`weeding_trowel`), сумка семян | ≈ / ✗ | `MOWING_TOOL` (косилка); сумки семян нет |
| Бронзовые инструменты и броня, композитная броня, хазмат | ✓ | `*_BRONZE`, `COMPOSITE_*`, `HAZMAT_*` |
| Нано- и квантовая броня | ≈ | модульная (`NANOSUIT_*`, `QUANTUM_SUIT_*`, модули) |
| Резиновые ботинки, статические ботинки, солнечный шлем, ПНВ | ✓ | `Rubber Boots`, `STATIC_BOOTS`, `SOLAR_HELMET*`, `NIGHT_VISION_HELMET` |
| Батпак, продвинутый батпак, лэппак, энергопак, CF-ранец | ✓ | `BAT_PACK`, `LAP_PACK`, `QUANTUM_PACK`, `CF_PACK` (+ Gravisuit: расширенные лэппаки) |
| Реактивные ранцы | ✓ | `JETPACK_*`; Gravisuit: гравитационные |
| Йодные таблетки | ✗ | йода нет |
| Динамит, липкий динамит | ✓ | `DYNAMITE`, `STICKY_DYNAMITE` |
| Лодки (резиновая, карбоновая) | ✓ | `RUBBER_BOAT`, `CARBON_BOAT` |
| Ящик с инструментами, ящик-контейнер | ✓ / А | `TOOL_BOX*`; `Containment Box` (Extras) |

## 4. Машины (`TeBlock`)

| 1.12.2 | Статус | Что в сборке |
|---|---|---|
| Печь, электропечь, измельчитель, компрессор, экстрактор, переработчик | ✓ | `IRON_FURNACE`, `ELECTRIC_FURNACE`, `MACERATOR`, `COMPRESSOR`, `EXTRACTOR`, `RECYCLER` |
| Металлоформовщик (`metal_former`) | К | мод `bs-machines` (`bs_machines:metal_former`) |
| Блочный резак (`block_cutter`) | ? | отдельная задача #19 |
| Центрифуга (`centrifuge`), мойка руды | А | Extras: `Thermal Centrifuge`, `Ore Washing Plant`, `Thermal Washer` |
| Индукционная печь, доменная печь | ✓ | `INDUCTION_FURNACE`, `ELECTRIC_BLAST_FURNACE` |
| Консервный завод (`canner`, `solid_canner`, `fluid_bottler`) | ✓ | `CANNER`, `Fluid Canning Machine` (Extras) |
| Генераторы: обычный, геотермальный, солнечный, водяной, ветряной | ✓ | `GENERATOR`, `GEOTHERMAL_GENERATOR`, `SOLAR_PANEL*`, `WATER_MILL*`, `WIND_TURBINE` |
| Полужидкостный генератор | ✓ | `LIQUID_FUEL_GENERATOR` |
| RT-генератор | ≈ | Extras: `Plutonium RTG`, `Thorium RTG`, `Thermo Electric Generator` (принимает только RTG); обычного RT-генератора нет |
| Генератор Стирлинга, кинетические генераторы, паровая кинетика | ✗ | кинетической системы нет, см. #17 |
| Тепловые генераторы (электро-, жидкостный, твёрдотопливный, RT) | А | Extras: `Electric Heat Generator`, `Solid Fuel Firebox`, `Liquid Fuel Firebox`; RT-варианта нет |
| Паровой генератор, конденсатор, жидкостный теплообменник | ≈ | `FUEL_BOILER`, `STEAM_TURBINE`, `STEAM_TUNNEL`, `Advanced Steam Turbine` (Extras); отдельного `condenser` и `steam_repressurizer` нет |
| Ферментер | А | Extras: `Fermenter` |
| Солнечный дистиллятор | ✗ | не найден |
| Коксовая печь, огнеупорный кирпич, кокс | ✗ | `WOOD_GASSIFIER` не заменяет |
| Реактор, камера реактора | ✓ | `NUCLEAR_REACTOR`, `REACTOR_CHAMBER`, `STEAM_REACTOR` |
| Люки реактора (доступ, редстоун, жидкость) | ? | прямых названий нет; в 1.19.2 реакторы устроены иначе |
| Накопители BatBox, CESU, MFE, MFSU, трансформаторы LV–EV | ✓ | `BATBOX`, `MFE`, `MFSU` (+ `ESU`, `ISU`, `PESU`), `TRANSFORMER_*`; CESU в IC2C нет, его роль у MFE-ряда |
| Зарядные площадки | ✓ | `LV_CHARGEPAD` … `FISSION_CHARGEPAD` |
| Электролизёр | ✓ | `ELECTROLYZER`, `CHARGED_ELECTROLYZER` |
| Насос, майнер | ✓ | `PUMP`, `MINER`, `ROCKET_MINER`; Advanced Miner, см. #18 |
| Теслакатушка, телепорт, магнетайзер, терраформер | ✓ | `TESLA_COIL`, `TELEPORTER`, `MAGNETIZER`, `TERRAFORMER` |
| Светильник, загрузчик чанков | ✓ | `LUMINATOR`, `CHUNKLOADER` |
| Cropmatron, crop harvester | ✓ | `CROP_MATRON`, `CROP_HARVESTER` |
| Mass Fabricator | ✓ | `MASS_FABRICATOR`; Scanner/Pattern Storage/Replicator ✗ (#16, решение: не делаем) |
| Промышленный верстак, пакетный крафтер | ≈ | `INDUSTRIAL_WORKBENCH`, `CRAFTER`, `Autocrafting Table` (Extras) |
| Сортирующая машина, буфер, дистрибьюторы | ≈ | трубки: `FILTER_TUBE`, `STACKING_TUBE`, `ROUND_ROBIN_TUBE`…; `MACHINE_BUFFER`; weighted distributor ✗ |
| Торговые автоматы, энергоавтомат, личный сундук | ✓ | `TRADE_O_MAT`, `ENERGY_O_MAT`, `PERSONAL_CHEST` |
| Ящики хранения (дерево, железо, бронза, сталь, иридий) | ✗ | заменяет `STORAGE_EXPANSION` / `PERSONAL_CHEST` |
| Баки (бронза, железо, сталь, иридий) | ≈ | `TANK`, `MACHINE_TANK`, `PERSONAL_TANK`, `FLUID_EXPANSION` |
| Творческий генератор | ✓ | `CREATIVE_SOURCE` |

## 5. Кабели, реактор, агро

| 1.12.2 | Статус | Что в сборке |
|---|---|---|
| Кабели: медь, олово, золото, железо, стекловолокно, детектор, сплиттер | ✓ | `*_CABLE*`, `GLASSFIBER_CABLE`, `DETECTOR_CABLE`, `SPLITTER_CABLE` (+ бронза, алюминий, супер, плазма) |
| Компоненты реактора: охладители, теплообменники, вентиляторы | ✓ | `VENT_*`, `HEAT_EXCHANGER*`, `COOLANT_CELL_*`, `CONDENSATOR*` |
| Отражатели, обшивка, стержни U/MOX, лития и трития | ✓ / ✗ | `REFLECTOR*`, `PLATING*`, `URANIUM_ROD_*`; Extras: Th, Pu, MOX, U233/235/238; литиевых и тритиевых стержней нет |
| Культуры, семена, удобрения, мешки | ✓ | `CROP_*`, `FERTILIZER`, `WEEDEX`, `HYDRATION_CELL`; отдельный crop-library в IC2C |
| Кружки, напитки | ✓ | `MUG_*`, `GLASS_*` |
| Жидкости: биогаз, биомасса, пена, хладагент, дистиллят, пар, лава, UU, WeedEx | ≈ | по ячейкам и `TANK`; жидкого UU нет (предмет `UUMATTER`) |
| CFoam, леса, укреплённые блоки, стекло | ✓ | `CFOAM_*`, `SCAFFOLD_*`, `REINFORCED_*` |

## 6. Что из этого стоит сделать

**P1 (без Java, рецептами и предметами KubeJS):**
- пластины лазурита и обсидиана и их плотные варианты (для рецептов 1.12.2), если эти рецепты нужны;
- решить по блокам питания (`power_unit`, `small_power_unit`): их нет, но они нужны в рецептах инструментов 1.12.2; сначала посмотреть рецепты инструментов IC2C, а не добавлять предметы вслепую;
- алюминиевая пластина и композит (сделано), свинцовая пластина (сделано).

**P2 (нужна разработка или аддон):**
- кинетика (#17), Advanced Miner (#18), блочный резак и Advanced RE-Battery (#19);
- коксовая печь, ящики хранения, солнечный дистиллятор (если захотим воспроизводить их).

**P3 (скорее не нужно):** сталь (заменяет рафинированное железо), литий и тритий, йод, лом, ветромер, плазменная пушка, сумка семян.

## 7. Что не проверено

- Игровые рецепты и JEI: ни один пункт этой матрицы.
- Названия вида `?` требуют просмотра классов `ic2/core/block/machines/...`.
- Подтипы улучшений (upgrades), точное соответствие рецептов 1.12.2 и IC2C по каждой машине.
