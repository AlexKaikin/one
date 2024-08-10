'use client'

import { SCREEN_SIZES } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { DesktopMenu } from '../DesktopMenu/DesktopMenu'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import styles from './Navigation.module.css'

export function Navigation() {
  const { width } = useWindowDimensions()

  if (!width) return null

  return (
    <div className={styles.navigation}>
      {width < SCREEN_SIZES.LG ? <MobileMenu /> : <DesktopMenu />}
    </div>
  )
}
