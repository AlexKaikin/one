export enum Roles {
  admin = 'admin',
  user = 'user',
}

export enum UserStatuses {
  active = 'active',
  inactive = 'inactive',
  blocked = 'blocked',
}

export enum ReviewStatuses {
  moderation = 'moderation',
  approved = 'approved',
  notApproved = 'notApproved',
}

export enum Measurements {
  pieces = 'pieces',
  grams = 'grams',
  kilograms = 'kilograms',
  milliliters = 'milliliters',
  liters = 'liters',
}

export enum OrderStatuses {
  awaitingPayment = 'awaiting payment',
  cancel = 'cancel',
  paid = 'paid',
  delivery = 'delivery',
  delivered = 'delivered',
}
