// prisma/seeds/02-recipes.ts
import { PrismaClient } from '@prisma/client'

export async function runRecipes(prisma: PrismaClient) {
    // Первый блок: 25 логичных взаимосвязанных рецептов
    const recipes = [
        // 1-10: Salad recipes
        {
            translations: [
                { language: 'en', title: 'Tomato Salad', description: 'A refreshing tomato salad featuring ripe tomatoes, briny olives, zesty lemon juice, and fresh parsley.', steps: '1. Slice tomatoes and olives.\n2. Chop parsley.\n3. Whisk lemon juice with olive oil.\n4. Toss everything together and season with salt and pepper.' },
                { language: 'ru', title: 'Томатный салат', description: 'Освежающий томатный салат со спелыми томатами, пикантными оливками, ярким лимонным соком и свежей петрушкой.', steps: '1. Нарежьте томаты и оливки.\n2. Мелко порубите петрушку.\n3. Смешайте лимонный сок с оливковым маслом.\n4. Перемешайте всё и приправьте солью и перцем.' }
            ],
            ingredients: ['tomato', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Salad', description: 'A light chicken salad with tender grilled chicken, mixed olives, lemon dressing, and fresh parsley.', steps: '1. Grill chicken until golden and slice.\n2. Slice olives.\n3. Combine lemon juice with olive oil to make dressing.\n4. Toss chicken, olives, and parsley with dressing.' },
                { language: 'ru', title: 'Куриный салат', description: 'Лёгкий куриный салат с нежной курицей, оливками, лимонной заправкой и свежей петрушкой.', steps: '1. Обжарьте курицу до золотистой корочки и нарежьте.\n2. Нарежьте оливки.\n3. Смешайте лимонный сок с оливковым маслом для заправки.\n4. Перемешайте курицу, оливки и петрушку с заправкой.' }
            ],
            ingredients: ['chicken', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Salad', description: 'A creamy cheese salad combining cubed cheese, marinated olives, lemon zest, and chopped parsley.', steps: '1. Cube the cheese.\n2. Slice olives.\n3. Grate lemon zest.\n4. Mix cheese, olives, zest, and parsley.\n5. Drizzle olive oil and serve.' },
                { language: 'ru', title: 'Салат с сыром', description: 'Нежный сырный салат с кубиками сыра, маринованными оливками, цедрой лимона и рубленой петрушкой.', steps: '1. Нарежьте сыр кубиками.\n2. Нарежьте оливки.\n3. Натрите цедру лимона.\n4. Смешайте сыр, оливки, цедру и петрушку.\n5. Полейте оливковым маслом и подавайте.' }
            ],
            ingredients: ['cheese', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Salad', description: 'A hearty beef salad with thinly sliced roast beef, olives, fresh parsley, and a lemon vinaigrette.', steps: '1. Roast and thinly slice the beef.\n2. Slice olives.\n3. Whisk lemon juice with olive oil.\n4. Combine beef, olives, parsley, and vinaigrette.' },
                { language: 'ru', title: 'Говяжий салат', description: 'Сытный говяжий салат с тонко нарезанной ростбифом, оливками, свежей петрушкой и лимонным винегретом.', steps: '1. Запеките говядину и нарежьте тонкими ломтиками.\n2. Нарежьте оливки.\n3. Взбейте лимонный сок с оливковым маслом.\n4. Смешайте говядину, оливки и петрушку с винегретом.' }
            ],
            ingredients: ['beef', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Salad', description: 'A savory mushroom salad with sautéed mushrooms, olives, lemon juice, and parsley.', steps: '1. Sauté sliced mushrooms in olive oil.\n2. Slice olives.\n3. Mix lemon juice and olive oil.\n4. Combine mushrooms, olives, and parsley.' },
                { language: 'ru', title: 'Салат с грибами', description: 'Ароматный грибной салат с обжаренными грибами, оливками, лимонным соком и петрушкой.', steps: '1. Обжарьте нарезанные грибы в оливковом масле.\n2. Нарежьте оливки.\n3. Смешайте лимонный сок и оливковое масло.\n4. Смешайте грибы, оливки и петрушку.' }
            ],
            ingredients: ['mushroom', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Salad', description: 'A classic potato salad with boiled potatoes, olives, lemon-infused dressing, and parsley.', steps: '1. Boil and dice potatoes.\n2. Slice olives.\n3. Whisk lemon juice with olive oil.\n4. Mix potatoes, olives, and parsley.' },
                { language: 'ru', title: 'Картофельный салат', description: 'Классический картофельный салат с отварным картофелем, оливками, лимонной заправкой и петрушкой.', steps: '1. Отварите и нарежьте картофель.\n2. Нарежьте оливки.\n3. Взбейте лимонный сок с оливковым маслом.\n4. Смешайте картофель, оливки и петрушку.' }
            ],
            ingredients: ['potato', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Salad', description: 'A light shrimp salad with poached shrimp, olives, lemon zest, and parsley.', steps: '1. Poach shrimp until pink.\n2. Slice olives.\n3. Grate lemon zest.\n4. Toss shrimp, olives, zest, and parsley.' },
                { language: 'ru', title: 'Салат с креветками', description: 'Лёгкий салат с отварными креветками, оливками, цедрой лимона и петрушкой.', steps: '1. Отварите креветки до розового цвета.\n2. Нарежьте оливки.\n3. Натрите цедру лимона.\n4. Перемешайте креветки, оливки, цедру и петрушку.' }
            ],
            ingredients: ['shrimp', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Salad', description: 'A crunchy cauliflower salad with blanched cauliflower, olives, lemon juice, and parsley.', steps: '1. Blanch cauliflower florets.\n2. Slice olives.\n3. Mix lemon juice with olive oil.\n4. Combine cauliflower, olives, and parsley.' },
                { language: 'ru', title: 'Салат с цветной капустой', description: 'Хрустящий салат с бланшированной цветной капустой, оливками, лимонным соком и петрушкой.', steps: '1. Бланшируйте соцветия цветной капусты.\n2. Нарежьте оливки.\n3. Смешайте лимонный сок с оливковым маслом.\n4. Соедините капусту, оливки и петрушку.' }
            ],
            ingredients: ['cauliflower', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Salad', description: 'A fresh broccoli salad with lightly steamed broccoli, olives, lemon dressing, and parsley.', steps: '1. Steam broccoli until tender-crisp.\n2. Slice olives.\n3. Whisk lemon juice with olive oil.\n4. Mix broccoli, olives, and parsley.' },
                { language: 'ru', title: 'Салат с брокколи', description: 'Свежий салат с слегка приготовленной на пару брокколи, оливками, лимонной заправкой и петрушкой.', steps: '1. Приготовьте брокколи на пару до состояния al dente.\n2. Нарежьте оливки.\n3. Взбейте лимонный сок с оливковым маслом.\n4. Смешайте брокколи, оливки и петрушку.' }
            ],
            ingredients: ['broccoli', 'olive', 'lemon', 'parsley']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Salad', description: 'A vibrant spinach salad with fresh spinach leaves, olives, lemon vinaigrette, and parsley.', steps: '1. Wash spinach leaves.\n2. Slice olives.\n3. Combine lemon juice and olive oil.\n4. Toss spinach, olives, and parsley with vinaigrette.' },
                { language: 'ru', title: 'Салат со шпинатом', description: 'Яркий салат со свежими листьями шпината, оливками, лимонным винегретом и петрушкой.', steps: '1. Помойте листья шпината.\n2. Нарежьте оливки.\n3. Смешайте лимонный сок и оливковое масло.\n4. Перемешайте шпинат, оливки и петрушку с винегретом.' }
            ],
            ingredients: ['spinach', 'olive', 'lemon', 'parsley']
        },

        // 11-20: Soup recipes
        {
            translations: [
                { language: 'en', title: 'Tomato Soup', description: 'A comforting tomato soup made with roasted tomatoes, sautéed onions, carrots, and a splash of cream.', steps: '1. Roast tomatoes until charred.\n2. Sauté onions and carrots.\n3. Blend tomatoes with vegetables and simmer.\n4. Stir in cream and serve.' },
                { language: 'ru', title: 'Томатный суп', description: 'Уютный томатный суп из запечённых томатов, обжаренного лука, моркови и немного сливок.', steps: '1. Запеките томаты до лёгкой поджаристой корочки.\n2. Обжарьте лук и морковь.\n3. Измельчите томаты с овощами в блендере и потомите.\n4. Добавьте сливки и подавайте.' }
            ],
            ingredients: ['tomato', 'onion', 'carrot', 'cream']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Soup', description: 'A classic chicken soup with tender chicken pieces, onions, carrots, and creamy broth.', steps: '1. Boil chicken until tender.\n2. Sauté onions and carrots.\n3. Add chicken back with broth and simmer.\n4. Stir in cream before serving.' },
                { language: 'ru', title: 'Куриный суп', description: 'Классический куриный суп с нежными кусочками курицы, луком, морковью и сливочным бульоном.', steps: '1. Отварите курицу до мягкости.\n2. Обжарьте лук и морковь.\n3. Верните курицу в бульон и потомите.\n4. Вмешайте сливки перед подачей.' }
            ],
            ingredients: ['chicken', 'onion', 'carrot', 'cream']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Soup', description: 'A velvety cheese soup with melted cheese, sautéed onions, carrots, and a touch of cream.', steps: '1. Sauté onions and carrots.\n2. Add stock and bring to a boil.\n3. Stir in grated cheese until melted.\n4. Finish with cream.' },
                { language: 'ru', title: 'Сырный суп', description: 'Нежный сырный суп с расплавленным сыром, обжаренным луком, морковью и сливками.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте бульон и доведите до кипения.\n3. Вмешайте натёртый сыр до полного расплавления.\n4. Влейте сливки.' }
            ],
            ingredients: ['cheese', 'onion', 'carrot', 'cream']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Soup', description: 'A rich beef soup with stewed beef chunks, onions, carrots, and creamy finish.', steps: '1. Brown beef chunks.\n2. Sauté onions and carrots.\n3. Add beef back with broth and simmer until tender.\n4. Stir in cream.' },
                { language: 'ru', title: 'Говяжий суп', description: 'Насыщенный говяжий суп с тушёными кусочками говядины, луком, морковью и сливочным акцентом.', steps: '1. Обжарьте кусочки говядины.\n2. Обжарьте лук и морковь.\n3. Добавьте бульон и тушите до мягкости.\n4. Вмешайте сливки.' }
            ],
            ingredients: ['beef', 'onion', 'carrot', 'cream']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Soup', description: 'A creamy mushroom soup with sautéed mushrooms, onions, carrots, and a swirl of cream.', steps: '1. Sauté mushrooms until golden.\n2. Add onions and carrots, cook until soft.\n3. Pour in stock and simmer.\n4. Blend and finish with cream.' },
                { language: 'ru', title: 'Грибной суп', description: 'Сливочный грибной суп с обжаренными грибами, луком, морковью и сливочным акцентом.', steps: '1. Обжарьте грибы до золотистого цвета.\n2. Добавьте лук и морковь, готовьте до мягкости.\n3. Влейте бульон и потомите.\n4. Измельчите блендером и добавьте сливки.' }
            ],
            ingredients: ['mushroom', 'onion', 'carrot', 'cream']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Soup', description: 'A smooth potato soup with diced potatoes, onions, carrots, and creamy broth.', steps: '1. Sauté onions and carrots.\n2. Add diced potatoes and stock.\n3. Simmer until potatoes are soft.\n4. Blend and stir in cream.' },
                { language: 'ru', title: 'Картофельный суп', description: 'Пюреобразный картофельный суп с нарезанным картофелем, луком, морковью и сливочным бульоном.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте картофель и бульон.\n3. Варите до мягкости картофеля.\n4. Измельчите блендером и добавьте сливки.' }
            ],
            ingredients: ['potato', 'onion', 'carrot', 'cream']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Soup', description: 'A delicate shrimp soup with poached shrimp, sautéed onions, carrots, and a hint of cream.', steps: '1. Sauté onions and carrots.\n2. Add stock and bring to simmer.\n3. Poach shrimp in broth.\n4. Stir in cream.' },
                { language: 'ru', title: 'Креветочный суп', description: 'Нежный креветочный суп с отварными креветками, луком, морковью и небольшим количеством сливок.', steps: '1. Обжарьте лук и морковь.\n2. Влейте бульон и доведите до кипения.\n3. Отварите креветки в бульоне.\n4. Добавьте сливки.' }
            ],
            ingredients: ['shrimp', 'onion', 'carrot', 'cream']
        },

        // 21-25: Casserole recipes
        {
            translations: [
                { language: 'en', title: 'Tomato Casserole', description: 'A cheesy tomato casserole layered with sliced tomatoes, cream, and melted bread crumbs.', steps: '1. Layer tomatoes in baking dish.\n2. Pour cream over tomatoes.\n3. Sprinkle grated cheese and breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Томатная запеканка', description: 'Сырная томатная запеканка со слоями томатов, сливок и золотистой хлебной крошки.', steps: '1. Выложите томаты в форму для запекания.\n2. Залейте сливками.\n3. Посыпьте тёртым сыром и хлебными крошками.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['tomato', 'cheese', 'cream', 'bread']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Casserole', description: 'A creamy chicken casserole with tender chicken pieces, cream sauce, melted cheese, and bread topping.', steps: '1. Cook chicken and dice.\n2. Mix chicken with cream and cheese.\n3. Transfer to baking dish.\n4. Top with breadcrumbs and bake.' },
                { language: 'ru', title: 'Куриная запеканка', description: 'Сливочная куриная запеканка с нежными кусочками курицы, сырным соусом и золотистой хлебной корочкой.', steps: '1. Отварите курицу и нарежьте.\n2. Смешайте курицу со сливками и сыром.\n3. Выложите в форму для запекания.\n4. Посыпьте хлебными крошками и запекайте.' }
            ],
            ingredients: ['chicken', 'cheese', 'cream', 'bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Casserole', description: 'A rich cheese casserole made with layers of cheese, cream, and crunchy breadcrumbs.', steps: '1. Layer cheese and cream in dish.\n2. Repeat layers.\n3. Top with breadcrumbs.\n4. Bake until cheese is bubbly.' },
                { language: 'ru', title: 'Сырная запеканка', description: 'Насыщенная сырная запеканка со слоями сыра, сливок и хрустящей хлебной крошки.', steps: '1. Выложите слоями сыр и сливки в форму.\n2. Повторите слои.\n3. Посыпьте хлебными крошками.\n4. Запекайте до пузырения сыра.' }
            ],
            ingredients: ['cheese', 'cheese', 'cream', 'bread']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Casserole', description: 'A hearty beef casserole with chunks of beef, cream, melted cheese, and a breadcrumb crust.', steps: '1. Brown beef cubes.\n2. Mix beef with cream and cheese.\n3. Transfer to dish and top with breadcrumbs.\n4. Bake until crust is golden.' },
                { language: 'ru', title: 'Говяжья запеканка', description: 'Сытная говяжья запеканка с кусочками говядины, сливками, сырами и золотистой хлебной корочкой.', steps: '1. Обжарьте кусочки говядины.\n2. Смешайте с сливками и сыром.\n3. Выложите в форму и посыпьте хлебными крошками.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['beef', 'cheese', 'cream', 'bread']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Casserole', description: 'A creamy mushroom casserole with sautéed mushrooms, cheese, cream, and bread topping.', steps: '1. Sauté mushrooms until soft.\n2. Mix with cream and cheese.\n3. Place in baking dish.\n4. Top with breadcrumbs and bake.' },
                { language: 'ru', title: 'Грибная запеканка', description: 'Сливочная грибная запеканка с обжаренными грибами, сыром, сливками и хлебной крошкой.', steps: '1. Обжарьте грибы до мягкости.\n2. Смешайте с сливками и сыром.\n3. Выложите в форму.\n4. Посыпьте крошками хлеба и запекайте.' }
            ],
            ingredients: ['mushroom', 'cheese', 'cream', 'bread']
        },
        {
            translations: [
                { language: 'en', title: 'Tomato Stew', description: 'A hearty tomato stew with onions, carrots, and potatoes simmered until tender.', steps: '1. Sauté onions and carrots in oil.\n2. Add potatoes and tomatoes.\n3. Pour in broth and simmer until vegetables are soft.\n4. Season with salt and pepper.' },
                { language: 'ru', title: 'Томатное рагу', description: 'Сытное томатное рагу с луком, морковью и картофелем, тушённое до мягкости.', steps: '1. Обжарьте лук и морковь в масле.\n2. Добавьте картофель и томаты.\n3. Влейте бульон и тушите до готовности овощей.\n4. Приправьте солью и перцем.' }
            ],
            ingredients: ['tomato','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Stew', description: 'A comforting chicken stew with tender chicken, onions, carrots, and potatoes in a savory broth.', steps: '1. Brown chicken pieces in oil.\n2. Sauté onions and carrots.\n3. Add potatoes and chicken back with broth.\n4. Simmer until everything is tender.' },
                { language: 'ru', title: 'Куриное рагу', description: 'Уютное куриное рагу с нежными кусочками курицы, луком, морковью и картофелем в ароматном бульоне.', steps: '1. Обжарьте кусочки курицы в масле.\n2. Добавьте лук и морковь, обжарьте до мягкости.\n3. Положите картофель и верните курицу в бульон.\n4. Тушите до готовности.' }
            ],
            ingredients: ['chicken','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Stew', description: 'A creamy cheese stew featuring melted cheese, onions, carrots, and potatoes.', steps: '1. Sauté onions and carrots until soft.\n2. Add potatoes and broth.\n3. Stir in cheese until melted.\n4. Simmer briefly and serve.' },
                { language: 'ru', title: 'Сырное рагу', description: 'Сливочное сырное рагу с расплавленным сыром, луком, морковью и картофелем.', steps: '1. Обжарьте лук и морковь до мягкости.\n2. Добавьте картофель и бульон.\n3. Вмешайте сыр до расплавления.\n4. Немного потушите и подавайте.' }
            ],
            ingredients: ['cheese','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Stew', description: 'A rich beef stew with tender beef, onions, carrots, and potatoes slowly cooked in broth.', steps: '1. Brown beef chunks in oil.\n2. Sauté onions and carrots.\n3. Add potatoes and beef back with broth.\n4. Slow cook until meat is tender.' },
                { language: 'ru', title: 'Говяжье рагу', description: 'Насыщенное говяжье рагу с нежными кусочками говядины, луком, морковью и картофелем, медленно приготовленное в бульоне.', steps: '1. Обжарьте куски говядины в масле.\n2. Обжарьте лук и морковь.\n3. Добавьте картофель и верните мясо в бульон.\n4. Тушите до мягкости.' }
            ],
            ingredients: ['beef','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Stew', description: 'A savory mushroom stew with earthy mushrooms, onions, carrots, and potatoes.', steps: '1. Sauté mushrooms until golden.\n2. Add onions and carrots, cook until soft.\n3. Add potatoes and broth, simmer until tender.\n4. Season to taste.' },
                { language: 'ru', title: 'Грибное рагу', description: 'Ароматное грибное рагу с грибами, луком, морковью и картофелем.', steps: '1. Обжарьте грибы до золотистого цвета.\n2. Добавьте лук и морковь, готовьте до мягкости.\n3. Положите картофель и залейте бульоном, тушите до мягкости.\n4. Приправьте по вкусу.' }
            ],
            ingredients: ['mushroom','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Stew', description: 'A simple potato stew with potatoes, onions, carrots, and a hint of seasoning.', steps: '1. Sauté onions and carrots.\n2. Add potatoes and broth.\n3. Simmer until potatoes are tender.\n4. Season with salt and pepper.' },
                { language: 'ru', title: 'Картофельное рагу', description: 'Простое картофельное рагу с картофелем, луком, морковью и специями.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте картофель и бульон.\n3. Тушите до готовности картофеля.\n4. Приправьте солью и перцем.' }
            ],
            ingredients: ['potato','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Stew', description: 'A delicate shrimp stew with tender shrimp, onions, carrots, and potatoes.', steps: '1. Sauté onions and carrots.\n2. Add potatoes and broth, simmer.\n3. Add shrimp and cook until pink.\n4. Season and serve.' },
                { language: 'ru', title: 'Креветочное рагу', description: 'Нежное креветочное рагу с креветками, луком, морковью и картофелем.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте картофель и бульон, тушите.\n3. Добавьте креветки и готовьте до розового цвета.\n4. Приправьте и подавайте.' }
            ],
            ingredients: ['shrimp','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Stew', description: 'A healthy cauliflower stew with cauliflower, onions, carrots, and potatoes.', steps: '1. Sauté onions and carrots.\n2. Add potatoes and cauliflower.\n3. Pour in broth and simmer until tender.\n4. Season to taste.' },
                { language: 'ru', title: 'Рагу с цветной капустой', description: 'Полезное рагу с цветной капустой, луком, морковью и картофелем.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте картофель и цветную капусту.\n3. Влейте бульон и тушите до мягкости.\n4. Приправьте по вкусу.' }
            ],
            ingredients: ['cauliflower','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Stew', description: 'A nutritious broccoli stew with broccoli, onions, carrots, and potatoes.', steps: '1. Sauté onions and carrots.\n2. Add potatoes and broccoli.\n3. Simmer in broth until vegetables are tender.\n4. Season and serve.' },
                { language: 'ru', title: 'Рагу с брокколи', description: 'Питательное рагу с брокколи, луком, морковью и картофелем.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте картофель и брокколи.\n3. Тушите в бульоне до мягкости овощей.\n4. Приправьте и подавайте.' }
            ],
            ingredients: ['broccoli','onion','carrot','potato']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Stew', description: 'A flavorful spinach stew with spinach, onions, carrots, and potatoes.', steps: '1. Sauté onions and carrots.\n2. Add potatoes and broth.\n3. Stir in spinach until wilted.\n4. Season and serve.' },
                { language: 'ru', title: 'Рагу со шпинатом', description: 'Вкусное рагу со шпинатом, луком, морковью и картофелем.', steps: '1. Обжарьте лук и морковь.\n2. Добавьте картофель и бульон.\n3. Вмешайте шпинат до увядания.\n4. Приправьте и подавайте.' }
            ],
            ingredients: ['spinach','onion','carrot','potato']
        },

        // Stir Fry recipes (10)
        {
            translations: [
                { language: 'en', title: 'Tomato Stir Fry', description: 'A quick stir fry with tomatoes, carrots, ginger, and peas.', steps: '1. Heat oil in a wok.\n2. Add tomatoes and cook briefly.\n3. Add carrots, ginger, and peas, stir-fry until tender-crisp.\n4. Season with salt and pepper.' },
                { language: 'ru', title: 'Жаркое с томатом', description: 'Быстрое жаркое с томатами, морковью, имбирём и горошком.', steps: '1. Разогрейте масло в воке.\n2. Добавьте томаты и слегка обжарьте.\n3. Положите морковь, имбирь и горошек, жарьте до состояния al dente.\n4. Приправьте солью и перцем.' }
            ],
            ingredients: ['tomato','carrots','ginger','peas']
        },
        // ... (9 more stir fry objects) ...

        // Pasta recipes (5)
        {
            translations: [
                { language: 'en', title: 'Tomato Pasta', description: 'Comforting pasta made from homemade dough, tomato paste, and melted cheese.', steps: '1. Mix flour with water to form dough.\n2. Roll and cut pasta shapes.\n3. Cook pasta until al dente.\n4. Toss with tomato paste and cheese.' },
                { language: 'ru', title: 'Томатная паста', description: 'Уютная паста из домашнего теста, томатной пасты и расплавленного сыра.', steps: '1. Смешайте муку с водой до получения теста.\n2. Раскатайте и нарежьте пасту.\n3. Отварите пасту al dente.\n4. Перемешайте с томатной пастой и сыром.' }
            ],
            ingredients: ['flour','tomato_paste','cheese']
        },
        // ——— Wrap recipes (10) ———
        {
            translations: [
                { language: 'en', title: 'Tomato Wrap', description: 'A fresh tomato wrap with crisp tomato slices, tangy sauce, and fresh lettuce wrapped in a soft flatbread.', steps: '1. Spread sauce on flatbread.\n2. Layer tomato slices and lettuce.\n3. Roll up tightly.\n4. Slice and serve.' },
                { language: 'ru', title: 'Ролл с томатом', description: 'Свежий ролл с ломтиками томатов, пикантным соусом и хрустящими листьями салата в мягкой лепёшке.', steps: '1. Нанесите соус на лепёшку.\n2. Выложите ломтики томатов и листья салата.\n3. Плотно сверните.\n4. Порежьте и подавайте.' }
            ],
            ingredients: ['tomato','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Wrap', description: 'A hearty chicken wrap with seasoned chicken strips, tangy sauce, and fresh lettuce in a soft tortilla.', steps: '1. Cook and slice chicken.\n2. Spread sauce on tortilla.\n3. Layer chicken and lettuce.\n4. Roll and serve.' },
                { language: 'ru', title: 'Ролл с курицей', description: 'Сытный ролл с приправленными полосками курицы, пикантным соусом и свежими листьями салата в мягкой лепёшке.', steps: '1. Приготовьте и нарежьте курицу.\n2. Нанесите соус на лепёшку.\n3. Выложите курицу и салат.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['chicken','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Wrap', description: 'A cheesy wrap with melted cheese, tangy sauce, and crisp lettuce in a warm tortilla.', steps: '1. Spread sauce on tortilla.\n2. Add cheese slices and lettuce.\n3. Warm in a pan if you like cheese melty.\n4. Roll and serve.' },
                { language: 'ru', title: 'Ролл с сыром', description: 'Сырный ролл с расплавленным сыром, пикантным соусом и хрустящими листьями салата в тёплой лепёшке.', steps: '1. Нанесите соус на лепёшку.\n2. Выложите сыр и салат.\n3. При желании подогрейте в сковороде.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['cheese','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Wrap', description: 'A savory beef wrap with thinly sliced roast beef, creamy sauce, and fresh lettuce.', steps: '1. Slice roast beef thin.\n2. Spread sauce on flatbread.\n3. Layer beef and lettuce.\n4. Roll tightly and slice.' },
                { language: 'ru', title: 'Ролл с говядиной', description: 'Ароматный ролл с тонко нарезанным ростбифом, нежным соусом и свежей зеленью.', steps: '1. Нарежьте ростбиф тонкими ломтиками.\n2. Нанесите соус на лепёшку.\n3. Выложите мясо и листья салата.\n4. Сверните и разрежьте.' }
            ],
            ingredients: ['beef','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Wrap', description: 'A flavorful mushroom wrap with sautéed mushrooms, tangy sauce, and crisp lettuce.', steps: '1. Sauté mushrooms until tender.\n2. Spread sauce on tortilla.\n3. Add mushrooms and lettuce.\n4. Roll and serve.' },
                { language: 'ru', title: 'Ролл с грибами', description: 'Вкусный ролл с обжаренными грибами, пикантным соусом и хрустящими листьями салата.', steps: '1. Обжарьте грибы до мягкости.\n2. Нанесите соус на лепёшку.\n3. Выложите грибы и салат.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['mushroom','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Wrap', description: 'A comforting potato wrap with seasoned mashed potatoes, tangy sauce, and lettuce.', steps: '1. Mash boiled potatoes with seasoning.\n2. Spread sauce on flatbread.\n3. Add potato mash and lettuce.\n4. Roll and enjoy.' },
                { language: 'ru', title: 'Ролл с картофелем', description: 'Уютный ролл с приправленным картофельным пюре, пикантным соусом и листьями салата.', steps: '1. Разомните отварной картофель с приправами.\n2. Нанесите соус на лепёшку.\n3. Выложите пюре и листья салата.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['potato','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Wrap', description: 'A light shrimp wrap with poached shrimp, tangy sauce, and crisp lettuce.', steps: '1. Poach shrimp until pink.\n2. Spread sauce on tortilla.\n3. Layer shrimp and lettuce.\n4. Roll and serve.' },
                { language: 'ru', title: 'Ролл с креветками', description: 'Лёгкий ролл с отварными креветками, пикантным соусом и хрустящими листьями салата.', steps: '1. Отварите креветки до розового цвета.\n2. Нанесите соус на лепёшку.\n3. Выложите креветки и салат.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['shrimp','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Wrap', description: 'A vegetarian cauliflower wrap with roasted cauliflower, tangy sauce, and fresh lettuce.', steps: '1. Roast cauliflower florets until golden.\n2. Spread sauce on flatbread.\n3. Layer cauliflower and lettuce.\n4. Roll and enjoy warm.' },
                { language: 'ru', title: 'Ролл с цветной капустой', description: 'Вегетарианский ролл с запечённой цветной капустой, пикантным соусом и свежей зеленью.', steps: '1. Запеките соцветия капусты до золотистого цвета.\n2. Нанесите соус на лепёшку.\n3. Выложите капусту и листья салата.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['cauliflower','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Wrap', description: 'A nutritious broccoli wrap with steamed broccoli, tangy sauce, and crisp lettuce.', steps: '1. Steam broccoli until tender-crisp.\n2. Spread sauce on tortilla.\n3. Add broccoli and lettuce.\n4. Roll and serve.' },
                { language: 'ru', title: 'Ролл с брокколи', description: 'Полезный ролл с приготовленной на пару брокколи, пикантным соусом и свежими листьями салата.', steps: '1. Приготовьте брокколи на пару до состояния al dente.\n2. Нанесите соус на лепёшку.\n3. Выложите брокколи и салат.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['broccoli','bread','sauce','lettuce']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Wrap', description: 'A leafy spinach wrap with fresh spinach, tangy sauce, and crisp lettuce.', steps: '1. Wash spinach leaves.\n2. Spread sauce on flatbread.\n3. Layer spinach and lettuce.\n4. Roll and enjoy.' },
                { language: 'ru', title: 'Ролл со шпинатом', description: 'Лёгкий ролл со свежим шпинатом, пикантным соусом и хрустящими листьями салата.', steps: '1. Вымойте листья шпината.\n2. Нанесите соус на лепёшку.\n3. Выложите шпинат и салат.\n4. Сверните и подавайте.' }
            ],
            ingredients: ['spinach','bread','sauce','lettuce']
        },

// ——— Gratin recipes (5) ———
        {
            translations: [
                { language: 'en', title: 'Tomato Gratin', description: 'A cheesy tomato gratin with sliced tomatoes, cream, and a crispy breadcrumb topping.', steps: '1. Layer tomato slices in baking dish.\n2. Pour cream over tomatoes.\n3. Sprinkle cheese and breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с томатом', description: 'Сырный гратен с ломтиками томатов, сливками и хрустящей корочкой из панировочных сухарей.', steps: '1. Выложите ломтики томатов в форму.\n2. Залейте сливками.\n3. Посыпьте сыром и сухарями.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['tomato','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Gratin', description: 'A creamy chicken gratin with tender chicken, melted cheese, and buttery breadcrumbs.', steps: '1. Layer cooked chicken pieces in dish.\n2. Pour cream and sprinkle cheese.\n3. Top with breadcrumbs.\n4. Bake until bubbly.' },
                { language: 'ru', title: 'Гратен с курицей', description: 'Сливочный гратен с кусочками курицы, расплавленным сыром и масляной корочкой из сухарей.', steps: '1. Выложите кусочки варёной курицы в форму.\n2. Залейте сливками и посыпьте сыром.\n3. Добавьте сухари.\n4. Запекайте до пузырения.' }
            ],
            ingredients: ['chicken','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Gratin', description: 'A rich cheese gratin with layers of melted cheese, cream, and golden breadcrumbs.', steps: '1. Layer cheese in baking dish.\n2. Pour cream over.\n3. Top with breadcrumbs.\n4. Bake until golden and bubbly.' },
                { language: 'ru', title: 'Сырный гратен', description: 'Насыщенный гратен со слоями расплавленного сыра, сливок и золотистой панировки.', steps: '1. Выложите сыр слоями в форму.\n2. Залейте сливками.\n3. Посыпьте сухарями.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['cheese','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Gratin', description: 'A hearty beef gratin with tender beef chunks, melted cheese, and crispy breadcrumbs.', steps: '1. Layer browned beef in dish.\n2. Pour cream and sprinkle cheese.\n3. Top with breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с говядиной', description: 'Сытный гратен с кусочками говядины, расплавленным сыром и хрустящей панировкой.', steps: '1. Выложите обжаренную говядину в форму.\n2. Залейте сливками и посыпьте сыром.\n3. Добавьте сухари.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['beef','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Gratin', description: 'A savory mushroom gratin with sautéed mushrooms, melted cheese, and buttery breadcrumbs.', steps: '1. Sauté mushrooms until soft.\n2. Layer in dish, pour cream and cheese.\n3. Top with breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с грибами', description: 'Ароматный гратен с обжаренными грибами, расплавленным сыром и хрустящей панировкой.', steps: '1. Обжарьте грибы до мягкости.\n2. Выложите в форму, залейте сливками и посыпьте сыром.\n3. Добавьте сухари.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['mushroom','cheese','cream','bread']
        },
// ——— Fourth block: 25 recipes ———

// Pizza recipes (10)
        {
            translations: [
                { language: 'en', title: 'Tomato Pizza', description: 'A crispy pizza topped with tomato sauce, flour-dough crust and melted cheese.', steps: '1. Prepare dough with flour. 2. Spread tomato_paste. 3. Sprinkle cheese. 4. Bake until golden.' },
                { language: 'ru', title: 'Пицца с томатом', description: 'Хрустящая пицца на тесте из муки, с томатной пастой и расплавленным сыром.', steps: '1. Приготовить тесто из муки. 2. Намазать томатную пасту. 3. Посыпать сыром. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['tomato','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Pizza', description: 'A savory pizza topped with tender chicken, tomato paste and cheese.', steps: '1. Roll out dough. 2. Spread tomato_paste. 3. Top with cooked chicken and cheese. 4. Bake until crust is crisp.' },
                { language: 'ru', title: 'Пицца с курицей', description: 'Сытная пицца с нежной курицей, томатной пастой и сыром.', steps: '1. Раскатать тесто. 2. Намазать пасту. 3. Выложить курицу и сыр. 4. Запечь до хрустящей корочки.' }
            ],
            ingredients: ['chicken','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Pizza', description: 'A classic cheese pizza on a flour crust with rich tomato paste.', steps: '1. Prepare and roll dough. 2. Spread tomato_paste. 3. Generously top with cheese. 4. Bake until bubbly.' },
                { language: 'ru', title: 'Сырная пицца', description: 'Классическая сырная пицца на основе муки и томатной пасты.', steps: '1. Приготовить и раскатать тесто. 2. Нанести пасту. 3. Щедро посыпать сыром. 4. Запечь до пузырения.' }
            ],
            ingredients: ['cheese','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Pizza', description: 'A hearty pizza with roast beef strips, tomato paste and melted cheese.', steps: '1. Roll out dough. 2. Spread tomato_paste. 3. Add beef and cheese. 4. Bake until ready.' },
                { language: 'ru', title: 'Пицца с говядиной', description: 'Сытная пицца с ростбифом, томатной пастой и плавленым сыром.', steps: '1. Раскатать тесто. 2. Намазать пасту. 3. Выложить говядину и сыр. 4. Запечь до готовности.' }
            ],
            ingredients: ['beef','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Pizza', description: 'A fragrant pizza with sautéed mushrooms, tomato paste and cheese.', steps: '1. Roll dough. 2. Spread tomato_paste. 3. Top with mushrooms and cheese. 4. Bake until golden.' },
                { language: 'ru', title: 'Пицца с грибами', description: 'Ароматная пицца с обжаренными грибами, томатной пастой и сыром.', steps: '1. Раскатать тесто. 2. Нанести пасту. 3. Выложить грибы и сыр. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['mushroom','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Pizza', description: 'A unique pizza with sliced potatoes, tomato paste and a cheesy crust.', steps: '1. Roll dough. 2. Spread tomato_paste. 3. Layer potatoes and cheese. 4. Bake until crispy.' },
                { language: 'ru', title: 'Пицца с картофелем', description: 'Необычная пицца с ломтиками картофеля, томатной пастой и сырной корочкой.', steps: '1. Раскатать тесто. 2. Намазать пасту. 3. Выложить картофель и сыр. 4. Запечь до хрустящей корочки.' }
            ],
            ingredients: ['potato','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Pizza', description: 'A light pizza topped with shrimp, tomato paste and melted cheese.', steps: '1. Prepare dough. 2. Spread tomato_paste. 3. Top with shrimp and cheese. 4. Bake briefly.' },
                { language: 'ru', title: 'Пицца с креветками', description: 'Лёгкая пицца с креветками, томатной пастой и расплавленным сыром.', steps: '1. Приготовить тесто. 2. Нанести пасту. 3. Выложить креветки и сыр. 4. Запечь немного.' }
            ],
            ingredients: ['shrimp','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Pizza', description: 'A gluten-friendly pizza with cauliflower base, tomato paste and cheese.', steps: '1. Make crust from cauliflower. 2. Spread tomato_paste. 3. Add cheese. 4. Bake until set.' },
                { language: 'ru', title: 'Пицца с цветной капустой', description: 'Пицца на основе цветной капусты, с томатной пастой и сыром.', steps: '1. Приготовить корж из капусты. 2. Нанести пасту. 3. Посыпать сыром. 4. Запечь до готовности.' }
            ],
            ingredients: ['cauliflower','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Pizza', description: 'A nutritious pizza with broccoli florets, tomato paste and cheese.', steps: '1. Roll dough. 2. Spread tomato_paste. 3. Top with broccoli and cheese. 4. Bake until golden.' },
                { language: 'ru', title: 'Пицца с брокколи', description: 'Питательная пицца с брокколи, томатной пастой и сыром.', steps: '1. Раскатать тесто. 2. Нанести пасту. 3. Выложить брокколи и сыр. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['broccoli','flour','tomato_paste','cheese']
        },

// Casserole recipes (remaining 5)
        {
            translations: [
                { language: 'en', title: 'Potato Casserole', description: 'A creamy potato casserole with cheese, cream and bread crumbs.', steps: '1. Layer potatoes. 2. Pour cream. 3. Sprinkle cheese and crumbs. 4. Bake until golden.' },
                { language: 'ru', title: 'Картофельная запеканка', description: 'Сливочная запеканка с картофелем, сыром и хлебными крошками.', steps: '1. Выложить картофель. 2. Залить сливками. 3. Посыпать сыром и крошками. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['potato','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Casserole', description: 'A rich shrimp casserole with cream, cheese and crunchy topping.', steps: '1. Mix shrimp with cream and cheese. 2. Transfer to dish. 3. Top with breadcrumbs. 4. Bake until bubbly.' },
                { language: 'ru', title: 'Креветочная запеканка', description: 'Насыщенная запеканка с креветками, сливками, сыром и хрустящей корочкой.', steps: '1. Смешать креветки со сливками и сыром. 2. Выложить в форму. 3. Посыпать сухарями. 4. Запечь до пузырения.' }
            ],
            ingredients: ['shrimp','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Casserole', description: 'A healthy cauliflower casserole with melted cheese and cream.', steps: '1. Layer cauliflower. 2. Pour cream. 3. Sprinkle cheese. 4. Bake until golden.' },
                { language: 'ru', title: 'Запеканка с цветной капустой', description: 'Полезная запеканка с цветной капустой, сыром и сливками.', steps: '1. Выложить капусту. 2. Залить сливками. 3. Посыпать сыром. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['cauliflower','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Casserole', description: 'A nutritious broccoli casserole with cheese, cream and bread topping.', steps: '1. Layer broccoli florets. 2. Cover with cream. 3. Sprinkle cheese. 4. Bake until bubbly.' },
                { language: 'ru', title: 'Запеканка с брокколи', description: 'Питательная запеканка с брокколи, сыром и сливками.', steps: '1. Выложить брокколи. 2. Залить сливками. 3. Посыпать сыром. 4. Запечь до пузырения.' }
            ],
            ingredients: ['broccoli','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Casserole', description: 'A creamy spinach casserole with melted cheese and bread crumbs.', steps: '1. Layer spinach. 2. Add cream. 3. Sprinkle cheese and crumbs. 4. Bake until golden.' },
                { language: 'ru', title: 'Запеканка со шпинатом', description: 'Сливочная запеканка со шпинатом, сыром и крошками хлеба.', steps: '1. Выложить шпинат. 2. Добавить сливки. 3. Посыпать сыром и крошками. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['spinach','cheese','cream','bread']
        },

// Pasta recipes (remaining 5)
        {
            translations: [
                { language: 'en', title: 'Potato Pasta', description: 'Homemade pasta tossed with tomato paste, cheese and diced potatoes.', steps: '1. Make pasta dough. 2. Cook pasta and potatoes. 3. Toss with tomato_paste and cheese. 4. Serve warm.' },
                { language: 'ru', title: 'Паста с картофелем', description: 'Домашняя паста с томатной пастой, сыром и картофелем.', steps: '1. Приготовить тесто. 2. Отварить пасту и картофель. 3. Перемешать с томатной пастой и сыром. 4. Подавать горячей.' }
            ],
            ingredients: ['potato','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Pasta', description: 'Fresh pasta with shrimp, tomato paste and melted cheese.', steps: '1. Cook pasta. 2. Sauté shrimp. 3. Combine with tomato_paste and cheese. 4. Serve immediately.' },
                { language: 'ru', title: 'Паста с креветками', description: 'Свежая паста с креветками, томатной пастой и сыром.', steps: '1. Отварить пасту. 2. Обжарить креветки. 3. Смешать с пастой, пастой и сыром. 4. Подавать сразу.' }
            ],
            ingredients: ['shrimp','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Pasta', description: 'Pasta with roasted cauliflower, tomato paste and cheese.', steps: '1. Roast cauliflower. 2. Cook pasta. 3. Mix with tomato_paste and cheese. 4. Serve hot.' },
                { language: 'ru', title: 'Паста с цветной капустой', description: 'Паста с запечённой цветной капустой, томатной пастой и сыром.', steps: '1. Запечь капусту. 2. Отварить пасту. 3. Смешать с пастой и сыром. 4. Подавайте горячей.' }
            ],
            ingredients: ['cauliflower','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Pasta', description: 'Pasta with steamed broccoli, tomato paste and melted cheese.', steps: '1. Steam broccoli. 2. Cook pasta. 3. Toss with tomato_paste and cheese. 4. Serve warm.' },
                { language: 'ru', title: 'Паста с брокколи', description: 'Паста с приготовленной на пару брокколи, томатной пастой и сыром.', steps: '1. Приготовить брокколи на пару. 2. Отварить пасту. 3. Перемешать с пастой и сыром. 4. Подавайте теплой.' }
            ],
            ingredients: ['broccoli','flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Pasta', description: 'Pasta with wilted spinach, tomato paste and cheese.', steps: '1. Wilt spinach in pan. 2. Cook pasta. 3. Mix with tomato_paste and cheese. 4. Serve hot.' },
                { language: 'ru', title: 'Паста со шпинатом', description: 'Паста с тушёным шпинатом, томатной пастой и сыром.', steps: '1. Тушить шпинат. 2. Отварить пасту. 3. Смешать с пастой и сыром. 4. Подавайте горячей.' }
            ],
            ingredients: ['spinach','flour','tomato_paste','cheese']
        },

// Gratin recipes (remaining 5)
        {
            translations: [
                { language: 'en', title: 'Potato Gratin', description: 'Layered potato gratin with cheese, cream and crisp bread crumbs.', steps: '1. Slice potatoes. 2. Layer in dish, pour cream. 3. Sprinkle cheese & crumbs. 4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с картофелем', description: 'Слоёный гратен с картофелем, сыром, сливками и хлебными крошками.', steps: '1. Нарезать картофель. 2. Выложить слоями, залить сливками. 3. Посыпать сыром и крошками. 4. Запечь до золотистой корочки.' }
            ],
            ingredients: ['potato','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Gratin', description: 'Creamy shrimp gratin with melted cheese and breadcrumbs.', steps: '1. Layer shrimp. 2. Add cream & cheese. 3. Top with crumbs. 4. Bake until bubbly.' },
                { language: 'ru', title: 'Гратен с креветками', description: 'Сливочный гратен с креветками, сыром и панировкой.', steps: '1. Выложить креветки. 2. Залить сливками и посыпать сыром. 3. Посыпать сухарями. 4. Запечь до пузырения.' }
            ],
            ingredients: ['shrimp','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Gratin', description: 'Cheesy cauliflower gratin with cream and crisp topping.', steps: '1. Blanch cauliflower. 2. Layer in dish, add cream & cheese. 3. Top with crumbs. 4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с цветной капустой', description: 'Сырный гратен с цветной капустой, сливками и хрустящей корочкой.', steps: '1. Бланшировать капусту. 2. Выложить в форму, добавить сливки и сыр. 3. Посыпать сухарями. 4. Запечь до золотистого цвета.' }
            ],
            ingredients: ['cauliflower','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Gratin', description: 'A rich broccoli gratin with melted cheese, cream and breadcrumbs.', steps: '1. Blanch broccoli. 2. Layer in dish, add cream & cheese. 3. Top with crumbs. 4. Bake until bubbly.' },
                { language: 'ru', title: 'Гратен с брокколи', description: 'Насыщенный гратен с брокколи, сыром, сливками и панировкой.', steps: '1. Бланшировать брокколи. 2. Выложить в форму, добавить сливки и сыр. 3. Посыпать сухарями. 4. Запечь до пузырения.' }
            ],
            ingredients: ['broccoli','cheese','cream','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Gratin', description: 'Creamy spinach gratin with cheese and golden breadcrumbs.', steps: '1. Wilt spinach. 2. Layer in dish, pour cream & cheese. 3. Top with crumbs. 4. Bake until golden.' },
                { language: 'ru', title: 'Гратен со шпинатом', description: 'Сливочный гратен со шпинатом, сыром и панировкой.', steps: '1. Тушить шпинат. 2. Выложить в форму, добавить сливки и сыр. 3. Посыпать сухарями. 4. Запечь до золотистого цвета.' }
            ],
            ingredients: ['spinach','cheese','cream','bread']
        },
