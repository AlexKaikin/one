'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ModerationStatuses } from '@/entities'
import { CommentService } from '@/services'
import { useTranslation } from '@/store'
import { Comment as CommentType } from '@/types'
import {
  Button,
  Select,
  SelectOption,
  Stack,
  Textarea,
  useNotify,
} from '@/ui'
import styles from './Comment.module.css'

type Props = {
  comment: CommentType
  editMode?: boolean
}

export function Comment({ comment, editMode }: Props) {
  const [status, setStatus] = useState(comment.status)
  const router = useRouter()
  const { t } = useTranslation()
  const { notify } = useNotify()

  const handleSubmit = async () => {
    try {
      await CommentService.update(comment.id, { status } as CommentType)
      router.refresh()
      notify({ type: 'info', message: t('updated') })
    } catch (error) {
      notify({ type: 'error', message: t('globalError') })
    }
  }

  return (
    <div className={styles.form}>
      <Textarea value={comment.text} rows={5} label={t('comment')} readOnly />

      <p>
        {t('date')}:{' '}
        {dayjs(new Date(comment.createdAt)).format('H:mm, DD.MM.YYYY')}
      </p>
      <p>
        {t('post')}:{' '}
        <Link href={`/blog/post/${comment.post.id}`}>{comment.post.title}</Link>
      </p>
      {editMode && (
        <p>
          {t('user')}:{' '}
          <Link href={`/admin/users/${comment.user.id}`}>
            {comment.user.lastName} {comment.user.firstName}
          </Link>
        </p>
      )}

      <Stack flexDirection="column" spacing={2}>
        <Select
          label={`${t('status')}: `}
          defaultSelectValue={t(comment.status)}
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
