'use client'

import { ReactNode, useEffect } from 'react'
import {
  useCart,
  useCompareProducts,
  useFavoritePosts,
  useFavoriteProducts,
  useTranslation,
} from '@/store'

export function InitializationProvider({ children }: { children: ReactNode }) {
  const { getFavoriteProducts } = useFavoriteProducts()
  const { getFavoritePosts } = useFavoritePosts()
  const { getCompare } = useCompareProducts()
  const { getLang } = useTranslation()
  const { getCart } = useCart()

  useEffect(() => {
    getFavoriteProducts()
    getFavoritePosts()
    getCompare()
    getLang()
    getCart()
  }, [getCart, getCompare, getFavoriteProducts, getFavoritePosts, getLang])

  return <>{children}</>
}
