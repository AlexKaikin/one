'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useTranslation } from '@/store'

export function SignOutLink() {
  const { t } = useTranslation()

  return (
    <Link href={'#'} onClick={() => signOut({ callbackUrl: '/login' })}>
      {t('logout')}
    </Link>
  )
}
