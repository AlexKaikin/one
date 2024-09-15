'use client'

import { usePathname } from 'next/navigation'
import { SCREEN_SIZES } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { Aside } from '@/ui'

export function RightSidebar() {
  const pathname = usePathname()
  const { width } = useWindowDimensions()

  if (pathname.includes('messenger')) {
    return null
  }

  if (width && width < SCREEN_SIZES.MD) {
    return null
  }

  return <Aside> </Aside>
}
