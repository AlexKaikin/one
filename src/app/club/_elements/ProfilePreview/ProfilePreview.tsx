import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/assets/images/user/defaultAvatar.png'
import { PROFILE_TYPES } from '@/constants'
import { Profile } from '@/types'
import styles from './ProfilePreview.module.css'

export function ProfilePreview({ profile }: { profile: Profile }) {
  const { id, avatarUrl, companyName, user, type } = profile
  const typePath =
    type === PROFILE_TYPES.USER ? 'users' : 'groups'

  return (
    <Link href={`/club/${typePath}/${id}`} key={id} className={styles.user}>
      <div className={styles.imgContainer}>
        <Image
          fill
          src={avatarUrl || defaultAvatar}
          alt="avatar"
          className={styles.img}
        />
      </div>

      <div className={styles.name}>
        {type === PROFILE_TYPES.USER ? (
          <>
            {user.firstName} {user.lastName}
          </>
        ) : (
          companyName
        )}
      </div>
    </Link>
  )
}
