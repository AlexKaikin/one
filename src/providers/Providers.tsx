'use client'

import { NoticeProvider } from '@/ui'
import { AuthProvider } from './AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NoticeProvider>{children}</NoticeProvider>
    </AuthProvider>
  )
}
