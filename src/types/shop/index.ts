import { MEASUREMENTS, MODERATION_STATUSES } from '@/constants'
import { User } from '../account'

export type Product = {
  id: string
  title: string
  description: string
  price: number
  inStock: number
  volume: string
  volumeMeasurement: MEASUREMENTS
  ratingCount: number
  viewsCount: number
  rating: number
  imageUrls: string[]
  characteristics: {
    manufacturer: string
    country: string
    city: string
    year: number
  }
  category: string
  tags: string[]
  published: boolean
  translations: { ru: { title: string } }
  createdAt: string
  updatedAt: string
}

export type CartItem = {
  id: string
  title: string
  imageUrls: string[]
  price: number
  cost: number
  quantity: number
  inStock: number
  category: string
  description: string
  translations: { ru: { title: string } }
}

export type Order = {
  id: string
  name: string
  surname: string
  middleName: string
  region: string
  city: string
  street: string
  home: string
  apartment: string
  index: number
  cartItems: CartItem[]
  totalCost: number
  status: string
  createdAt: string
  updatedAt: string
  user: string
}

export type CreateOrder = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>

export type Review = {
  id: string
  body: string
  rating: number
  status: MODERATION_STATUSES
  user: User
  product: Product
  createdAt: string
  updatedAt: string
}

export type CreateReview = Omit<Review, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'product' | 'user'> & {
  product: string
  user: string
}
