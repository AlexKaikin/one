'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Review as ReviewType } from '@/types'
import { ModerationStatuses } from '@/entities'
import { ReviewService } from '@/services'
import { useTranslation } from '@/store'
import {
  Button,
  Rating,
  Select,
  SelectOption,
  Stack,
  Textarea,
  useNotify,
} from '@/ui'
import styles from './Review.module.css'

type Props = {
  review: ReviewType
  editMode?: boolean
}

export function Review({ review, editMode }: Props) {
  const [status, setStatus] = useState(review.status)
  const router = useRouter()
  const { t } = useTranslation()
  const { notify } = useNotify()
  const defaultRating =
    review.rating > 0 ? <Rating value={review.rating} /> : <>{t('unrated')}</>

  const handleSubmit = async () => {
    try {
      await ReviewService.update(review.id, { status } as ReviewType)
      router.refresh()
      notify({ type: 'info', message: t('updated') })
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  return (
    <div className={styles.form}>
      <Textarea value={review.body} rows={5} label={t('review')} readOnly />

      <p>
        {t('date')}:{' '}
        {dayjs(new Date(review.createdAt)).format('H:mm, DD.MM.YYYY')}
      </p>
      <p>
        {t('product')}:{' '}
        <Link href={`/shop/product/${review.product.id}`}>
          {review.product.title}
        </Link>
      </p>
      {editMode && (
        <p>
          {t('user')}:{' '}
          <Link href={`/admin/users/${review.user.id}`}>
            {review.user.lastName} {review.user.firstName}
          </Link>
        </p>
      )}

      <Stack spacing={1}>
        {t('rating')}: {defaultRating}
      </Stack>

      <Stack flexDirection="column" spacing={2}>
        <Select
          label={`${t('status')}: `}
          defaultSelectValue={t(review.status)}
          onSelectChange={setStatus}
          readOnly={!editMode}
        >
          <SelectOption value={ModerationStatuses.moderation}>
            {t(ModerationStatuses.moderation)}
          </SelectOption>
          <SelectOption value={ModerationStatuses.approved}>
            {t(ModerationStatuses.approved)}
          </SelectOption>
          <SelectOption value={ModerationStatuses.notApproved}>
            {t(ModerationStatuses.notApproved)}
          </SelectOption>
        </Select>
      </Stack>

      {editMode && (
        <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
          <Button type="submit" onClick={handleSubmit}>
            {t('save')}
          </Button>
        </Stack>
      )}
    </div>
  )
}