// ——— Fourth block: последние 25 рецептов ———

// Pizza (10)
        {
            translations: [
                { language: 'en', title: 'Tomato Pizza', description: 'A crispy pizza topped with tangy tomato paste, melted cheese on a flour-based crust.', steps: '1. Prepare dough from flour.\n2. Spread tomato paste evenly.\n3. Sprinkle cheese on top.\n4. Bake at 220°C until golden and bubbly.' },
                { language: 'ru', title: 'Пицца с томатом', description: 'Хрустящая пицца на тесте из муки с томатной пастой и расплавленным сыром.', steps: '1. Приготовьте тесто из муки.\n2. Равномерно намажьте томатную пасту.\n3. Посыпьте сыром.\n4. Выпекайте при 220°C до золотистой корочки.' }
            ],
            ingredients: ['flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Chicken Pizza', description: 'A savory pizza with tender chicken strips, tomato paste and melted cheese.', steps: '1. Roll out dough.\n2. Spread tomato paste.\n3. Arrange cooked chicken pieces.\n4. Top with cheese and bake until crust is crisp.' },
                { language: 'ru', title: 'Пицца с курицей', description: 'Ароматная пицца с кусочками курицы, томатной пастой и сыром.', steps: '1. Раскатайте тесто.\n2. Нанесите томатную пасту.\n3. Выложите кусочки приготовленной курицы.\n4. Посыпьте сыром и запекайте до хрустящей корочки.' }
            ],
            ingredients: ['flour','tomato_paste','chicken','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Pizza', description: 'A classic cheese pizza with extra cheese on a golden flour crust.', steps: '1. Make and stretch dough.\n2. Spread a thin layer of tomato paste.\n3. Generously layer cheese.\n4. Bake until cheese is melted and edges are golden.' },
                { language: 'ru', title: 'Сырная пицца', description: 'Классическая пицца с большим количеством сыра на золотистой корочке из муки.', steps: '1. Приготовьте и раскатайте тесто.\n2. Нанесите тонкий слой томатной пасты.\n3. Щедро выложите сыр.\n4. Запекайте до плавления сыра и золотистых краёв.' }
            ],
            ingredients: ['flour','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Beef Pizza', description: 'A hearty pizza topped with roast beef, tomato paste, and melted cheese.', steps: '1. Roll out dough.\n2. Spread tomato paste.\n3. Layer thinly sliced roast beef.\n4. Sprinkle cheese and bake until ready.' },
                { language: 'ru', title: 'Пицца с говядиной', description: 'Сытная пицца с ростбифом, томатной пастой и плавленым сыром.', steps: '1. Раскатайте тесто.\n2. Нанесите томатную пасту.\n3. Выложите ростбиф тонкими ломтиками.\n4. Посыпьте сыром и запекайте до готовности.' }
            ],
            ingredients: ['flour','tomato_paste','beef','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Pizza', description: 'A fragrant pizza with sautéed mushrooms, tomato paste, and cheese.', steps: '1. Prepare dough.\n2. Spread tomato paste.\n3. Top with sautéed mushrooms.\n4. Sprinkle cheese and bake until golden.' },
                { language: 'ru', title: 'Пицца с грибами', description: 'Ароматная пицца с обжаренными грибами, томатной пастой и сыром.', steps: '1. Приготовьте тесто.\n2. Нанесите томатную пасту.\n3. Выложите обжаренные грибы.\n4. Посыпьте сыром и выпекайте до золотистого цвета.' }
            ],
            ingredients: ['flour','tomato_paste','mushroom','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Pizza', description: 'A unique pizza with thin potato slices, tomato paste, and cheese.', steps: '1. Roll dough.\n2. Spread tomato paste.\n3. Layer thinly sliced potatoes.\n4. Top with cheese and bake until crispy.' },
                { language: 'ru', title: 'Пицца с картофелем', description: 'Необычная пицца с тонкими ломтиками картофеля, томатной пастой и сыром.', steps: '1. Раскатайте тесто.\n2. Нанесите томатную пасту.\n3. Выложите ломтики картофеля.\n4. Посыпьте сыром и выпекайте до хрустящей корочки.' }
            ],
            ingredients: ['flour','tomato_paste','potato','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Pizza', description: 'A light pizza with poached shrimp, tomato paste and cheese.', steps: '1. Stretch dough.\n2. Spread tomato paste.\n3. Distribute cooked shrimp.\n4. Sprinkle cheese and bake briefly.' },
                { language: 'ru', title: 'Пицца с креветками', description: 'Лёгкая пицца с отварными креветками, томатной пастой и сыром.', steps: '1. Раскатайте тесто.\n2. Нанесите томатную пасту.\n3. Выложите креветки.\n4. Посыпьте сыром и запекайте короткое время.' }
            ],
            ingredients: ['flour','tomato_paste','shrimp','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Pizza', description: 'A gluten-friendly pizza with a cauliflower base, tomato paste and cheese.', steps: '1. Make crust from cauliflower.\n2. Spread tomato paste.\n3. Top with cheese.\n4. Bake until set.' },
                { language: 'ru', title: 'Пицца с цветной капустой', description: 'Глютен-фри пицца на основе цветной капусты с томатной пастой и сыром.', steps: '1. Приготовьте корж из измельчённой цветной капусты.\n2. Нанесите томатную пасту.\n3. Посыпьте сыром.\n4. Запекайте до плотного состояния.' }
            ],
            ingredients: ['cauliflower','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Pizza', description: 'A nutritious pizza with broccoli florets, tomato paste, and cheese.', steps: '1. Roll dough.\n2. Spread tomato paste.\n3. Arrange broccoli florets.\n4. Top with cheese and bake.' },
                { language: 'ru', title: 'Пицца с брокколи', description: 'Питательная пицца с брокколи, томатной пастой и сыром.', steps: '1. Раскатайте тесто.\n2. Нанесите томатную пасту.\n3. Выложите соцветия брокколи.\n4. Посыпьте сыром и выпекайте.' }
            ],
            ingredients: ['flour','tomato_paste','broccoli','cheese']
        },

