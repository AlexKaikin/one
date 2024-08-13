'use client'

import { SCREEN_SIZES } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { Aside } from '@/ui'

export function RightSidebar() {
  const { width } = useWindowDimensions()

  if (width && width < SCREEN_SIZES.MD) {
    return null
  }

  return <Aside> </Aside>
}
