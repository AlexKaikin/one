import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { cookies } from 'next/headers'
import { Providers } from '@/providers'
import { Layout } from '@/ui'
import '../assets/styles/globals.css'
import { Header } from './_elements'

const font = Jost({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'One',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = cookies().get('theme')

  return (
    <html lang="en" data-theme={theme?.value || 'light'}>
      <body className={font.className}>
        <Providers>
          <Suspense>
            <Header />
          </Suspense>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
