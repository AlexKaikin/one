export enum Langs {
  RU = 'ru',
  EN = 'en',
}

export type Translation = {
  [key in TranslationKeys]: string
}

export type Translate = {
  en: Translation
  ru: Translation
}

export const translate = {
  en: {
    admin: 'Admin',
    add: 'Add',
    added: 'Added',
    addedToCart: 'Added to cart',
    addedToFavorites: 'Added to favorites',
    excludedFromFavorites: 'Excluded from favorites',
    addedToCompare: 'Added to compare',
    excludedFromCompare: 'Excluded from compare',
    dashboard: 'Dashboard',
    login: 'Login',
    registration: 'Registration',
    home: 'Home',
    shop: 'Shop',
    products: 'Products',
    tea: 'Tea',
    coffee: 'Coffee',
    favorites: 'Favorites',
    compare: 'Compare',
    cart: 'Cart',
    blog: 'Blog',
    club: 'Club',
    account: 'Account',
    lk: 'Personal Area',
    search: 'Search',
    logout: 'Logout',
    darkTheme: 'Dark theme',
    lightTheme: 'Light theme',
    sorting: 'Sorting',
    new: 'New',
    pop: 'Pop',
    priceAsc: 'Price asc',
    priceDesc: 'Price desc',
    required: 'Required',
    title: 'Title',
    description: 'Description',
    inStock: 'In stock',
    ended: 'Ended',
    volume: 'Volume',
    price: 'Price',
    image: 'Image',
    images: 'Images',
    save: 'Save',
    delete: 'Delete',
    newProduct: 'New product',
    maxSize: 'Max size',
    MaxLimit: 'Max limit',
    more0: 'Need more than 0',
    published: 'Published',
    updateProduct: 'Update product',
    reviews: 'Reviews',
    review: 'Review',
    homeTitle: 'International community',
    homeSubTitle: 'We unite and become stronger',
    homeDescription:
      'Welcome to the ONE community space. Here we are interested in the care of health, beauty and longevity. All users have access to such services as e-shop, blog, social network. Every day we are getting bigger. We`ll be glad to see you in the community, and help you reach your goals.',
    policy: 'Confidentiality Policy',
    cookies: 'Use of cookies',
    quantity: 'Quantity',
    cost: 'Cost',
    empty: 'Empty',
    email: 'Email',
    password: 'Password',
    send: 'Send',
    min8: 'Minimum 8 characters',
    max32: 'Maximum 8 characters',
    dontAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    invalidCredentials: 'Invalid credentials',
    maximum: 'Maximum',
    minimum: 'Minimum',
    profile: 'Profile',
    choose: 'Choose',
    sentReview: 'Review sent for moderation',
    globalError: 'Something went wrong, try again later',
    rating: 'Rating',
    yourRating: 'Your rating',
    unrated: 'Unrated',
    onlyAuthorized: 'Available only to authorized users',
    text: 'Text',
    date: 'Date',
    status: 'Status',
    moderation: 'Moderation',
    approved: 'Approved',
    notApproved: 'Not approved',
    updated: 'Updated',
    yes: 'Yes',
    no: 'No',
    category: 'Category',
    pieces: 'Pieces',
    grams: 'Grams',
    kilograms: 'Kilograms',
    volumeMeasurement: 'Volume measurement',
    milliliters: 'Milliliters',
    liters: 'Liters',
    noReviews: 'There are no reviews, write first!',
    policyTitle: 'Privacy Policy',
    policyContent: `
<p>All persons who have filled in the information constituting personal data on this site, as well as placed other information by the specified actions confirm their consent to the processing of personal data and their transfer to the operator of personal data processing.</p>

<p>Under the personal data of the Citizen is understood the following information: general information (name and e-mail address, telephone number).</p>

<p>Citizen, by accepting this Agreement, express their interest and full consent that the processing of their personal data may include the following actions: collection, systematization, accumulation, storage, clarification (update, modification), use, destruction.</p>

<p>The Citizen guarantees: the information provided by him is complete, accurate and reliable; when providing information does not violate the legal rights and interests of third parties; all the information provided is filled out by the Citizen in respect of himself personally.</p>`,

    cookieTitle: 'Use of cookies',
    cookieContent: `
<p>About cookie</p>

<p>All web pages on this website use cookies. By using this website and agreeing to this policy, you authorize the use of cookies in accordance with the terms of this policy.</p>

<p>Cookies are transmitted by web servers to web browsers and stored by the latter.</p>

<p>The information is then sent back to the server each time the browser requests a page from the server. This allows the web server to identify and track web browsers.</p>

<p>There are two main types of cookies: session cookies and persistent cookies.</p>

<ul>
  <li>- Session cookies are deleted from your computer as soon as you close your browser.</li>
  <li>- Persistent cookies are stored on your computer until they are deleted or expire.</li>
</ul>

<p>Cookie</p>

<p>The use of cookies on this website is for the following purposes:</p>

<ul>
  <li>- collecting data about the user through the means of analitics;</li>
  <li>- enabling the publication of content on social networks;</li>
  <li>- displaying recommendations for the user if he or she has already visited this website;</li>
</ul>
`,
  },
  ru: {
    admin: 'Админ',
    add: 'Добавить',
    added: 'Добавлено',
    addedToCart: 'Добавлено в корзину',
    addedToFavorites: 'Добавлено в избранные',
    excludedFromFavorites: 'Исключено из избранных',
    addedToCompare: 'Добавлено в сравнение',
    excludedFromCompare: 'Исключено из сравнения',
    dashboard: 'Главная панель',
    login: 'Вход',
    registration: 'Регистрация',
    home: 'Главная',
    shop: 'Магазин',
    products: 'Товары',
    tea: 'Чай',
    coffee: 'Кофе',
    favorites: 'Избранные',
    compare: 'Сравнение',
    cart: 'Корзина',
    blog: 'Блог',
    club: 'Клуб',
    account: 'Аккаунт',
    lk: 'Личный кабинет',
    search: 'Поиск',
    logout: 'Выход',
    darkTheme: 'Тёмная тема',
    lightTheme: 'Светлая тема',
    sorting: 'Сортировка',
    new: 'Новые',
    pop: 'Популярные',
    priceAsc: 'Возрастание цены',
    priceDesc: 'Убывание цены',
    required: 'Обязательно',
    title: 'Заголовок',
    description: 'Описание',
    inStock: 'В наличии',
    ended: 'Закончился',
    volume: 'Объём',
    price: 'Цена',
    image: 'Изображение',
    images: 'Изображения',
    save: 'Сохранить',
    delete: 'Удалить',
    newProduct: 'Новый товар',
    maxSize: 'Максимальный размер',
    MaxLimit: 'Максимальное количество',
    more0: 'Нужно больше 0',
    published: 'Опубликован',
    updateProduct: 'Обновление товара',
    reviews: 'Отзывы',
    review: 'Отзыв',
    homeTitle: 'Международное сообщество',
    homeSubTitle: 'Мы объединяемся и становимся сильнее',
    homeDescription:
      'Добро пожаловать в сообщество ONE. Здесь нас интересует забота о здоровье, красоте и долголетии. Все пользователи имеют доступ к таким сервисам, как интернет-магазин, блог, социальная сеть. С каждым днем нас становится больше. Мы будем рады видеть вас в сообществе и помочь вам в достижении ваших целей.',
    policy: 'Политика конфиденциальности',
    cookies: 'Использование файлов cookie',
    quantity: 'Количество',
    cost: 'Стоимость',
    empty: 'Пусто',
    email: 'Email',
    password: 'Пароль',
    send: 'Отправить',
    min8: 'Минимум 8 символов',
    max32: 'Максимум 32 символа',
    dontAccount: 'Нет аккаунта?',
    haveAccount: 'Есть аккаунт?',
    invalidCredentials: 'Неверные учетные данные',
    maximum: 'Максимум',
    minimum: 'Минимум',
    profile: 'Профиль',
    choose: 'Выбрать',
    sentReview: 'Отзыв отправлен на модерацию',
    globalError: 'Что-то пошло не так, попробуйте позже',
    rating: 'Рейтинг',
    yourRating: 'Ваш рейтинг',
    unrated: 'Без рейтинга',
    onlyAuthorized: 'Доступно только авторизованным',
    text: 'Текст',
    date: 'Дата',
    status: 'Статус',
    moderation: 'Модерация',
    approved: 'Одобрено',
    notApproved: 'Не одобрено',
    updated: 'Обновлено',
    yes: 'Да',
    no: 'Нет',
    category: 'Категория',
    pieces: 'Штуки',
    grams: 'Граммы',
    kilograms: 'Килограммы',
    volumeMeasurement: 'Измерение объёма',
    milliliters: 'Миллилитры',
    liters: 'Литры',
    noReviews: 'Отзывов нет, напишите первый!',
    policyTitle: 'Политика конфиденциальности',
    policyContent: `
    
<p>Все лица, заполнившие на данном сайте сведения, составляющие персональные данные, а также разместившие иную информацию указанными действиями, подтверждают свое согласие на обработку персональных данных и их передачу оператору обработки персональных данных.</p>

<p>Под персональными данными Гражданина понимаются следующие сведения: общие сведения (имя и адрес электронной почты, номер телефона).</p>

<p>Гражданин, принимая настоящее Соглашение, выражает свою заинтересованность и полное согласие на то, что обработка его персональных данных может включать в себя следующие действия: сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение), использование, уничтожение.</p>

<p>Гражданин гарантирует: предоставленная им информация является полной, точной и достоверной; при предоставлении информации не нарушается законные права и интересы третьих лиц; вся предоставленная информация заполняется Гражданином лично в отношении себя.</p>`,
    cookieTitle: 'Использование cookies',
    cookieContent: `
<p>О cookie</p>

<p>Все веб-страницы на этом сайте используют файлы cookie. Используя этот веб-сайт и соглашаясь с этой политикой, вы разрешаете использование файлов cookie в соответствии с условиями этой политики.</p>

<p>Файлы cookie передаются веб-серверами веб-браузерам и сохраняются последними.</p>

<p>Затем информация отправляется обратно на сервер каждый раз, когда браузер запрашивает страницу с сервера. Это позволяет веб-серверу идентифицировать и отслеживать веб-браузеры.</p>

<p>Существует два основных типа файлов cookie: сеансовые файлы cookie и постоянные файлы cookie.</p>

<ul>
  <li>- Сеансовые файлы cookie удаляются с вашего компьютера, как только вы закрываете браузер.</li>
  <li>- Постоянные файлы cookie хранятся на вашем компьютере до тех пор, пока они не будут удалены или не истечет срок их действия.</li>
  <li>- отображение рекомендаций для пользователя, если он уже посещал данный сайт;</li>
</ul>

<p>Cookie</p>

<p>Использование файлов cookie на этом веб-сайте предназначено для следующих целей:</p>

<ul>
  <li>- сбор данных о пользователе средствами аналитики;</li>
  <li>- возможность публикации контента в социальных сетях;</li>
  <li>- отображение рекомендаций для пользователя, если он уже посещал данный сайт;</li>
</ul>
`,
  },
}

export type TranslationKeys = keyof (typeof translate)['en']
