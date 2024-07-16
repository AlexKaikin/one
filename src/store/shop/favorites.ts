'use client'

import { create } from 'zustand'
import { Product } from '@/app/api/products/model'
import { getLocalStorage } from '@/helpers'

export type Favorites = {
  favoritesItems: Product[]
  getFavoriteProducts: () => void
  toggleFavorite: (product: Product) => void
}

export const useFavoriteProducts = create<Favorites>()(set => ({
  favoritesItems: [],
  getFavoriteProducts: () =>
    set(() => ({ favoritesItems: getLocalStorage('favorites') })),
  toggleFavorite: product => {
    set(() => ({
      favoritesItems: handleToggleFavorite(product),
    }))
  },
}))

function handleToggleFavorite(product: Product) {
  const favoriteItems: Product[] = getLocalStorage('favorites') || []
  const findProduct = favoriteItems.find(item => item.id === product.id)

  if (!findProduct) {
    favoriteItems.push(product)
    localStorage.setItem('favorites', JSON.stringify(favoriteItems))

    return [...favoriteItems]
  } else {
    favoriteItems.splice(favoriteItems.indexOf(findProduct), 1)
    localStorage.setItem('favorites', JSON.stringify(favoriteItems))

    return [...favoriteItems]
  }
}
