'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SCREEN_LG } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { Icon, List, Menu, MenuItem, SubMenu } from '@/ui'
import { DesktopMenu } from '../DesktopMenu/DesktopMenu'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import { SignOutLink } from '../SignOutLink/SignOutLink'
import styles from './Navigation.module.css'

export function Navigation() {
  const { width } = useWindowDimensions()

  if (!width) return null

  return (
    <div className={styles.navigation}>
      {width < SCREEN_LG ? <MobileMenu /> : <DesktopMenu />}
      {/* <MobileMenu /> */}
    </div>
  )
}
