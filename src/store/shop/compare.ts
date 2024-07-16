'use client'

import { create } from 'zustand'
import { Product } from '@/app/api/products/model'
import { getLocalStorage } from '@/helpers'

export type Compare = {
  compareItems: Product[]
  getCompare: () => void
  toggleCompare: (product: Product) => void
}

export const useCompareProducts = create<Compare>()(set => ({
  compareItems: [],
  getCompare: () => set(() => ({ compareItems: getLocalStorage('compare') })),
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
    // notify('Added for comparison')

    return [...compareItems]
  } else {
    compareItems.splice(compareItems.indexOf(findProduct), 1)
    localStorage.setItem('compare', JSON.stringify(compareItems))
    // toast.info('Excluded from the comparison')

    return [...compareItems]
  }
}
