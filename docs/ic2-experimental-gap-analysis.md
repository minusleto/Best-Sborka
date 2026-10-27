# IC2 Experimental 1.12.2 → IC2 Classic 1.19.2: gap analysis

**Issue:** [#15 Полный аудит различий IC2 Experimental 1.12.2 и IC2 Classic 1.19.2](https://github.com/minusleto/Best-Sborka/issues/15)  
**Сборка:** Minecraft 1.19.2 Forge, IC2 Classic `2.1.3.4`, KubeJS `1902.6.2-build.73`.  
**Эталон:** IC2 Experimental 2.8.x для Minecraft 1.12.2 (в документации сборки указан `2.8.222-ex112`).  
**Статус документа:** первичный статический аудит источников и JAR; это не заявление о полной игровой проверке.

## 1. Краткий вывод

IC2 Classic — не «IC2 Experimental, перенесённый на новую версию». Classic вырос из более ранней ветки IC², а 1.19.2-версия получила собственные системы и существенные изменения. Поэтому сравнение надо делать по игровым функциям, а не по совпадению названий. В wiki самого IC2 Classic отдельно предупреждают, что значительная часть старых страниц относится к 1.12 и что в 1.19 есть существенные изменения; также не следует устанавливать IC2 Experimental рядом с IC2 Classic. См. [IC2 Classic Wiki — Home](https://github-wiki-see.page/m/TinyModularThings/IC2Classic/wiki).

На момент первичного анализа уже подтверждено по локализациям/ресурсам JAR:
- IC2 Classic содержит большой собственный набор предметов и машин, которых не стоит автоматически переносить из Experimental: в частности, расширенные сканеры, Crop Harvester, Terraformer, Mass Fabricator, Water Mills разных уровней, Solar Panels разных уровней, Electrolyzer/Charged Electrolyzer, Centrifugal Extractor и другие собственные варианты.
- IC2C Extras уже закрывает несколько известных «экспериментальных» пробелов: Coil, Ore Washing Plant, Thermal Centrifuge, Electric Heat Generator, дополнительные ядерные топливные материалы/стержни, а также расширенные руды и стадии переработки.
- В репозитории уже есть собственная реализация части Experimental-процесса: KubeJS регистрирует пластины и Forge Hammer, меняет рецепты кабелей, добавляет рецепт Energium Dust/Energy Crystal и рецепт Advanced Machine Casing; в JAR `bs-machines-0.1.0.jar` есть собственный Metal Former. Это видно в `kubejs/server_scripts/ic2_energy_crystal.js` и исходном журнале `docs/recipe-changes.md`.
- Самые явные кандидаты на отдельную проверку — Electric Motor и Tin Item Casing, а также машины/механики, которых не видно в локализациях базового IC2C и установленных дополнений. Отсутствие текстового ключа — только сигнал для проверки, не окончательное доказательство отсутствия.

**Важно:** wiki Experimental содержит описание целой системы, но часть страниц отражает разные подверсии IC² V2.X. Перед переносом любого рецепта нужно сверить именно версию 1.12.2 и реальный JAR/код. Не копировать registry ID из 1.12.2 напрямую в 1.19.2.

## 2. Источники и метод

### Внешние справочники

1. [Recipes and Resources (experimental)](https://wiki.industrial-craft.net/index.php?title=Recipes_and_Resources_%28experimental%29) — основной перечень ресурсов, кабелей, накопителей, генераторов, машин, апгрейдов, брони и инструментов. Страница прямо маркирована как Experimental-only и описывает ветку V2.X.
2. [Category:Experimental](https://wiki.industrial-craft.net/index.php?title=Category%3AExperimental) — индекс страниц Experimental; в выдаче перечислено 89 страниц, включая Advanced Alloy/Circuit/Heat Exchanger, Heat Vent, Power Unit, Pump, Reactor Plating, Solar Distiller, Steam, Tin Cable, UU-liquid и другие.
3. [V2.X](https://wiki.industrial-craft.net/index.php?title=V2.X) — общий контекст изменений Experimental.
4. [Electric Motor](https://wiki.industrial-craft.net/index.php?title=Electric_Motor) — указывает использования мотора в Heat Vent, Kinetic Generator, Ore Washing Plant, Power Unit, Scanner, Small Power Unit и Thermal Centrifuge.
5. [IC2 Classic Wiki](https://github-wiki-see.page/m/TinyModularThings/IC2Classic/wiki) и [Page Index](https://github-wiki-see.page/m/TinyModularThings/IC2Classic/wiki_index) — для проверки альтернативных реализаций Classic. Wiki предупреждает, что значительная часть контента описана для 1.12 и что 1.19 может отличаться.

### Локальные материалы

Проверен архив `mods.zip` (36 JAR) и следующие основные JAR:
- `IC2Classic-1.19.2-2.1.3.4.jar`
- `IC2CExtras-2.0.5.jar`
- `ic2c-additions-1.19.2-1.0.2.jar`
- `gravisuit-2.4.2.jar`
- `advancedsolars-2.1.2.jar`
- `ic2cuumatter-1.19.2-1.3.2.jar`
- `bs-machines-0.1.0.jar`

Статический аудит использовал имена файлов, JSON-локализации и ресурсы JAR, а также сопоставление с существующими файлами KubeJS/документации репозитория. Некоторые регистрационные данные могут находиться только в байткоде, а поведение — в Java-коде; такие случаи помечены как требующие дополнительной проверки. **Запуск игры, просмотр JEI и тестирование всех рецептов в рамках этого первичного отчёта не выполнялись.**

## 3. Статусы

- **Есть в IC2C** — предмет/машина найдены в ресурсах IC2 Classic; это ещё не гарантирует совпадение механики с Experimental.
- **Есть в аддоне** — найдено в одном из установленных IC2-дополнений.
- **Есть в сборке** — есть собственная реализация/рецепт в репозитории или `bs-machines`.
- **Кандидат на восстановление** — не найдено очевидного соответствия в проверенных локализациях/ресурсах, но требуется проверка registry и кода.
- **Нужно сравнить поведение** — название есть, но это не доказывает идентичность функции, параметров или рецепта.
- **Не проверено в игре** — статический анализ не заменяет проверку в JEI и реальном мире.

## 4. Приоритетные выводы

| Приоритет | Кандидат / система Experimental | Что видно в установленной сборке | Следующий шаг |
|---|---|---|---|
| P0 | Electric Motor | Не найден как очевидный отдельный предмет в локализациях базового IC2C/Extras; для него есть отдельная задача [#13](https://github.com/minusleto/Best-Sborka/issues/13) | Проверить все registry/class references, затем решить: добавить предмет или использовать эквивалент |
| P0 | Tin Item Casing | Текстовый поиск не подтвердил предмет; общая информация о «casings» в Extras сама по себе не доказывает наличие именно Tin Item Casing | Проверить регистрацию и рецепты в байткоде; задача [#14](https://github.com/minusleto/Best-Sborka/issues/14) |
| P0 | Применения Coil | В Extras найден `ic2c_extras:coil`; наличие предмета подтверждено, но полный набор применений надо сверить | Сопоставить все рецепты из Experimental и рецепты текущих модов |
| P1 | Block Cutting Machine | Не найдено очевидного совпадения в локализации IC2C/проверенных Extras | Проверить код/рецепты; оценить полезность отдельной машины в текущей прогрессии |
| P1 | Kinetic machines / Turning Table | Поиск ключей не выявил очевидных машин Kinetic/Turning Table в базовой локализации IC2C | Проверить регистрацию, API и возможные альтернативы; это механика, не восстанавливаемая только рецептами |
| P1 | Advanced Miner / Miner modules | Есть сканеры и собственные добывающие инструменты/машины, но совпадение с Experimental Miner не доказано | Сравнить функциональность и слоты, прежде чем добавлять |
| P1 | Advanced RE-Battery | Ключа предмета с таким именем не найдено; есть `ic2:re_battery`, Energy Crystal и Lap(o)tron Crystal | Проверить ёмкость/tiers; при необходимости решить, нужен ли отдельный промежуточный аккумулятор |
| P1 | Heat/Steam/RTG generation | Extras содержит Electric Heat Generator, RTG items, Thermo Electric Generators и расширенную ядерную ветку; базовый IC2C имеет собственные машины | Сравнить конкретные режимы, входы/выходы и баланс, не добавлять дубликаты по названию |
| P1 | Ядерные компоненты | Extras содержит разные топливные стержни (UOX, MOX, Plutonium, Thorium, Uranium-238/233/235 и варианты), IC2C имеет собственный реактор и компоненты | Сопоставить механику каждого компонента с Experimental; проверить рецепты/баланс |
| P2 | Terraformer Blueprints | Terraformer найден в IC2C, но это не подтверждает наличие каждого Experimental TFBP/эффекта | Проверить все типы blueprint и доступные эффекты в текущей версии |
| P2 | Electrolyzed Water Cell | Найден ключ `item.ic2.cell_electrolyzed_water` | Проверить условие зарядки, пороги и потери энергии в коде/игре |
| P2 | Crop/Agri | Crop Harvester, WeedEx, Hydration Cell и другие агро-предметы найдены; не все старые сельхоз-механики очевидны по строкам | Сверить Crop-Matron, Cropnalyzer, Seed Bag, booze/brewing и мутации с текущим crop-системным API |
| P2 | Reinforced construction / scaffold | В IC2C есть reinforced blocks/door и деревянные/железные scaffold | Сравнить процесс CF Foam + scaffold и взрывостойкость, а не создавать аналоги вслепую |
| P2 | Utility tools | В IC2C есть Wire Cutter, EU Reader, Painter, Wrench и Electric Wrench | Сверить функциональность с Experimental Cutter/Painter/EU Reader; вероятны аналоги, а не отсутствие |

## 5. Разбор по системам

### 5.1 Материалы, детали и рецепты прогрессии

Experimental описывает отдельные компоненты: Advanced Alloy, Advanced Circuit, Basic Machine Casing, Coil, Electric Motor, Heat Conductor, plates/casings, Crystal Memory, Pattern Storage, Power Unit и Small Power Unit. В текущей сборке часть старой цепочки уже возвращена, но не в исходном виде:

- **Пластины и Forge Hammer:** реализованы через KubeJS (см. `kubejs/server_scripts/ic2_energy_crystal.js` и соответствующие startup/data assets).
- **Metal Former:** есть собственная машина `bs_machines:metal_former`; рецепт и поведение должны рассматриваться как реализация сборки, а не как встроенный IC2C.
- **Кабели:** рецепты IC2C для четырёх кабельных предметов удаляются и заменяются прогрессией через Metal Former; это уже есть в скрипте, но требует полного игрового регрессионного теста.
- **Energium Dust/Energy Crystal:** экспериментальная цепочка пыль → компрессор → Energy Crystal добавлена.
- **Advanced Machine Casing:** рецепт изменён, используется `kubejs:iron_plate` вместо недоступной стальной пластины.
- **Coil:** подтверждён в IC2C Extras как `ic2c_extras:coil`. Нельзя регистрировать вторую катушку; нужно найти реальные uses.
- **Electric Motor:** отсутствует как очевидный локализованный предмет в проверенных файлах. Это главный компонентный кандидат, но прежде чем регистрировать, нужно проверить код и все рецепты.
- **Tin Item Casing:** текстовый поиск не подтвердил предмет. Требуется отдельный поиск по registry/байткоду; если он отсутствует, нужно решить, добавлять ли его как отдельный компонент или выбрать уже имеющийся эквивалент.

Рекомендация: сначала закончить #13 и #14, потому что эти детали влияют на рецепты нескольких машин из Experimental.

### 5.2 Обработка руд и металлургия

В Experimental базовая цепочка включает Macerator → Ore Washing Plant → Thermal Centrifuge и Metal Former (Rolling/Extruding/Cutting), а также Block Cutting Machine. В текущих JAR:
- IC2C Extras содержит `ic2c_extras:ore_washing_plant` и `ic2c_extras:thermal_centrifuge`, а также измельчённые/очищенные руды и мелкие пыли.
- IC2C содержит собственные Extractor/Centrifugal Extractor, Compressor и другие процессоры.
- В сборке есть Metal Former, но это custom mod.
- Block Cutting Machine не найден как очевидный локализованный блок в проверенных JAR.

Решения:
1. Не добавлять Ore Washing Plant и Thermal Centrifuge повторно.
2. Проверить все рецепты Extras, чтобы выяснить, какие этапы очистки действительно доступны и корректно связаны.
3. Сравнить рецепты Metal Former: rolling (пластины/оболочки), extruding и cutting (кабели/провода) и проверить выходы/стоимость.
4. Для Block Cutting Machine оценить, добавляет ли она отдельную механику сверх текущего Metal Former; если нет, не переносить ради формального паритета.

### 5.3 Энергия, кабели и накопители

Experimental wiki перечисляет BatBox, CES, MFE, MFS, Single-Use Battery, RE Battery, Advanced RE-Battery, Energy Crystal, Lapotron Crystal и Electrolyzed Water Cell, а также трансформаторы и несколько специальных кабелей.

В текущем IC2C есть RE Battery (в локализации названа Reusable Battery), Energy Crystal, Lap(o)tron Crystal (реальный ID в текущем скрипте — `ic2:lapatron_crystal`), несколько типов кабеля и много собственных накопителей/генераторов. Electrolyzed Water Cell присутствует как ключ `item.ic2.cell_electrolyzed_water`.

Кандидаты на поведенческое сравнение:
- ёмкость/tiers и рецепты Advanced RE-Battery;
- поведение Electrolyzed Water Cell: когда заряжается, сколько EU хранит и как теряет энергию;
- напряжение, потери и совместимость кабелей;
- трансформаторы и их направления;
- наличие/эквивалент Single-Use Battery и способность питать машины из слота;
- все рецепты кабелей после вмешательства KubeJS.

Нельзя делать вывод «нет», основываясь лишь на том, что ID называется иначе. Нужно сверять классы/registry и фактические параметры.

### 5.4 Генерация энергии, тепло и кинетика

Experimental включает обычный Generator, Geothermal, Solar, Water Mill, Wind Mill, Semifluid Generator, Stirling Generator, RTG, Kinetic Generator, а также Electric/Solid/Fluid/Radioisotope Heat Generators и Liquid Heat Exchanger. Wiki описывает Kinetic Wind Generator, Manual Kinetic Generator и Kinetic Steam Generator как отдельные машины.

В локализациях текущего IC2C обнаружены собственные Solar Panel tiers, Water Mill tiers, а также несколько машин, связанных с теплом/энергией. Extras добавляет Electric Heat Generator, Thermo Electric Generator и Thermo Electric Generator MkII, а также Plutonium/Thorium RTG-предметы. Это означает, что название в Experimental может отсутствовать, а функция быть объединена с другой машиной.

Пока не подтверждено соответствие:
- Kinetic Generator / Kinetic Wind Generator / Manual Kinetic Generator / Kinetic Steam Generator;
- Turning Table и lathing tools, связанные с кинетической энергией;
- Stirling Generator и Radioisotope Heat Generator как отдельные механики;
- Experimental Liquid Heat Exchanger и все способы производства/передачи hU;
- точные характеристики Wind Mill/Solar/Water Mill, сравнимые с 1.12.2.

Приоритет: сначала проверить наличие функционального аналога в IC2C/Extras, затем решать, нужна ли новая механика. KubeJS может менять рецепты, но не заменит полноценный кинетический API/машину.

### 5.5 Ядерная энергетика

Experimental wiki описывает компоненты реактора и отдельные цепочки: Uranium/MOX rods, dual/quad rods, Near-Depleted и Re-Enriched rods, isotopic rods, reactor plating, containment plating, heat-capacity plating, reflectors, heat vents, heat exchangers, coolant cells, condensators, steam reactor и fuel/heat mechanics.

Extras содержит расширенную номенклатуру топлив: UOX, MOX, Plutonium, Thorium-232/230, Uranium-238/233/235, а также near-depleted, isotopic и re-enriched варианты. В нём есть Plutonium RTG и Thorium RTG. В базовом IC2C есть собственная система реактора и компоненты (heat vents/exchangers/plating/reflectors и другие ключи).

Вывод: **нельзя считать всю ядерную ветку отсутствующей**. Нужно сопоставить по каждому компоненту:
- registry ID и recipe;
- разрешён ли он в текущем реакторе;
- тепловой эффект и параметры охлаждения;
- есть ли steam-reactor как отдельный блок и каковы его правила;
- совпадают ли рецепты UOX/MOX/Thorium/Plutonium с Experimental;
- баланс топлива и генерации.

Отдельно проверить «Steam Reactor» из IC2C (по in-game wiki у Classic он может быть собственным расширением), не приравнивая его к Experimental Steam Generator/Kinetic Steam Generator.

### 5.6 Добыча, жидкости и Terraformer

Experimental содержит Miner, Advanced Miner, Pump, Mining Pipe, OD/OV Scanner и Terraformer с blueprint-наборами (Chilling, Cultivation, Desertification, Flatificator, Irrigation и др.).

В IC2C обнаружены разные Ore Scanner/OD/OV/Filtered Scanner, Terraformer и ряд собственных инструментов/машин. Это подтверждает наличие части технологий, но не гарантирует те же слоты, способ добычи, модульность, fluid handling или набор Terraformer Blueprint.

Нужно проверить:
- обычный Miner и Advanced Miner, включая модульные слоты, pipe, drill, scanner и автоматическую разгрузку;
- Pump и поведение с жидкостями/ячейками;
- каждый TFBP и его эффект;
- Mass Fabricator/UU-Matter и возможные способы replication;
- наличие Pattern Storage/Crystal Memory/Scanner из Experimental: в проверенных ключах базового IC2C нет очевидного прямого набора Experimental Replicator/Pattern Storage/Crystal Memory, но необходимы проверка кода и функциональных альтернатив.

### 5.7 Броня, инструменты и утилиты

В Experimental есть Bronze gear, Nano/Quantum, Nightvision Goggles, Hazmat, Bat-Pack/Advanced Bat-Pack/Energypack, Composite Armor, Jetpacks, CF Backpack, Scuba Helmet, Rubber Boots, Static Boots, Solar Helmet, Electric Hoe/Wrench/Treetap, Chainsaw/Mining Drill, Forge Hammer, Treetap, Wrench, Cutter, Painter, EU Reader, scaffolds и reinforced construction.

В IC2C/аддонах есть много прямых или расширенных вариантов:
- Nano/Quantum armor, Nightvision Goggles и электрические инструменты;
- Gravisuit: Gravitation Jetpack, Advanced Electric/Nuclear Jetpacks, Advanced/Ultimate Lappack, Gravitool, Vajra и другие;
- Advanced Solars: панели и солнечные шлемы высоких уровней;
- IC2C: Wire Cutter, EU Reader, Painter, Wrench/Electric Wrench, reinforced blocks/door, wooden/iron scaffolds, Solar Helmet, Static Boots, Terraformer.

Поэтому основной вопрос — не «есть ли похожее название», а:
- совпадает ли функция/рецепт;
- заменяет ли Gravisuit старый jetpack или добавляет отдельный уровень;
- доступны ли старые BatPack/Advanced BatPack/Energypack или есть эквивалент;
- есть ли Scuba Helmet, Rubber Boots, CF Backpack и Composite Vest/Armor;
- совпадают ли режимы Cutter/Painter/EU Reader;
- работает ли reinforced construction по старому процессу Construction Foam + scaffold.

### 5.8 Агрокультура, жидкости и UU-Matter

Experimental wiki включает Crops, Crop-Matron, Crop Harvester, Cropnalyzer, Seed Bag, Booze Barrel, Weed-EX, Hydration Cell, fertilizer, Grin Powder, fluids (UU-Matter, Construction Foam, Coolant, Hot Coolant, Pahoehoe Lava, Biomass/Biogas, Distilled Water, Steam/Superheated Steam).

IC2C локализация показывает Crop Harvester, WeedEx, Hydration Cell, crops и другие агро-предметы. IC2C Extras добавляет дополнительные nuclear materials/processing; IC2C UU Matter установлен отдельным модом, но его локализация содержит в основном технические tooltip-строки, поэтому наличие самого JAR не позволяет судить о точной реализации.

Проверить:
- Crop-Matron/Cropnalyzer/Seed Bag и точные рецепты/функции;
- Weed-EX vs WeedEx, Hydration Cell и crop stats/mutation;
- Booze Barrel/fermentation/brewing;
- Construction Foam, CF Sprayer, CF Backpack и Reinforced Stone process;
- UU-Matter: Mass Fabricator, replicator-like uses, crops/library, рецептные возможности;
- Coolant/Hot Coolant/Distilled Water/Steam/Superheated Steam/Pahoehoe Lava как жидкости и рецепты, не только item IDs.

### 5.9 Системы, которые не стоит «восстанавливать» без доказательства

- Любая машина, уже присутствующая в IC2C Extras (Ore Washing Plant, Thermal Centrifuge, Electric Heat Generator, Thermo Electric Generator) — сначала аудит её рецептов и поведения.
- Электрические инструменты/броня, у которых есть расширенные версии в IC2C или Gravisuit.
- Кабели и пластины, которые уже реализованы текущими KubeJS/custom-mod изменениями.
- Ресурсы/механики, для которых в 1.19.2 есть другой registry ID или объединённая реализация.
- Функции, зависящие от старой EU-net, hU/kinetic API, worldgen или tile entity: они не восстанавливаются одним shaped recipe.

## 6. Список дальнейших проверок

### P0 — закрыть цепочку деталей
- [ ] #13 Electric Motor: найти точный registry/класс и восстановить мотор только если отсутствует.
- [ ] #14 Tin Item Casing: подтвердить регистрацию/ID/рецепт, затем использовать существующий предмет или добавить его.
- [ ] Coil: перечислить все usages в текущих JAR и сравнить с Experimental; сохранить один ID.
- [ ] Проверить все рецепты Metal Former и устранить dead-end/circular recipes.

### P1 — технологические машины и рецепты
- [ ] Block Cutting Machine: проверить отсутствие в коде и оценить пользу.
- [ ] Kinetic Generator family + Turning Table: установить, есть ли функциональный аналог.
- [ ] Advanced Miner/Miner/Pump: сравнить функциональность и доступность.
- [ ] Advanced RE-Battery/Single-Use Battery/Electrolyzed Water Cell: проверить параметры.
- [ ] Сопоставить генераторы и heat systems (RTG, Stirling, fluid/solid/radioisotope heat, heat exchanger).
- [ ] Сопоставить ядерные компоненты и Steam Reactor/Steam Generator, не добавляя дубликаты.

### P2 — инструменты, сельское хозяйство и материалы
- [ ] TFBP/terraformer blueprints.
- [ ] Crop-Matron/Cropnalyzer/Seed Bag/Booze Barrel и связанные рецепты.
- [ ] Scuba Helmet, Rubber Boots, CF Backpack, Composite Vest/Armor, Bat-Pack variants.
- [ ] Cutter/Painter/EU Reader и reinforced construction.
- [ ] Pattern Storage/Crystal Memory/Replicator/UU Matter: подтвердить реальные альтернативы.
- [ ] Прочие 89 страниц категории Experimental, сверить каждую релевантную страницу и версию.

## 7. Правила реализации и тестирования

1. Сначала найти существующий ID по registry/байткоду, потом писать рецепт.
2. Сравнивать не только названия, но и входы/выходы, EU/t, стоимость операции, tier, slots, поведение и прогрессию.
3. Если функционал отсутствует и требует полноценной машины/механики — завести отдельную задачу на custom mod или подобрать совместимый мод; не маскировать отсутствие одним рецептом.
4. После изменений проверить загрузку скриптов в `latest.log`, наличие рецептов в JEI и результат в чистом тестовом мире.
5. Отмечать в документации, что было проверено статически, а что — в игре.
6. Все новые Issue называть с номером в начале, например `#16 ...`.

## 8. Источники

- [Experimental Recipes and Resources](https://wiki.industrial-craft.net/index.php?title=Recipes_and_Resources_%28experimental%29)
- [Experimental category (89 pages)](https://wiki.industrial-craft.net/index.php?title=Category%3AExperimental)
- [V2.X overview](https://wiki.industrial-craft.net/index.php?title=V2.X)
- [Electric Motor: recipe uses](https://wiki.industrial-craft.net/index.php?title=Electric_Motor)
- [IC2 Classic wiki: version caveat and 1.19 information](https://github-wiki-see.page/m/TinyModularThings/IC2Classic/wiki)
- [IC2 Classic wiki page index](https://github-wiki-see.page/m/TinyModularThings/IC2Classic/wiki_index)
- [IC2 Classic 1.19.2 specific changes (secondary source)](https://wiki.9minecraft.net/ic2-classic-mod/guides/ic2-classic-1-19-2-specific-changes/)

## 9. Ограничения этого отчёта

Это **первый проход**, а не заявление, что каждый из 89 страниц и каждый класс JAR уже разобран полностью. Статически проверены основные JAR, локализации и ресурсы, а wiki использована для составления системного списка. Для завершения Issue #15 нужно продолжить инспекцию registry/class/recipe data и проверить игровые функции в запущенном экземпляре. Там, где нет доказательства отсутствия или идентичности механики, отчёт явно оставляет статус «проверить».


## 10. Дополнительная проверка байткода IC2 Classic

После первого прохода выполнен поиск ASCII-констант по class-файлам IC2 Classic 2.1.3.4 и по локализациям нескольких аддонов. Это сильнее простого поиска в переводах, но всё ещё не полная декомпиляция всех методов и не игровое тестирование.

### Прямо подтверждено в реестровых классах IC2C

В `ic2/core/platform/registries/IC2Blocks.class` обнаружены, среди прочего, константы:
- машины/системы: `CROP_MATRON`, `CROP_HARVESTER`, `CROP_ANALYZER`, `PUMP`, `MINER`, `ADVANCED_MACHINE_BLOCK`, `TERRAFORMER`, `MASS_FABRICATOR`, `ROCKET_MINER`, `FUSION_REACTOR`, `STEAM_REACTOR`, `REACTOR_PLANNER`, `ELECTROLYZER`, `CHARGED_ELECTROLYZER`, `CENTRIFUGAL_EXTRACTOR`, `CENTRIFUGAL_RARE_EARTH_EXTRACTOR`;
- генераторы/энергия: `GENERATOR`, `GEOTHERMAL_GENERATOR`, `SOLAR_PANEL` и уровни Solar Panel, `WATER_MILL` и уровни Water Mill, `WIND_TURBINE`, `SOLAR_TURBINE`, `THERMAL_GENERATOR`, `STEAM_TURBINE`, `WAVE_GENERATOR`, `OCEAN_GENERATOR`, `LIQUID_FUEL_GENERATOR`;
- трансформаторы: `TRANSFORMER_LV/MV/HV/EV/IV` и `TRANSFORMER_ADJUSTABLE`;
- кабели: `TIN_CABLE`, `COPPER_CABLE`, `GOLD_CABLE`, `BRONZE_CABLE`, `IRON_CABLE`, `ALUMINUM_CABLE`, `GLASS_CABLE`, `SUPER_CABLE`, `PLASMA_CABLE`, `DETECTOR_CABLE`, `SPLITTER_CABLE`, `COMPARING_CABLE`;
- reinforced/scaffold: `SCAFFOLD_WOOD`, `SCAFFOLD_IRON`, `REINFORCED_STONE`, `REINFORCED_GLASS`, `REINFORCED_DOOR`.

В `ic2/core/platform/registries/IC2Items.class` обнаружены константы:
- `VENT_HEAT`, `VENT_HEAT_ADVANCED`, `VENT_HEAT_CORE`, `VENT_HEAT_OVERCLOCKED`, steam/electric vents, heat exchangers, heat balancers, heat pump, coolant cells 10K/30K/60K, condensators, plating;
- `EU_READER`, `PAINTER` и цветные варианты, `MINER_REMOTE`, `MEMORY_STICK`, `FREQUENCY_TRANSMITTER`;
- кабельные предметы и utility items.

Поиск по class-файлам также подтвердил, что Crop-Matron и Electric Hoe/Treetap упоминаются в коде IC2C, даже если поиск по отдельным локализационным ключам не всегда показывал их явно. Следовательно, старые выводы по сельскому хозяйству и электрическим инструментам нужно трактовать как «сверить поведение», а не «отсутствует».

### Что всё ещё не подтверждено поиском констант

В проверенных классах/ресурсах не найдено очевидных прямых строк для `electric_motor`, `tin_item_casing`, `advanced_re_battery`, `block_cutting_machine`, `kinetic_generator`, `turning_table`, `pattern_storage`, `crystal_memory`, `replicator` и `advanced_miner`. Это **не финальное доказательство отсутствия**: имя могло быть другим, сборка могла объединить механику, или строка могла быть представлена иначе. Для каждого кандидата требуется более точечная проверка регистраций, классов и рецептов.

### Уточнённая интерпретация

- Crop-Matron — не считать отсутствующим: класс и регистрационная константа найдены.
- Miner/Pump/Terraformer — базовые классы присутствуют; сравнивать возможности и поведение с Experimental.
- Ядерная система — IC2C имеет отдельные Reactor/Steam Reactor/Fusion Reactor/Planner и большое число компонентов. Проверять разницу механик, а не переносить старые предметы автоматически.
- Генерация и передача энергии в IC2C намного шире классической схемы Experimental: есть дополнительные генераторы, tiers и регулируемый трансформатор. Сначала решить, какие старые функции действительно потеряны.
- Название `Advanced Miner` не найдено, но наличие `ROCKET_MINER` и `MINER` означает, что нужно сравнить их функции прежде, чем планировать восстановление Advanced Miner.

