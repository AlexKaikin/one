'use client'

import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import Link from 'next/link'
import { z } from 'zod'
import { Review } from '@/app/api/reviews/model'
import { ReviewStatuses } from '@/entities'
import { ReviewService } from '@/services'
import { useTranslation } from '@/store'
import {
  Button,
  Form,
  FormTextarea,
  Rating,
  Select,
  SelectOption,
  Stack,
  useNotify,
} from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './ReviewForm.module.css'

function getSchema(t: Function) {
  const required_error = t('required')

  const schema = z.object({
    body: z.string({ required_error }).min(1, { message: required_error }),
    rating: z.number({ required_error }).min(0, { message: required_error }),
    product: z
      .object({ id: z.string(), title: z.string() })
      .transform(({ id }) => id),
    user: z
      .object({ id: z.string(), lastName: z.string(), firstName: z.string() })
      .transform(({ id }) => id),
    status: z.string(),
  })

  return schema
}

export function ReviewForm({ review }: { review: Review }) {
  const { t } = useTranslation()
  const { notify } = useNotify()
  const defaultRating =
    review.rating > 0 ? <Rating value={review.rating} /> : <>{t('unrated')}</>

  const formMethods = useForm<Review>({
    defaultValues: { ...review },
    resolver: zodResolver(getSchema(t)),
  })

  const { setValue, reset, formState } = formMethods
  const { errors, isDirty } = formState

  const handleChangeRaiting = useCallback((number: number) => {
    setValue('rating', number, { shouldValidate: true, shouldDirty: true })
  }, [setValue])

  const handleChangeStatus = useCallback((value: ReviewStatuses) => {
    setValue('status', value, { shouldValidate: true, shouldDirty: true })
  }, [setValue])

  const handleSubmit = async (data: Review) => {
    try {
      const response = await ReviewService.update(review.id, data)
      notify({ type: 'info', message: t('updated') })
      reset(response.data)
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  return (
    <Form
      id="reviewForm"
      formMethods={formMethods}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <FormTextarea name="body" rows={5} label={t('review')} />

      <p>
        Created: {dayjs(new Date(review.createdAt)).format('H:mm, DD.MM.YYYY')}
      </p>
      <p>
        Product:{' '}
        <Link href={`/shop/product/${review.product.id}`}>
          {review.product.title}
        </Link>
      </p>
      <p>
        User:{' '}
        <Link href={`/admin/users/${review.user.id}`}>
          {review.user.lastName} {review.user.firstName}
        </Link>
      </p>

      <Stack flexDirection="column" spacing={2}>
        <Select
          label={`${t('rating')}: `}
          defaultSelectValue={defaultRating}
          onSelectChange={handleChangeRaiting}
          errorState={errors.rating}
        >
          <SelectOption value={0}>{t('unrated')}</SelectOption>
          <SelectOption value={5}>
            <Rating value={5} />
          </SelectOption>
          <SelectOption value={4}>
            <Rating value={4} />
          </SelectOption>
          <SelectOption value={3}>
            <Rating value={3} />
          </SelectOption>
          <SelectOption value={2}>
            <Rating value={2} />
          </SelectOption>
          <SelectOption value={1}>
            <Rating value={1} />
          </SelectOption>
        </Select>

        <Select
          label={`${t('status')}: `}
          defaultSelectValue={t(review.status)}
          onSelectChange={handleChangeStatus}
          errorState={errors.status}
        >
          <SelectOption value={ReviewStatuses.moderation}>
            {t(ReviewStatuses.moderation)}
          </SelectOption>
          <SelectOption value={ReviewStatuses.approved}>
            {t(ReviewStatuses.approved)}
          </SelectOption>
          <SelectOption value={ReviewStatuses.notApproved}>
            {t(ReviewStatuses.notApproved)}
          </SelectOption>
        </Select>
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
        <Button disabled={!isDirty} type="submit">
          {t('save')}
        </Button>
      </Stack>
    </Form>
  )
}
