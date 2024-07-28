'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { ReviewService } from '@/services'
import { useTranslation } from '@/store'
import { CreateReview } from '@/types'
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
    product: z.string(),
    user: z.string(),
  })

  return schema
}

type Props = { productId: string; userId: string }

export function ReviewForm({ productId, userId }: Props) {
  const { t } = useTranslation()
  const { notify } = useNotify()
  const router = useRouter()
  const [defaultRating, setDefaultRating] = useState(<>{t('choose')}</>)

  const formMethods = useForm<CreateReview>({
    defaultValues: { body: '', rating: -1, product: productId, user: userId },
    resolver: zodResolver(getSchema(t)),
  })

  const { setValue, reset, formState } = formMethods
  const { isDirty, errors } = formState

  const handleChangeRaiting = useCallback(
    (number: number) => {
      setValue('rating', number, { shouldValidate: true, shouldDirty: true })
      setDefaultRating(
        number > 0 ? <Rating value={number} /> : <>{t('unrated')}</>
      )
    },
    [setValue, t]
  )

  const handleSubmit = async (data: CreateReview) => {
    try {
      await ReviewService.create(data)
      notify({ type: 'info', message: t('sentReview') })
      reset()
      setDefaultRating(<>{t('choose')}</>)
      router.refresh()
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

      <Stack flexDirection="column">
        <Select
          label={`${t('yourRating')}: `}
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
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
        <Button disabled={!isDirty} type="submit">
          {t('send')}
        </Button>
      </Stack>
    </Form>
  )
}
