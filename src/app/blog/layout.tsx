import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { BlogMenu, Sorting } from './_elements'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Generated by create next app',
}

export default function BlogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <BlogMenu />
        <Sorting />
      </div>
      {children}
    </div>
  )
}
