'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateReview } from '@/app/api/reviews/model';
import { ReviewService } from '@/services';
import { useTranslation } from '@/store';
import { Button, Form, FormInput, FormTextarea, Menu, MenuItem, Rating, Stack, useNotify } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ReviewForm.module.css';


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
  const [rating, setRatign] = useState(<>{t('choose')}</>)

  const formMethods = useForm<CreateReview>({
    defaultValues: { body: '', rating: -1, product: productId, user: userId },
    resolver: zodResolver(getSchema(t)),
  })

  const { setValue, reset } = formMethods

  function handleRaiting(number: number) {
    setValue('rating', number, { shouldValidate: true })
    setRatign(number > 0 ? <Rating value={number} /> : <>{t('unrated')}</>)
  }

  const handleSubmit = async (data: CreateReview) => {
    try {
      await ReviewService.create(data)
      notify({ type: 'info', message: t('sentReview') })
      reset()
      setRatign(<>{t('choose')}</>)
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
        <Stack isWide flexDirection="row" alignItems="center" spacing={1}>
          {t('yourRating')}:
          <Menu trigger={<Button variant="clean">{rating}</Button>}>
            <MenuItem>
              <Button variant="clean" onClick={() => handleRaiting(0)}>
                {t('unrated')}
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="clean" onClick={() => handleRaiting(5)}>
                <Rating value={5} />
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="clean" onClick={() => handleRaiting(4)}>
                <Rating value={4} />
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="clean" onClick={() => handleRaiting(3)}>
                <Rating value={3} />
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="clean" onClick={() => handleRaiting(2)}>
                <Rating value={2} />
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant="clean" onClick={() => handleRaiting(1)}>
                <Rating value={1} />
              </Button>
            </MenuItem>
          </Menu>
        </Stack>

        <FormInput type="hidden" name="rating" />
      </Stack>

      <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
        <Button type="submit">{t('send')}</Button>
      </Stack>
    </Form>
  )
}