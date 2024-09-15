if (
  !process.env.NEXT_PUBLIC_PUSHER_APP_ID ||
  !process.env.NEXT_PUBLIC_PUSHER_KEY ||
  !process.env.NEXT_PUBLIC_PUSHER_SECRET ||
  !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
  throw new Error('Переменные окружения не найдены.')
}

export const PUSHER_APP_ID = process.env.NEXT_PUBLIC_PUSHER_APP_ID
export const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY
export const PUSHER_APP_SECRET = process.env.NEXT_PUBLIC_PUSHER_SECRET
export const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER

export const SCREEN_SIZES = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
}

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export enum USER_STATUSES {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}

export enum PROFILE_TYPES {
  GROUP = 'group',
  USER = 'user',
}

export enum MODERATION_STATUSES {
  MODERATION = 'moderation',
  APPROVED = 'approved',
  NOT_APPROVED = 'notApproved',
}

export enum MEASUREMENTS {
  PIECES = 'pieces',
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
  MILLILITERS = 'milliliters',
  LITERS = 'liters',
}

export enum ORDER_STATUSES {
  AWAITING_PAYMENT = 'awaiting payment',
  CANCEL = 'cancel',
  PAID = 'paid',
  DELIVERY = 'delivery',
  DELIVERED = 'delivered',
}

export enum ROUTES {
  SHOP = 'shop',
  PRODUCTS = 'products',
  CART = 'cart',
  REVIEWS = 'reviews',
  ORDERS = 'orders',

  BLOG = 'blog',
  POSTS = 'posts',
  COMMENTS = 'comments',

  ACCOUNT = 'account',
  USERS = 'users',

  CLUB = 'club',
  MESSAGES = 'messages',
  CHATS = 'chats',
  PROFILES = 'profiles',
  NOTES = 'notes',

  ADMIN = 'admin',
}
