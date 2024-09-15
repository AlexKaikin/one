'use client'

import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toFormData } from 'axios'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { MessageService } from '@/services'
import { useTranslation } from '@/store'
import { CreateMessage } from '@/types'
import { Form, FormTextarea, Icon, IconButton, useNotify } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { TriggersContext, TriggersContextType } from '../../context'
import styles from './CreateMessageForm.module.css'

const schema = z.object({
  sender: z.string(),
  chat: z.string(),
  read: z.string().array(),
  text: z
    .string({ required_error: 'Enter your post' })
    .min(1, { message: 'Enter your post' }),
})

export function CreateMessageForm({ userId }: { userId: string }) {
  const { setIsScrollToLastMessage } = useContext(
    TriggersContext
  ) as TriggersContextType
  const searchParams = useSearchParams()
  const { t } = useTranslation()
  const { notify } = useNotify()

  const formMethods = useForm<any>({
    defaultValues: {
      text: '',
      sender: userId,
      chat: searchParams.get('chat'),
      read: [userId],
    },
    resolver: zodResolver(schema),
  })

  const { reset, watch } = formMethods

  const handleSubmit = async (data: any) => {
    try {
      await MessageService.create(toFormData(data) as unknown as CreateMessage)

      setIsScrollToLastMessage(true)
      reset()
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  const onKeyDown = (value: any) => {
    if (value.key === 'Enter' && !value.shiftKey) {
      value.preventDefault()
      formMethods.handleSubmit(handleSubmit)()
    }
  }

  return (
    <Form id="messageForm" formMethods={formMethods} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <FormTextarea
          name="text"
          placeholder={t('new') + '...'}
          onKeyDown={onKeyDown}
        />

        {!!watch('text').length && (
          <div className={styles.control}>
            <IconButton color="primary" type="submit">
              <Icon name="send" width={16} height={16} />
            </IconButton>
          </div>
        )}
      </div>
    </Form>
  )
}