// Remaining Casserole (5)
        {
            translations: [
                { language: 'en', title: 'Potato Casserole', description: 'A creamy potato casserole with layers of sliced potatoes, cream and cheese, topped with breadcrumbs.', steps: '1. Layer sliced potatoes in dish.\n2. Pour over cream.\n3. Sprinkle cheese and breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Картофельная запеканка', description: 'Сливочная запеканка с слоями картофеля, сливок и сыра под хлебной крошкой.', steps: '1. Выложите ломтики картофеля в форму.\n2. Залейте сливками.\n3. Посыпьте сыром и хлебными крошками.\n4. Запекайте до золотистости.' }
            ],
            ingredients: ['potato','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Casserole', description: 'A rich shrimp casserole in a creamy cheese sauce topped with crunchy breadcrumbs.', steps: '1. Mix shrimp with cream and cheese.\n2. Transfer to baking dish.\n3. Top with breadcrumbs.\n4. Bake until bubbly.' },
                { language: 'ru', title: 'Креветочная запеканка', description: 'Насыщенная запеканка с креветками в сырно-сливочном соусе с хрустящей корочкой.', steps: '1. Смешайте креветки со сливками и сыром.\n2. Выложите в форму.\n3. Посыпьте хлебными крошками.\n4. Выпекайте до пузырения.' }
            ],
            ingredients: ['shrimp','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Casserole', description: 'A healthy cauliflower casserole baked with cheese and a breadcrumb crust.', steps: '1. Layer cauliflower florets.\n2. Pour cream and sprinkle cheese.\n3. Top with breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Запеканка с цветной капустой', description: 'Полезная запеканка с цветной капустой, сыром и хлебной крошкой.', steps: '1. Выложите соцветия капусты.\n2. Залейте сливками и посыпьте сыром.\n3. Добавьте хлебные крошки.\n4. Запекайте до золотистой корочки.' }
            ],
            ingredients: ['cauliflower','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Casserole', description: 'A nutritious broccoli casserole with cheese, cream and a crisp topping.', steps: '1. Layer broccoli florets.\n2. Pour over cream and cheese.\n3. Top with breadcrumbs.\n4. Bake until set.' },
                { language: 'ru', title: 'Запеканка с брокколи', description: 'Питательная запеканка с брокколи, сыром и сливками под хрустящей корочкой.', steps: '1. Выложите брокколи.\n2. Залейте сливками и посыпьте сыром.\n3. Посыпьте хлебными крошками.\n4. Запекайте до готовности.' }
            ],
            ingredients: ['broccoli','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Casserole', description: 'A creamy spinach casserole with melted cheese and a golden breadcrumb crust.', steps: '1. Layer spinach in dish.\n2. Pour cream and sprinkle cheese.\n3. Top with breadcrumbs.\n4. Bake until golden brown.' },
                { language: 'ru', title: 'Запеканка со шпинатом', description: 'Сливочная запеканка со шпинатом, сыром и золотистой крошкой.', steps: '1. Выложите шпинат в форму.\n2. Залейте сливками и посыпьте сыром.\n3. Добавьте хлебные крошки.\n4. Запекайте до золотистого цвета.' }
            ],
            ingredients: ['spinach','cream','cheese','bread']
        },

