'use client'

import { NoticeProvider } from '@/ui'
import { AuthProvider } from './AuthProvider'
import { InitializationProvider } from './InitializationProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InitializationProvider>
        <NoticeProvider>{children}</NoticeProvider>
      </InitializationProvider>
    </AuthProvider>
  )
}
