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
  PROFILES = 'profiles',

  ADMIN = 'admin',
}
