import dayjs from 'dayjs'
import Image from 'next/image'
import defautAvatar from '@/assets/images/user/defaultAvatar.png'
import { Comment as CommentType } from '@/types'
import { Stack } from '@/ui'
import styles from './Comment.module.css'

export function Comment({ comment }: { comment: CommentType }) {
  const { text, user } = comment
  return (
    <Stack flexDirection="row" spacing={2} className={styles.comment}>
      <div className={styles.imgContainer}>
        <Image
          src={user.profile.avatarUrl || defautAvatar}
          width={70}
          height={70}
          alt="avatar"
          className={styles.img}
        />
      </div>

      <Stack flexDirection="column" spacing={1}>
        <Stack spacing={1}>
          {!!user.firstName.length ? user.firstName : user.email}{' '}
          <div className={styles.date}>
            {dayjs(new Date(user.createdAt)).format('H:mm, DD.MM.YYYY')}
          </div>
        </Stack>

        {text}
      </Stack>
    </Stack>
  )
}
