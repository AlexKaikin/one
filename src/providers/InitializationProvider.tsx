'use client'

import { ReactNode, useEffect } from 'react'
import {
  useCart,
  useCompareProducts,
  useFavoriteProducts,
  useTranslation,
} from '@/store'

export function InitializationProvider({ children }: { children: ReactNode }) {
  const { getFavoriteProducts } = useFavoriteProducts()
  const { getCompare } = useCompareProducts()
  const { getLang } = useTranslation()
  const { getCart } = useCart()

  useEffect(() => {
    getFavoriteProducts()
    getCompare()
    getLang()
    getCart()
  }, [getCart, getCompare, getFavoriteProducts, getLang])

  return <>{children}</>
}
