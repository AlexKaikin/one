'use client'

import { Icon } from '@/ui'
import styles from './Logo.module.css'

export function Logo() {
  return (
    <div className={styles.logo}>
      <Icon name="logo" /> ONE
    </div>
  )
}
