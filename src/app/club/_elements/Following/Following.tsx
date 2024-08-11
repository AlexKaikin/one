'use client'

import Link from 'next/link'
import { useTranslation } from '@/store'
import { User } from '@/types'
import { Stack } from '@/ui'
import styles from './Following.module.css'

export function Following({ user }: { user: User }) {
  const { t } = useTranslation()

  return (
    <div className={styles.following}>
      <Link href="/club">
        <Stack flexDirection="column" alignItems="center">
          <span>{user.profile.followers.length}</span>
          <span className={styles.label}>{t('followers')}</span>
        </Stack>
      </Link>

      <Link href="/club">
        <Stack flexDirection="column" alignItems="center">
          <span>{user.profile.following.length}</span>
          <span className={styles.label}>{t('following')}</span>
        </Stack>
      </Link>

      <Link href="/club">
        <Stack flexDirection="column" alignItems="center">
          <span>{user.profile.following.length}</span>
          <span className={styles.label}>{t('groups')}</span>
        </Stack>
      </Link>
    </div>
  )
}
