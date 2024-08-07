import type { Metadata } from 'next'
import { ShopMenu, SortAndFilter } from './_elements'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Generated by create next app',
}

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <ShopMenu />
        <SortAndFilter />
      </div>
      {children}
    </div>
  )
}