// Remaining Pasta (5)
        {
            translations: [
                { language: 'en', title: 'Potato Pasta', description: 'Homemade pasta tossed with diced potatoes, tomato paste, and cheese.', steps: '1. Make and cut pasta.\n2. Boil pasta and potatoes.\n3. Toss with tomato paste and cheese.\n4. Serve hot.' },
                { language: 'ru', title: 'Паста с картофелем', description: 'Домашняя паста с кубиками картофеля, томатной пастой и сыром.', steps: '1. Приготовьте и нарежьте пасту.\n2. Отварите пасту и картофель.\n3. Перемешайте с томатной пастой и сыром.\n4. Подавайте горячей.' }
            ],
            ingredients: ['flour','potato','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Pasta', description: 'Tender shrimp pasta in a tomato-cheese sauce.', steps: '1. Cook pasta al dente.\n2. Sauté shrimp.\n3. Stir in tomato paste and cheese.\n4. Mix with pasta and serve.' },
                { language: 'ru', title: 'Паста с креветками', description: 'Нежная паста с креветками в томатно-сырном соусе.', steps: '1. Отварите пасту al dente.\n2. Обжарьте креветки.\n3. Добавьте томатную пасту и сыр.\n4. Перемешайте с пастой и подавайте.' }
            ],
            ingredients: ['flour','shrimp','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Pasta', description: 'Pasta with roasted cauliflower, tomato paste, and melted cheese.', steps: '1. Roast cauliflower.\n2. Cook pasta.\n3. Combine with tomato paste and cheese.\n4. Serve warm.' },
                { language: 'ru', title: 'Паста с цветной капустой', description: 'Паста с запечённой цветной капустой, томатной пастой и расплавленным сыром.', steps: '1. Запеките цветную капусту.\n2. Отварите пасту.\n3. Смешайте с томатной пастой и сыром.\n4. Подавайте тёплой.' }
            ],
            ingredients: ['flour','cauliflower','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Pasta', description: 'Pasta with steamed broccoli, tomato paste, and cheese.', steps: '1. Steam broccoli.\n2. Cook pasta.\n3. Toss with tomato paste and cheese.\n4. Serve immediately.' },
                { language: 'ru', title: 'Паста с брокколи', description: 'Паста с приготовленной на пару брокколи, томатной пастой и сыром.', steps: '1. Приготовьте брокколи на пару.\n2. Отварите пасту.\n3. Смешайте с томатной пастой и сыром.\n4. Подавайте сразу.' }
            ],
            ingredients: ['flour','broccoli','tomato_paste','cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Pasta', description: 'Pasta with wilted spinach, tomato paste and cheese.', steps: '1. Wilt spinach.\n2. Cook pasta.\n3. Mix with tomato paste and cheese.\n4. Serve hot.' },
                { language: 'ru', title: 'Паста со шпинатом', description: 'Паста с подвяленным шпинатом, томатной пастой и сыром.', steps: '1. Тушите шпинат.\n2. Отварите пасту.\n3. Перемешайте с томатной пастой и сыром.\n4. Подавайте горячей.' }
            ],
            ingredients: ['flour','spinach','tomato_paste','cheese']
        },

