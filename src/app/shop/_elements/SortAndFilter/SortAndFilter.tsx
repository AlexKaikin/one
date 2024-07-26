'use client'

import { usePathname } from 'next/navigation'
import { Stack } from '@/ui'
import { Filter } from '../Filter/Filter'
import { Sorting } from '../Sorting/Sorting'

export function SortAndFilter() {
  const pathname = usePathname()
  const isCatalog = !pathname
    .split('/')
    .some(item => ['product', 'cart', 'compare', 'favorites'].includes(item))

  if (!isCatalog) return null

  return (
    <Stack flexDirection="row" alignItems="center" spacing={3}>
      <Sorting />
      <Filter />
    </Stack>
  )
}
