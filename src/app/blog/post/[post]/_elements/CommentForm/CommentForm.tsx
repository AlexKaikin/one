'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { CommentService } from '@/services'
import { useTranslation } from '@/store'
import { CreateComment } from '@/types'
import { Button, Form, FormTextarea, Stack, useNotify } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './CommentForm.module.css'

function getSchema(t: Function) {
  const required_error = t('required')

  const schema = z.object({
    text: z.string({ required_error }).min(1, { message: required_error }),
    post: z.string(),
    user: z.string(),
  })

  return schema
}

type Props = { postId: string; userId: string }

export function CommentForm({ postId, userId }: Props) {
  const { t } = useTranslation()
  const { notify } = useNotify()
  const router = useRouter()

  const formMethods = useForm<CreateComment>({
    defaultValues: { text: '', post: postId, user: userId },
    resolver: zodResolver(getSchema(t)),
  })

  const { reset, formState } = formMethods
  const { isDirty } = formState

  const handleSubmit = async (data: CreateComment) => {
    try {
      await CommentService.create(data)
      notify({ type: 'info', message: t('sentReview') })
      reset()

      router.refresh()
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  return (
    <Form
      id="commentForm"
      formMethods={formMethods}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <FormTextarea name="text" rows={5} label={t('comment')} />

      <Stack flexDirection="row" justifyContent="space-between" spacing={2}>
        <Button disabled={!isDirty} type="submit">
          {t('send')}
        </Button>
      </Stack>
    </Form>
  )
}
