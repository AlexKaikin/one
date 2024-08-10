'use client'

import Link from 'next/link'
import { User } from '@/types'
import { Stack } from '@/ui'
import styles from './Following.module.css'

export function Following({ user }: { user: User }) {
  return (
    <div className={styles.following}>
      <Link href="/club">
        <Stack flexDirection="column" alignItems="center">
          <span>{user.followers.length}</span>
          <span className={styles.label}>followers</span>
        </Stack>
      </Link>

      <Link href="/club">
        <Stack flexDirection="column" alignItems="center">
          <span>{user.following.length}</span>
          <span className={styles.label}>followers</span>
        </Stack>
      </Link>

      <Link href="/club">
        <Stack flexDirection="column" alignItems="center">
          <span>{user.following.length}</span>
          <span className={styles.label}>groups</span>
        </Stack>
      </Link>
    </div>
  )
}