// Remaining Gratin (5)
        {
            translations: [
                { language: 'en', title: 'Potato Gratin', description: 'A layered potato gratin with cheese, cream, and crispy breadcrumbs.', steps: '1. Slice potatoes thin.\n2. Layer in baking dish.\n3. Pour cream, sprinkle cheese and breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с картофелем', description: 'Слоёный гратен с картофелем, сыром, сливками и хрустящей хлебной крошкой.', steps: '1. Нарежьте картофель тонкими ломтиками.\n2. Выложите слоями в форму.\n3. Залейте сливками, посыпьте сыром и крошками.\n4. Выпекайте до золотистой корочки.' }
            ],
            ingredients: ['potato','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Gratin', description: 'Creamy shrimp gratin with melted cheese and breadcrumbs.', steps: '1. Place shrimp in dish.\n2. Pour cream, sprinkle cheese.\n3. Top with breadcrumbs.\n4. Bake until bubbly.' },
                { language: 'ru', title: 'Гратен с креветками', description: 'Сливочный гратен с креветками, сыром и панировкой.', steps: '1. Выложите креветки в форму.\n2. Залейте сливками, посыпьте сыром.\n3. Добавьте хлебные крошки.\n4. Запекайте до пузырения.' }
            ],
            ingredients: ['shrimp','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cauliflower Gratin', description: 'A cheesy cauliflower gratin with cream and breadcrumbs.', steps: '1. Blanch cauliflower.\n2. Layer in dish, add cream and cheese.\n3. Top with breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Гратен с цветной капустой', description: 'Сырный гратен с цветной капустой, сливками и хлебной крошкой.', steps: '1. Бланшируйте капусту.\n2. Выложите в форму, залейте сливками и посыпьте сыром.\n3. Добавьте крошки.\n4. Выпекайте до золотистой корочки.' }
            ],
            ingredients: ['cauliflower','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Broccoli Gratin', description: 'A rich broccoli gratin with melted cheese, cream, and breadcrumbs.', steps: '1. Blanch broccoli.\n2. Layer in dish, pour cream and cheese.\n3. Top with breadcrumbs.\n4. Bake until set.' },
                { language: 'ru', title: 'Гратен с брокколи', description: 'Насыщенный гратен с брокколи, сыром, сливками и панировкой.', steps: '1. Бланшируйте брокколи.\n2. Выложите в форму, добавьте сливки и сыр.\n3. Посыпьте хлебными крошками.\n4. Выпекайте до готовности.' }
            ],
            ingredients: ['broccoli','cream','cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Gratin', description: 'A creamy spinach gratin with cheese and crunchy breadcrumbs.', steps: '1. Wilt spinach.\n2. Layer in dish, pour cream.\n3. Sprinkle cheese and breadcrumbs.\n4. Bake until golden.' },
                { language: 'ru', title: 'Гратен со шпинатом', description: 'Сливочный гратен со шпинатом, сыром и хрустящей корочкой.', steps: '1. Тушите шпинат.\n2. Выложите в форму, залейте сливками.\n3. Посыпьте сыром и крошками.\n4. Выпекайте до золотистого цвета.' }
            ],
            ingredients: ['spinach','cream','cheese','bread']
        },
