'use client'

import { ReactNode, useEffect } from 'react'
import { useTranslation } from '@/store'

export function InitializationProvider({ children }: { children: ReactNode }) {
  const { getLang } = useTranslation()

  useEffect(() => {
    getLang()
  }, [getLang])

  return <>{children}</>
}
