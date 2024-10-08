import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/configs'

export const metadata: Metadata = {
  title: 'Registration',
  description: 'Generated by create next app',
}

export default async function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return redirect('/account')
  }

  return children
}