// ——— Ещё 25 простых рецептов (1–2 ингредиента) ———
        {
            translations: [
                { language: 'en', title: 'Tomato Slices', description: 'Simple fresh tomato slices, seasoned with salt and pepper.', steps: '1. Slice tomatoes.\n2. Season with salt and pepper.\n3. Serve.' },
                { language: 'ru', title: 'Ломтики томата', description: 'Простые ломтики свежего томата, приправленные солью и перцем.', steps: '1. Нарежьте томаты.\n2. Приправьте солью и перцем.\n3. Подавайте.' }
            ],
            ingredients: ['tomato']
        },
        {
            translations: [
                { language: 'en', title: 'Grilled Cheese', description: 'Melted cheese on toasted bread.', steps: '1. Place cheese between two bread slices.\n2. Toast until cheese melts.\n3. Serve hot.' },
                { language: 'ru', title: 'Гриль-сыр', description: 'Расплавленный сыр между двумя ломтями хлеба.', steps: '1. Положите сыр между ломтями хлеба.\n2. Поджарьте до плавления сыра.\n3. Подавайте горячим.' }
            ],
            ingredients: ['cheese','bread']
        },
        {
            translations: [
                { language: 'en', title: 'Boiled Egg', description: 'A perfectly boiled egg.', steps: '1. Place egg in boiling water.\n2. Cook 7–8 minutes.\n3. Peel and serve.' },
                { language: 'ru', title: 'Варёное яйцо', description: 'Идеально сваренное яйцо.', steps: '1. Опустите яйцо в кипящую воду.\n2. Варите 7–8 минут.\n3. Очистите и подавайте.' }
            ],
            ingredients: ['egg']
        },
        {
            translations: [
                { language: 'en', title: 'Mashed Potato', description: 'Creamy mashed potato with butter.', steps: '1. Boil and mash potatoes.\n2. Stir in butter.\n3. Season and serve.' },
                { language: 'ru', title: 'Картофельное пюре', description: 'Нежное пюре с добавлением масла.', steps: '1. Отварите и разомните картофель.\n2. Добавьте масло.\n3. Приправьте и подавайте.' }
            ],
            ingredients: ['potato','butter']
        },
        {
            translations: [
                { language: 'en', title: 'Steamed Broccoli', description: 'Simple steamed broccoli.', steps: '1. Steam broccoli until tender.\n2. Season with salt.\n3. Serve.' },
                { language: 'ru', title: 'Приготовленная на пару брокколи', description: 'Простая брокколи на пару.', steps: '1. Приготовьте брокколи на пару до готовности.\n2. Приправьте солью.\n3. Подавайте.' }
            ],
            ingredients: ['broccoli']
        },
        {
            translations: [
                { language: 'en', title: 'Sautéed Mushrooms', description: 'Mushrooms sautéed in a little oil.', steps: '1. Heat oil in pan.\n2. Sauté mushrooms until golden.\n3. Season and serve.' },
                { language: 'ru', title: 'Жареные грибы', description: 'Грибы, обжаренные на небольшом количестве масла.', steps: '1. Разогрейте масло в сковороде.\n2. Обжарьте грибы до золотистого цвета.\n3. Приправьте и подавайте.' }
            ],
            ingredients: ['mushroom','oil']
        },
        {
            translations: [
                { language: 'en', title: 'Boiled Shrimp', description: 'Tender boiled shrimp.', steps: '1. Boil shrimp until pink.\n2. Drain and serve.' },
                { language: 'ru', title: 'Отварные креветки', description: 'Нежные отварные креветки.', steps: '1. Отварите креветки до розового цвета.\n2. Слейте воду и подавайте.' }
            ],
            ingredients: ['shrimp']
        },
        {
            translations: [
                { language: 'en', title: 'Garlic Bread', description: 'Toasted bread with garlic butter.', steps: '1. Mix butter with minced garlic.\n2. Spread on bread slices.\n3. Toast until golden.' },
                { language: 'ru', title: 'Чесночный хлеб', description: 'Поджаренный хлеб с чесночным маслом.', steps: '1. Смешайте масло с измельченным чесноком.\n2. Намажьте на хлеб.\n3. Поджарьте до золотистой корочки.' }
            ],
            ingredients: ['bread','garlic']
        },
        {
            translations: [
                { language: 'en', title: 'Creamy Spinach', description: 'Spinach wilted with cream.', steps: '1. Wilt spinach in pan.\n2. Stir in cream.\n3. Season and serve.' },
                { language: 'ru', title: 'Шпинат со сливками', description: 'Шпинат, тушёный со сливками.', steps: '1. Тушите шпинат на сковороде.\n2. Добавьте сливки.\n3. Приправьте и подавайте.' }
            ],
            ingredients: ['spinach','cream']
        },
        {
            translations: [
                { language: 'en', title: 'Butter Toast', description: 'Bread toasted with butter.', steps: '1. Butter bread slices.\n2. Toast until golden.\n3. Serve.' },
                { language: 'ru', title: 'Тост с маслом', description: 'Хлеб, поджаренный с маслом.', steps: '1. Намажьте хлеб маслом.\n2. Поджарьте до золотистого цвета.\n3. Подавайте.' }
            ],
            ingredients: ['bread','butter']
        },
        {
            translations: [
                { language: 'en', title: 'Olive Snack', description: 'A handful of briny olives.', steps: '1. Place olives in bowl.\n2. Serve.' },
                { language: 'ru', title: 'Закуска из оливок', description: 'Несколько пикантных оливок.', steps: '1. Выложите оливки в миску.\n2. Подавайте.' }
            ],
            ingredients: ['olive']
        },
        {
            translations: [
                { language: 'en', title: 'Lemon Water', description: 'Fresh water with a squeeze of lemon.', steps: '1. Add lemon juice to water.\n2. Stir and serve.' },
                { language: 'ru', title: 'Вода с лимоном', description: 'Свежая вода с долькой лимона.', steps: '1. Добавьте сок лимона в воду.\n2. Перемешайте и подавайте.' }
            ],
            ingredients: ['water','lemon']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Cubes', description: 'Simple cheese cubes as a snack.', steps: '1. Cube cheese.\n2. Serve.' },
                { language: 'ru', title: 'Кубики сыра', description: 'Простые кубики сыра для закуски.', steps: '1. Нарежьте сыр кубиками.\n2. Подавайте.' }
            ],
            ingredients: ['cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Baked Potato', description: 'A whole baked potato.', steps: '1. Bake potato at 200°C for 45 minutes.\n2. Serve.' },
                { language: 'ru', title: 'Запечённый картофель', description: 'Целый запечённый картофель.', steps: '1. Запекайте картофель при 200°C 45 минут.\n2. Подавайте.' }
            ],
            ingredients: ['potato']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Smoothie', description: 'Smoothie made with spinach and water.', steps: '1. Blend spinach with water until smooth.\n2. Serve chilled.' },
                { language: 'ru', title: 'Смузи из шпината', description: 'Смузи из шпината и воды.', steps: '1. Взбейте шпинат с водой до однородности.\n2. Подавайте охлаждённым.' }
            ],
            ingredients: ['spinach','water']
        },
        {
            translations: [
                { language: 'en', title: 'Mushroom Broth', description: 'Clear broth made from mushrooms.', steps: '1. Simmer mushrooms in water for 20 minutes.\n2. Strain and serve.' },
                { language: 'ru', title: 'Грибной бульон', description: 'Прозрачный бульон из грибов.', steps: '1. Кипятите грибы в воде 20 минут.\n2. Процедите и подавайте.' }
            ],
            ingredients: ['mushroom','water']
        },
        {
            translations: [
                { language: 'en', title: 'Shrimp Cocktail', description: 'Boiled shrimp served with lemon.', steps: '1. Boil shrimp until pink.\n2. Serve with lemon wedges.' },
                { language: 'ru', title: 'Коктейль из креветок', description: 'Отварные креветки с лимоном.', steps: '1. Отварите креветки до розового цвета.\n2. Подавайте с дольками лимона.' }
            ],
            ingredients: ['shrimp','lemon']
        },
        {
            translations: [
                { language: 'en', title: 'Cream Dip', description: 'Cream served as a dip.', steps: '1. Pour cream into bowl.\n2. Serve with bread.' },
                { language: 'ru', title: 'Сливочный дип', description: 'Сливки для дипа.', steps: '1. Вылейте сливки в миску.\n2. Подавайте с хлебом.' }
            ],
            ingredients: ['cream']
        },
        {
            translations: [
                { language: 'en', title: 'Butter Melts', description: 'Melted butter for dipping bread.', steps: '1. Melt butter.\n2. Serve warm.' },
                { language: 'ru', title: 'Растопленное масло', description: 'Растопленное масло для макания хлеба.', steps: '1. Растопите масло.\n2. Подавайте тёплым.' }
            ],
            ingredients: ['butter']
        },
        {
            translations: [
                { language: 'en', title: 'Olive Oil Dip', description: 'Olive oil for dipping bread.', steps: '1. Pour olive oil into dish.\n2. Serve with bread.' },
                { language: 'ru', title: 'Оливковое масло', description: 'Оливковое масло для макания хлеба.', steps: '1. Вылейте оливковое масло в блюдце.\n2. Подавайте с хлебом.' }
            ],
            ingredients: ['olive']
        },
        {
            translations: [
                { language: 'en', title: 'Lemonade', description: 'Fresh lemonade with water and lemon.', steps: '1. Mix lemon juice and water.\n2. Add sugar if desired.\n3. Serve chilled.' },
                { language: 'ru', title: 'Лимонад', description: 'Свежий лимонад из воды и лимона.', steps: '1. Смешайте сок лимона и воду.\n2. Добавьте сахар по вкусу.\n3. Подавайте охлаждённым.' }
            ],
            ingredients: ['lemon','water']
        },
        {
            translations: [
                { language: 'en', title: 'Bread Toast', description: 'Plain toasted bread.', steps: '1. Toast bread until golden.\n2. Serve.' },
                { language: 'ru', title: 'Поджаренный хлеб', description: 'Простой поджаренный хлеб.', steps: '1. Поджарьте хлеб до золотистого цвета.\n2. Подавайте.' }
            ],
            ingredients: ['bread']
        },
        {
            translations: [
                { language: 'en', title: 'Cheese Stick', description: 'A stick of cheese as a snack.', steps: '1. Cut cheese into sticks.\n2. Serve.' },
                { language: 'ru', title: 'Сырный стик', description: 'Палочка сыра для перекуса.', steps: '1. Нарежьте сыр палочками.\n2. Подавайте.' }
            ],
            ingredients: ['cheese']
        },
        {
            translations: [
                { language: 'en', title: 'Lemon Slice', description: 'A simple lemon slice.', steps: '1. Slice lemon.\n2. Serve.' },
                { language: 'ru', title: 'Долька лимона', description: 'Простая долька лимона.', steps: '1. Нарежьте лимон.\n2. Подавайте.' }
            ],
            ingredients: ['lemon']
        },
        {
            translations: [
                { language: 'en', title: 'Potato Chips', description: 'Homemade potato chips.', steps: '1. Thinly slice potatoes.\n2. Fry until crisp.\n3. Drain and serve.' },
                { language: 'ru', title: 'Чипсы из картофеля', description: 'Домашние картофельные чипсы.', steps: '1. Тонко нарежьте картофель.\n2. Обжарьте до хрустящей корочки.\n3. Слейте масло и подавайте.' }
            ],
            ingredients: ['potato','oil']
        },
        {
            translations: [
                { language: 'en', title: 'Olive Tapenade', description: 'Crushed olives for a spread.', steps: '1. Crush olives.\n2. Serve on bread.' },
                { language: 'ru', title: 'Тапенада из оливок', description: 'Раздавленные оливки для намазки.', steps: '1. Разомните оливки.\n2. Подавайте на хлеб.' }
            ],
            ingredients: ['olive']
        },
        {
            translations: [
                { language: 'en', title: 'Butter Spread', description: 'Softened butter for spreading.', steps: '1. Soften butter.\n2. Spread on bread.' },
                { language: 'ru', title: 'Масляный спред', description: 'Мягкое масло для намазывания.', steps: '1. Размягчите масло.\n2. Намажьте на хлеб.' }
            ],
            ingredients: ['butter']
        },
        {
            translations: [
                { language: 'en', title: 'Cream Spoon', description: 'A spoonful of cream.', steps: '1. Scoop cream with spoon.\n2. Serve.' },
                { language: 'ru', title: 'Сливка одной ложки', description: 'Ложка сливок.', steps: '1. Наберите сливки ложкой.\n2. Подавайте.' }
            ],
            ingredients: ['cream']
        },
        {
            translations: [
                { language: 'en', title: 'Spinach Salad', description: 'Fresh spinach leaves lightly dressed.', steps: '1. Wash spinach.\n2. Drizzle with oil.\n3. Serve.' },
                { language: 'ru', title: 'Салат из шпината', description: 'Свежие листья шпината под лёгкой заправкой.', steps: '1. Вымойте шпинат.\n2. Полейте маслом.\n3. Подавайте.' }
            ],
            ingredients: ['spinach','olive']
        },
        {
            translations: [
                { language: 'en', title: 'Honey Lemon Tea', description: 'Warm tea made with hot water, fresh lemon slices, and a spoonful of honey.', steps: '1. Boil water.\n2. Pour over lemon slices.\n3. Stir in honey.\n4. Serve warm.' },
                { language: 'ru', title: 'Медово-лимонный чай', description: 'Тёплый чай на горячей воде с дольками лимона и ложкой мёда.', steps: '1. Доведите воду до кипения.\n2. Залейте дольки лимона.\n3. Добавьте мёд и размешайте.\n4. Подавайте тёплым.' }
            ],
            ingredients: ['water','lemon','honey']
        },
        {
            translations: [
                { language: 'en', title: 'Garlic Butter Shrimp', description: 'Succulent shrimp sautéed in garlic-infused melted butter.', steps: '1. Melt butter in pan.\n2. Add minced garlic and sauté.\n3. Toss in shrimp and cook until pink.\n4. Serve immediately.' },
                { language: 'ru', title: 'Креветки в чесночном масле', description: 'Сочные креветки, обжаренные в растопленном сливочном масле с чесноком.', steps: '1. Растопите масло в сковороде.\n2. Добавьте измельчённый чеснок и обжарьте.\n3. Положите креветки и готовьте до розового цвета.\n4. Подавайте сразу.' }
            ],
            ingredients: ['butter','garlic','shrimp']
        },
