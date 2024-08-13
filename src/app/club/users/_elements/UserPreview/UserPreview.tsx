import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/assets/images/user/defaultAvatar.png'
import { User as UserType } from '@/types'
import styles from './UserPreview.module.css'

export function UserPreview({ user }: { user: UserType }) {
  const { id, avatarUrl, lastName, firstName } = user

  return (
    <Link href={`/club/users/${id}`} key={id} className={styles.user}>
      <div className={styles.imgContainer}>
        <Image
          fill
          src={avatarUrl || defaultAvatar}
          alt="avatar"
          className={styles.img}
        />
      </div>

      <div className={styles.name}>
        {firstName} {lastName}
      </div>
    </Link>
  )
}
