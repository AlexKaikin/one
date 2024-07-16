'use client'

import { usePathname } from 'next/navigation'
import { Icon } from '@/ui'
import { Sorting } from '../Sorting/Sorting'
import styles from './SortAndFilter.module.css'

export function SortAndFilter() {
  const pathname = usePathname()
  const isCatalog = !pathname
    .split('/')
    .some(item => ['product', 'cart', 'compare', 'favorites'].includes(item))

  if (!isCatalog) return null

  return (
    <div className={styles.group}>
      <Sorting />

      <div className={styles.groupItem}>
        <Icon name="filter" width={25} height={25} /> Filter
      </div>
    </div>
  )
}