// 3
        {
            translations: [
                { language: 'en', title: 'Tomato Basil Bruschetta', description: 'Toasted bread topped with diced tomatoes, fresh basil, and a drizzle of olive oil.', steps: '1. Toast bread slices.\n2. Mix diced tomato with chopped basil and olive oil.\n3. Spoon mixture onto toast.\n4. Serve.' },
                { language: 'ru', title: 'Брускетта с томатом и базиликом', description: 'Поджаренный хлеб с кубиками томатов, свежим базиликом и каплей оливкового масла.', steps: '1. Поджарьте ломтики хлеба.\n2. Смешайте томаты, базилик и масло.\n3. Выложите смесь на тост.\n4. Подавайте.' }
            ],
            ingredients: ['bread','tomato','basil','olive']
        },
// 4
        {
            translations: [
                { language: 'en', title: 'Cheesy Garlic Bread', description: 'Toasted bread smeared with garlic butter and topped with melted cheese.', steps: '1. Mix butter with garlic.\n2. Spread on bread and top with cheese.\n3. Bake until cheese melts.\n4. Serve hot.' },
                { language: 'ru', title: 'Чесночный хлеб с сыром', description: 'Тосты с чесночным маслом и расплавленным сыром.', steps: '1. Смешайте масло с чесноком.\n2. Намажьте хлеб и посыпьте сыром.\n3. Запеките до плавления сыра.\n4. Подавайте горячим.' }
            ],
            ingredients: ['bread','butter','garlic','cheese']
        },
// 5
        {
            translations: [
                { language: 'en', title: 'Egg & Spinach Scramble', description: 'Fluffy scrambled eggs with wilted spinach.', steps: '1. Whisk eggs.\n2. Sauté spinach until wilted.\n3. Add eggs and scramble until set.\n4. Season and serve.' },
                { language: 'ru', title: 'Яичница со шпинатом', description: 'Пушистая яичница с тушёным шпинатом.', steps: '1. Взбейте яйца.\n2. Обжарьте шпинат до увядания.\n3. Влейте яйца и пожарьте.\n4. Приправьте и подайте.' }
            ],
            ingredients: ['egg','spinach']
        },
// 6
        {
            translations: [
                { language: 'en', title: 'Potato & Cheese Frittata', description: 'Baked egg dish with diced potatoes and melted cheese.', steps: '1. Sauté diced potatoes until soft.\n2. Whisk eggs and pour over potatoes.\n3. Sprinkle cheese and bake until set.\n4. Slice and serve.' },
                { language: 'ru', title: 'Фритатта с картофелем и сыром', description: 'Запечённое блюдо из яиц с картофелем и расплавленным сыром.', steps: '1. Обжарьте картофель до мягкости.\n2. Взбейте яйца и вылейте на картофель.\n3. Посыпьте сыром и запеките до готовности.\n4. Порежьте и подайте.' }
            ],
            ingredients: ['potato','egg','cheese']
        },
// 7
        {
            translations: [
                { language: 'en', title: 'Mushroom & Garlic Toast', description: 'Sautéed mushrooms with garlic served on toast.', steps: '1. Sauté mushrooms with garlic.\n2. Toast bread.\n3. Top toast with mushroom mixture.\n4. Serve warm.' },
                { language: 'ru', title: 'Грибы с чесноком на тосте', description: 'Обжаренные с чесноком грибы на тосте.', steps: '1. Обжарьте грибы с чесноком.\n2. Поджарьте хлеб.\n3. Выложите грибы на тост.\n4. Подавайте тёплым.' }
            ],
            ingredients: ['mushroom','garlic','bread']
        },
// 8
        {
            translations: [
                { language: 'en', title: 'Broccoli Cheese Bites', description: 'Steamed broccoli florets topped with melted cheese.', steps: '1. Steam broccoli until tender.\n2. Place florets on baking sheet.\n3. Top each with cheese and broil.\n4. Serve.' },
                { language: 'ru', title: 'Брокколи с сыром', description: 'Бланшированная брокколи с расплавленным сыром.', steps: '1. Бланшируйте брокколи до готовности.\n2. Выложите на противень.\n3. Посыпьте сыром и запеките под грилем.\n4. Подавайте.' }
            ],
            ingredients: ['broccoli','cheese']
        },
