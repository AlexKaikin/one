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
  },
  ru: {
    admin: 'Админ',
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
  },
}

export type TranslationKeys = keyof (typeof translate)['en']