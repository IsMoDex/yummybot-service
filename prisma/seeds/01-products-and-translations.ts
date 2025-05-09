import { PrismaClient } from '@prisma/client'

export async function runProductsAndTranslations(prisma: PrismaClient) {
    // ① «Жёсткий» список обязательных продуктов
    const mandatoryProductIds = [
        'banana','beetroot','broccoli','cauliflower','lemon','onion','orange','peas',
        'potato','shallot','strawberry','sweetcorn','tomato','apple','apples','asparagus',
        'aubergine','bacon','bananas','bazlama','beef','blueberries','bread','butter',
        'carrot','carrots','cheese','chicken','chicken_breast','chocolate','chocolate_chips',
        'corn','courgettes','cream','cream_cheese','dates','eggs','flour','ginger','goat_cheese',
        'green_beans','green_bell_pepper','green_chilies','ground_beef','ham','heavy_cream',
        'juice','lemons','lettuce','lime','mango','meat','milk','mineral_water',
        'mushroom','mushrooms','olive','olives','parsley','peach','peppers','potatoes',
        'red_bell_pepper','red_grapes','red_onion','salami','sauce','sausage','shrimp',
        'spinach','spring_onion','strawberries','sugar','sweet_potato','tomato_paste',
        'tomatoes','yellow_bell_pepper','yoghurt'
    ]

    // ② Русские переводы для обязательных
    const ruMap: Record<string,string> = {
        banana: 'Банан', beetroot: 'Свёкла', broccoli: 'Брокколи',
        cauliflower: 'Цветная капуста', lemon: 'Лимон', onion: 'Лук',
        orange: 'Апельсин', peas: 'Горох', potato: 'Картофель',
        shallot: 'Шалот', strawberry: 'Клубника', sweetcorn: 'Сладкая кукуруза',
        tomato: 'Помидор', apple: 'Яблоко', apples: 'Яблоки',
        asparagus: 'Спаржа', aubergine: 'Баклажан', bacon: 'Бекон',
        bananas: 'Бананы', bazlama: 'Базлама', beef: 'Говядина',
        blueberries: 'Черника', bread: 'Хлеб', butter: 'Масло',
        carrot: 'Морковь', carrots: 'Морковь', cheese: 'Сыр',
        chicken: 'Курица', chicken_breast: 'Куриная грудка', chocolate: 'Шоколад',
        chocolate_chips: 'Шоколадная крошка', corn: 'Кукуруза',
        courgettes: 'Кабачок', cream: 'Сливки', cream_cheese: 'Крем-чиз',
        dates: 'Финики', eggs: 'Яйца', flour: 'Мука', ginger: 'Имбирь',
        goat_cheese: 'Козий сыр', green_beans: 'Зелёная фасоль',
        green_bell_pepper: 'Зелёный перец', green_chilies: 'Зелёный чили',
        ground_beef: 'Фарш', ham: 'Ветчина', heavy_cream: 'Жирные сливки',
        juice: 'Сок', lemons: 'Лимоны', lettuce: 'Листья салата',
        lime: 'Лайм', mango: 'Манго', meat: 'Мясо', milk: 'Молоко',
        mineral_water: 'Минеральная вода', mushroom: 'Гриб', mushrooms: 'Грибы',
        olive: 'Оливка', olives: 'Оливки', parsley: 'Петрушка', peach: 'Персик',
        peppers: 'Перцы', potatoes: 'Картофель', red_bell_pepper: 'Красный перец',
        red_grapes: 'Красный виноград', red_onion: 'Красный лук',
        salami: 'Салями', sauce: 'Соус', sausage: 'Колбаса', shrimp: 'Креветка',
        spinach: 'Шпинат', spring_onion: 'Зелёный лук', strawberries: 'Клубника',
        sugar: 'Сахар', sweet_potato: 'Сладкий картофель',
        tomato_paste: 'Томатная паста', tomatoes: 'Помидоры',
        yellow_bell_pepper: 'Жёлтый перец', yoghurt: 'Йогурт',
    }

    // ③ 150 уникальных дополнительных продуктов
    const extraProductIds = [
        'avocado','almonds','walnuts','cashews','peanuts','hazelnuts','pistachios','chia_seeds',
        'flax_seeds','sunflower_seeds','pumpkin_seeds','oats','rolled_oats','steel_cut_oats',
        'rice','brown_rice','white_rice','jasmine_rice','basmati_rice','quinoa','barley',
        'couscous','buckwheat','millet','spaghetti','macaroni','fusilli','penne',
        'lasagna_sheets','rice_noodles','rice_flour','cornmeal','soy_sauce','vinegar','olive_oil',
        'sunflower_oil','coconut_oil','buttermilk','kale','arugula','cabbage','red_cabbage',
        'savoy_cabbage','bok_choy','chard','mustard_greens','garlic','turmeric','cinnamon',
        'nutmeg','cloves','black_pepper','white_pepper','paprika','cumin','oregano','thyme',
        'rosemary','basil','cilantro','dill','sage','tarragon','bay_leaves','mint','jalapeno',
        'shiitake_mushrooms','portobello_mushrooms','enoki_mushrooms','tofu','tempeh','seitan',
        'edamame','watercress','bean_sprouts','soy_milk','almond_milk','coconut_milk','oat_milk',
        'rice_milk','feta_cheese','parmesan','mozzarella','cheddar','blue_cheese','halloumi',
        'ricotta','mascarpone','greek_yoghurt','kefir','sour_cream','chickpeas','lentils',
        'kidney_beans','black_beans','pinto_beans','navy_beans','lima_beans','black-eyed_peas',
        'canned_tomatoes','tomato_sauce','ketchup','mayonnaise','mustard_sauce','bbq_sauce',
        'honey','maple_syrup','molasses','agave_syrup','jam','coffee','tea','espresso',
        'instant_coffee','cocoa_powder','baking_powder','baking_soda','yeast','cornstarch',
        'gelatin','sea_salt','brown_sugar','powdered_sugar','breadcrumbs','prosciutto',
        'smoked_sausage','salsa','smoothie','protein_powder','matcha_powder','energy_drink',
        'sparkling_water','mineral_water_sparkling','almond_butter','sunflower_butter',
        'blueberry_jam','fig_preserves','pepperoni','truffle_oil','port','sherry','cider',
        'kombucha'
    ]

    // ④ Собираем все IDs
    const allProductIds = [...mandatoryProductIds, ...extraProductIds]

    // ⑤ Ручная карта эмодзи
    const emojiMap = new Map<string, string>([
        ['banana','🍌'], ['beetroot','🥕'], ['broccoli','🥦'], ['cauliflower','🥦'], ['lemon','🍋'],
        ['onion','🧅'], ['orange','🍊'], ['peas','❔'], ['potato','🥔'], ['shallot','🧅'],
        ['strawberry','🍓'], ['sweetcorn','🌽'], ['tomato','🍅'], ['apple','🍎'], ['apples','🍎'],
        ['asparagus','❔'], ['aubergine','🍆'], ['bacon','🥓'], ['bananas','🍌'], ['bazlama','🍞'],
        ['beef','🥩'], ['blueberries','🫐'], ['bread','🍞'], ['butter','🧈'], ['carrot','🥕'],
        ['carrots','🥕'], ['cheese','🧀'], ['chicken','🍗'], ['chicken_breast','🍗'], ['chocolate','🍫'],
        ['chocolate_chips','🍫'], ['corn','🌽'], ['courgettes','❔'], ['cream','🥛'], ['cream_cheese','🧀'],
        ['dates','❔'], ['eggs','🥚'], ['flour','🌾'], ['ginger','❔'], ['goat_cheese','🧀'],
        ['green_beans','❔'], ['green_bell_pepper','🫑'], ['green_chilies','🌶️'], ['ground_beef','🥩'],
        ['ham','🍖'], ['heavy_cream','🥛'], ['juice','🧃'], ['lemons','🍋'], ['lettuce','🥬'],
        ['lime','🍋'], ['mango','🥭'], ['meat','🍖'], ['milk','🥛'], ['mineral_water','💧'],
        ['mushroom','🍄'], ['mushrooms','🍄'], ['olive','🫒'], ['olives','🫒'], ['parsley','🌿'],
        ['peach','🍑'], ['peppers','🫑'], ['potatoes','🥔'], ['red_bell_pepper','🫑'], ['red_grapes','🍇'],
        ['red_onion','🧅'], ['salami','🥓'], ['sauce','❔'], ['sausage','🌭'], ['shrimp','🍤'],
        ['spinach','🥬'], ['spring_onion','🧅'], ['strawberries','🍓'], ['sugar','🍬'], ['sweet_potato','🍠'],
        ['tomato_paste','🍅'], ['tomatoes','🍅'], ['yellow_bell_pepper','🫑'], ['yoghurt','🥛'],
        ['avocado','🥑'], ['almonds','🥜'], ['walnuts','🥜'], ['cashews','🥜'], ['peanuts','🥜'],
        ['hazelnuts','🥜'], ['pistachios','🥜'], ['chia_seeds','❔'], ['flax_seeds','❔'], ['sunflower_seeds','❔'],
        ['pumpkin_seeds','❔'], ['oats','🥣'], ['rolled_oats','🥣'], ['steel_cut_oats','🥣'], ['rice','🍚'],
        ['brown_rice','🍚'], ['white_rice','🍚'], ['jasmine_rice','🍚'], ['basmati_rice','🍚'], ['quinoa','❔'],
        ['barley','❔'], ['couscous','❔'], ['buckwheat','❔'], ['millet','❔'], ['spaghetti','🍝'],
        ['macaroni','🍝'], ['fusilli','🍝'], ['penne','🍝'], ['lasagna_sheets','🍝'], ['rice_noodles','🍜'],
        ['rice_flour','❔'], ['cornmeal','🌽'], ['soy_sauce','🥫'], ['vinegar','❔'], ['olive_oil','🛢️'],
        ['sunflower_oil','🛢️'], ['coconut_oil','🥥'], ['buttermilk','🥛'], ['kale','🥬'], ['arugula','🥬'],
        ['cabbage','🥬'], ['red_cabbage','🥬'], ['savoy_cabbage','🥬'], ['bok_choy','🥬'], ['chard','🥬'],
        ['mustard_greens','🥬'], ['garlic','🧄'], ['turmeric','❔'], ['cinnamon','❔'], ['nutmeg','❔'],
        ['cloves','❔'], ['black_pepper','🧂'], ['white_pepper','🧂'], ['paprika','🌶️'], ['cumin','🌶️'],
        ['oregano','🌿'], ['thyme','🌿'], ['rosemary','🌿'], ['basil','🌿'], ['cilantro','🌿'],
        ['dill','🌿'], ['sage','🌿'], ['tarragon','🌿'], ['bay_leaves','🍃'], ['mint','🌿'],
        ['jalapeno','🌶️'], ['shiitake_mushrooms','🍄'], ['portobello_mushrooms','🍄'], ['enoki_mushrooms','🍄'],
        ['tofu','❔'], ['tempeh','❔'], ['seitan','❔'], ['edamame','❔'], ['watercress','🥬'], ['bean_sprouts','❔'],
        ['soy_milk','🥛'], ['almond_milk','🥛'], ['coconut_milk','🥥'], ['oat_milk','🥛'], ['rice_milk','🥛'],
        ['feta_cheese','🧀'], ['parmesan','🧀'], ['mozzarella','🧀'], ['cheddar','🧀'], ['blue_cheese','🧀'],
        ['halloumi','🧀'], ['ricotta','🧀'], ['mascarpone','🧀'], ['greek_yoghurt','🥛'], ['kefir','🥛'],
        ['sour_cream','🥛'], ['chickpeas','❔'], ['lentils','❔'], ['kidney_beans','❔'], ['black_beans','❔'],
        ['pinto_beans','❔'], ['navy_beans','❔'], ['lima_beans','❔'], ['black-eyed_peas','❔'], ['canned_tomatoes','🍅'],
        ['tomato_sauce','🍅'], ['ketchup','🍅'], ['mayonnaise','❔'], ['mustard_sauce','❔'], ['bbq_sauce','❔'],
        ['honey','🍯'], ['maple_syrup','🍁'], ['molasses','❔'], ['agave_syrup','❔'], ['jam','🍓'],
        ['coffee','☕'], ['tea','🍵'], ['espresso','☕'], ['instant_coffee','☕'], ['cocoa_powder','🍫'],
        ['baking_powder','❔'], ['baking_soda','❔'], ['yeast','❔'], ['cornstarch','❔'], ['gelatin','❔'],
        ['sea_salt','🧂'], ['brown_sugar','🍬'], ['powdered_sugar','🍬'], ['breadcrumbs','❔'], ['prosciutto','🥓'],
        ['smoked_sausage','🌭'], ['salsa','🥣'], ['smoothie','🍹'], ['protein_powder','💪'], ['matcha_powder','🍵'],
        ['energy_drink','🥤'], ['sparkling_water','🥤'], ['mineral_water_sparkling','💧'], ['almond_butter','🥜'],
        ['sunflower_butter','🥜'], ['blueberry_jam','🍓'], ['fig_preserves','❔'], ['pepperoni','🌭'],
        ['truffle_oil','❔'], ['port','🍷'], ['sherry','🍷'], ['cider','🍺'], ['kombucha','🍹'],
    ])

    // ⑥ UPSERT продуктов
    for (const id of allProductIds) {
        await prisma.product.upsert({
            where:  { id },
            create: { id },
            update: {},
        })
    }

    // ⑦ Title Case утилита
    const toTitleCase = (s: string) =>
        s.split(/[_ ]+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')

    // ⑧ UPSERT переводов + emoji
    for (const productId of allProductIds) {
        const enName    = toTitleCase(productId)
        const ruName    = ruMap[productId] ?? enName
        const emojiChar = emojiMap.get(productId) ?? '❔'

        await prisma.productTranslation.upsert({
            where: { productId_language: { productId, language: 'en' } },
            create: { productId, language: 'en', name: enName,        emoji: emojiChar },
            update: { name: enName,        emoji: emojiChar },
        })
        await prisma.productTranslation.upsert({
            where: { productId_language: { productId, language: 'ru' } },
            create: { productId, language: 'ru', name: ruName,        emoji: emojiChar },
            update: { name: ruName,        emoji: emojiChar },
        })
    }
}
