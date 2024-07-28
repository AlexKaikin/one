'use client'

import { create } from 'zustand'
import { getLocalStorage } from '@/helpers'
import { Product } from '@/types'

export type Compare = {
  compareItems: Product[]
  getCompare: () => void
  toggleCompare: (product: Product) => void
}

export const useCompareProducts = create<Compare>()(set => ({
  compareItems: [],
  getCompare: () =>
    set(() => ({ compareItems: getLocalStorage('compare') || [] })),
  toggleCompare: product => {
    set(() => ({
      compareItems: handleToggleCompare(product),
    }))
  },
}))

function handleToggleCompare(product: Product) {
  const compareItems: Product[] = getLocalStorage('compare') || []
  const findProduct = compareItems.find(item => item.id === product.id)

  if (!findProduct) {
    compareItems.push(product)
    localStorage.setItem('compare', JSON.stringify(compareItems))

    return [...compareItems]
  } else {
    compareItems.splice(compareItems.indexOf(findProduct), 1)
    localStorage.setItem('compare', JSON.stringify(compareItems))

    return [...compareItems]
  }
}
