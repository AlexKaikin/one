import type { Metadata } from 'next'
import { Aside, Widget } from '@/ui'
import { AdminMenu } from './_elements'

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Generated by create next app',
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Aside>
        <AdminMenu />
      </Aside>
      {children}
    </>
  )
}
