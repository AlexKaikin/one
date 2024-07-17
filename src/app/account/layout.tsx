import type { Metadata } from 'next'
import { Aside } from '@/ui'
import { AccountMenu } from './_elements'

export const metadata: Metadata = {
  title: 'Account',
  description: 'Generated by create next app',
}

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Aside>
        <AccountMenu />
      </Aside>
      {children}
    </>
  )
}
