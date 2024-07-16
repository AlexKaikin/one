'use client'

import Link from 'next/link'
import { useTranslation } from '@/store'
import styles from './Footer.module.css'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="#">{t('policy')}</Link>
        <Link href="#">{t('cookies')}</Link>
      </div>
    </footer>
  )
}