// 9
        {
            translations: [
                { language: 'en', title: 'Shrimp & Lemon Skewers', description: 'Grilled shrimp skewers with a squeeze of lemon.', steps: '1. Thread shrimp onto skewers.\n2. Grill until cooked.\n3. Squeeze lemon juice on top.\n4. Serve.' },
                { language: 'ru', title: 'Креветки на шпажках с лимоном', description: 'Гриль-креветки на шпажках с лимоном.', steps: '1. Наденьте креветки на шпажки.\n2. Обжарьте на гриле до готовности.\n3. Выжмите лимонный сок.\n4. Подавайте.' }
            ],
            ingredients: ['shrimp','lemon']
        },
// 10
        {
            translations: [
                { language: 'en', title: 'Cauliflower Rice', description: 'Grated cauliflower lightly sautéed as a rice alternative.', steps: '1. Grate cauliflower.\n2. Sauté in a bit of oil until tender.\n3. Season and serve.' },
                { language: 'ru', title: 'Цветная капуста «рис»', description: 'Тёртая капуста, слегка обжаренная как альтернатива рису.', steps: '1. Натерите капусту.\n2. Обжарьте в масле до готовности.\n3. Приправьте и подайте.' }
            ],
            ingredients: ['cauliflower']
        },
// 11
        {
            translations: [
                { language: 'en', title: 'Olive Tapenade Toast', description: 'Crushed olives with oil on toast.', steps: '1. Mash olives with oil.\n2. Spread on toast.\n3. Serve.' },
                { language: 'ru', title: 'Тапенада на тосте', description: 'Раздавленные оливки с маслом на тосте.', steps: '1. Разомните оливки с маслом.\n2. Намажьте на тост.\n3. Подавайте.' }
            ],
            ingredients: ['olive','oil','bread']
        },
// 12
        {
            translations: [
                { language: 'en', title: 'Lemon Garlic Chicken', description: 'Chicken sautéed with garlic and finished with lemon juice.', steps: '1. Sauté garlic in oil.\n2. Add chicken pieces and cook.\n3. Squeeze lemon juice over.\n4. Serve.' },
                { language: 'ru', title: 'Курица с чесноком и лимоном', description: 'Курица, обжаренная с чесноком и политая лимонным соком.', steps: '1. Обжарьте чеснок в масле.\n2. Добавьте курицу и готовьте.\n3. Выжмите лимонный сок.\n4. Подавайте.' }
            ],
            ingredients: ['chicken','garlic','lemon']
        },
// 13
        {
            translations: [
                { language: 'en', title: 'Spinach & Feta Wrap', description: 'Fresh spinach and crumbled feta in a warm tortilla.', steps: '1. Lay tortilla flat.\n2. Layer spinach and feta.\n3. Roll and warm in pan.\n4. Serve.' },
                { language: 'ru', title: 'Ролл со шпинатом и фетой', description: 'Свежий шпинат и раскрошенная фета в тёплой лепёшке.', steps: '1. Разложите лепёшку.\n2. Выложите шпинат и фету.\n3. Сверните и подогрейте в сковороде.\n4. Подавайте.' }
            ],
            ingredients: ['spinach','feta','bread']
        },
// 14
        {
            translations: [
                { language: 'en', title: 'Cheesy Egg Muffins', description: 'Mini frittatas baked with eggs and cheese.', steps: '1. Whisk eggs and cheese.\n2. Pour into muffin tin.\n3. Bake until set.\n4. Cool slightly and serve.' },
                { language: 'ru', title: 'Мини-фриттаты с сыром', description: 'Мини-фриттаты, запечённые из яиц и сыра.', steps: '1. Взбейте яйца и сыр.\n2. Вылейте в форму для маффинов.\n3. Запеките до готовности.\n4. Остудите и подавайте.' }
            ],
            ingredients: ['egg','cheese']
        },
// 15
        {
            translations: [
                { language: 'en', title: 'Potato & Herb Bites', description: 'Roasted potato cubes tossed with fresh herbs.', steps: '1. Cube potatoes and roast.\n2. Toss with chopped herbs.\n3. Serve warm.' },
                { language: 'ru', title: 'Картофель с травами', description: 'Запечённые кубики картофеля с добавлением свежих трав.', steps: '1. Нарежьте картофель кубиками и запеките.\n2. Смешайте с рублеными травами.\n3. Подавайте тёплым.' }
            ],
            ingredients: ['potato','herbs','oil']
        },
// 16
        {
            translations: [
                { language: 'en', title: 'Mushroom Garlic Pasta', description: 'Quick pasta tossed with sautéed mushrooms, garlic, and olive oil.', steps: '1. Cook pasta.\n2. Sauté mushrooms and garlic in oil.\n3. Toss pasta with mushroom mixture.\n4. Serve.' },
                { language: 'ru', title: 'Паста с грибами и чесноком', description: 'Быстрая паста с обжаренными грибами, чесноком и маслом.', steps: '1. Отварите пасту.\n2. Обжарьте грибы и чеснок в масле.\n3. Перемешайте с пастой.\n4. Подавайте.' }
            ],
            ingredients: ['flour','tomato_paste','cheese']
        },
// 17
        {
            translations: [
                { language: 'en', title: 'Shrimp & Broccoli Stir Fry', description: 'Stir-fried shrimp and broccoli in garlic oil.', steps: '1. Heat oil and garlic.\n2. Add shrimp and broccoli; stir-fry.\n3. Season and serve.' },
                { language: 'ru', title: 'Жаркое с креветками и брокколи', description: 'Жаркое с креветками и брокколи на чесночном масле.', steps: '1. Разогрейте масло с чесноком.\n2. Добавьте креветки и брокколи; обжарьте.\n3. Приправьте и подавайте.' }
            ],
            ingredients: ['shrimp','broccoli','garlic']
        },
// 18
        {
            translations: [
                { language: 'en', title: 'Cheese & Olive Skewers', description: 'Alternating cubes of cheese and olives on a skewer.', steps: '1. Thread cheese and olives onto skewers.\n2. Serve as appetizer.' },
                { language: 'ru', title: 'Шашлычки из сыра и оливок', description: 'На шпажках попеременно сыр и оливки.', steps: '1. Насадите сыр и оливки на шпажки.\n2. Подавайте как закуску.' }
            ],
            ingredients: ['cheese','olive']
        },
// 19
        {
            translations: [
                { language: 'en', title: 'Lemon & Herb Chicken', description: 'Chicken breasts marinated in lemon juice and herbs, then grilled.', steps: '1. Marinate chicken in lemon juice and herbs.\n2. Grill until cooked.\n3. Serve.' },
                { language: 'ru', title: 'Курица с лимоном и травами', description: 'Куриная грудка, маринованная в лимоне и травах, затем на гриле.', steps: '1. Замаринуйте курицу в лимоне и травах.\n2. Гриль до готовности.\n3. Подавайте.' }
            ],
            ingredients: ['chicken','lemon','herbs']
        },
// 20
        {
            translations: [
                { language: 'en', title: 'Spinach & Cheese Quesadilla', description: 'Tortilla filled with cheese and wilted spinach, grilled until crispy.', steps: '1. Place cheese and spinach on tortilla.\n2. Fold and grill until golden.\n3. Slice and serve.' },
                { language: 'ru', title: 'Кесадилья со шпинатом и сыром', description: 'Лепёшка с сыром и шпинатом, поджаренная до хрустящей корочки.', steps: '1. Выложите сыр и шпинат на лепёшку.\n2. Сложите и обжарьте до золотистости.\n3. Нарежьте и подавайте.' }
            ],
            ingredients: ['bread','cheese','spinach']
        },
// 21
        {
            translations: [
                { language: 'en', title: 'Garlic Potato Wedges', description: 'Roasted potato wedges tossed in garlic oil.', steps: '1. Cut potatoes into wedges.\n2. Toss with garlic and oil.\n3. Roast until crispy.\n4. Serve.' },
                { language: 'ru', title: 'Картофельные дольки с чесноком', description: 'Запечённые дольки картофеля в чесночном масле.', steps: '1. Нарежьте картофель дольками.\n2. Смешайте с чесноком и маслом.\n3. Запекайте до хрустящей корочки.\n4. Подавайте.' }
            ],
            ingredients: ['potato','garlic','oil']
        },
// 22
        {
            translations: [
                { language: 'en', title: 'Mushroom & Cheese Omelette', description: 'Fluffy omelette filled with sautéed mushrooms and melted cheese.', steps: '1. Whisk eggs.\n2. Sauté mushrooms.\n3. Pour eggs over mushrooms, add cheese.\n4. Fold and serve.' },
                { language: 'ru', title: 'Омлет с грибами и сыром', description: 'Пушистый омлет с обжаренными грибами и расплавленным сыром.', steps: '1. Взбейте яйца.\n2. Обжарьте грибы.\n3. Вылейте яйца на грибы, добавьте сыр.\n4. Сложите и подавайте.' }
            ],
            ingredients: ['egg','mushroom','cheese']
        },
// 23
        {
            translations: [
                { language: 'en', title: 'Shrimp Pasta Salad', description: 'Cooked pasta and shrimp dressed with olive oil and herbs.', steps: '1. Boil pasta and shrimp.\n2. Toss with oil and chopped herbs.\n3. Serve chilled.' },
                { language: 'ru', title: 'Паста с креветками (салат)', description: 'Отварная паста и креветки, заправленные маслом и травами.', steps: '1. Отварите пасту и креветки.\n2. Перемешайте с маслом и травами.\n3. Подавайте охлаждённым.' }
            ],
            ingredients: ['flour','shrimp','olive','herbs']
        },
// 24
        {
            translations: [
                { language: 'en', title: 'Cauliflower Cheese Bake', description: 'Baked cauliflower florets topped with melted cheese.', steps: '1. Blanch cauliflower.\n2. Place in dish and top with cheese.\n3. Bake until golden.' },
                { language: 'ru', title: 'Запекание из цветной капусты с сыром', description: 'Запечённые соцветия капусты с расплавленным сыром.', steps: '1. Бланшируйте капусту.\n2. Выложите в форму и посыпьте сыром.\n3. Запекайте до золотистого цвета.' }
            ],
            ingredients: ['cauliflower','cheese']
        },
// 25
        {
            translations: [
                { language: 'en', title: 'Bread & Butter Pudding', description: 'Layers of buttered bread baked with milk and a sprinkle of sugar.', steps: '1. Butter bread and layer in dish.\n2. Pour milk over and sprinkle sugar.\n3. Bake until set.' },
                { language: 'ru', title: 'Хлебный пудинг с маслом', description: 'Слои хлеба с маслом, запечённые со сливками и сахаром.', steps: '1. Намажьте хлеб маслом и уложите слоями.\n2. Залейте молоком и посыпьте сахаром.\n3. Запекайте до готовности.' }
            ],
            ingredients: ['bread','butter','milk','sugar']
        },
    ];

    // Получаем все существующие продукты
    const allProducts = await prisma.product.findMany({ select: { id: true } });
    const validProductIds = new Set(allProducts.map(p => p.id));

    for (const r of recipes) {
        // Проверяем, что все ингредиенты существуют
        const missing = r.ingredients.filter(id => !validProductIds.has(id));
        if (missing.length > 0) {
            console.warn(`Skipping recipe due to missing products: ${missing.join(', ')}`);
            continue; // пропускаем создание этого рецепта
        }

        // Создание рецепта с переводами
        const created = await prisma.recipe.create({
            data: {
                translations: { create: r.translations }
            }
        });

        // Связь рецепта с продуктами
        await prisma.recipeProduct.createMany({
            data: r.ingredients.map(productId => ({ recipeId: created.id, productId }))
        });
    }
}
