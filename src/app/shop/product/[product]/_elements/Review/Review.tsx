import dayjs from 'dayjs'
import Image from 'next/image'
import defautAvatar from '@/assets/images/user/defaultAvatar.png'
import { Review as ReviewType } from '@/types'
import { Rating, Stack } from '@/ui'
import styles from './Review.module.css'

export function Review({ review }: { review: ReviewType }) {
  const { body, rating, user } = review
  return (
    <Stack flexDirection="row" spacing={2} className={styles.review}>
      <div className={styles.imgContainer}>
        <Image
          src={user.avatarUrl || defautAvatar}
          width={70}
          height={70}
          alt="avatar"
        />
      </div>

      <Stack flexDirection="column" spacing={1}>
        <Stack spacing={1}>
          {!!user.firstName.length ? user.firstName : user.email}{' '}
          <div className={styles.date}>
            {dayjs(new Date(user.createdAt)).format('H:mm, DD.MM.YYYY')}
          </div>
        </Stack>

        <Rating value={rating} />

        {body}
      </Stack>
    </Stack>
  )
}
