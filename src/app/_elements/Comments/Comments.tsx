'use client'

import dayjs from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '@/store'
import { Comment } from '@/types'
import { Table, TableCell, TableRow } from '@/ui'

export function Comments({ comments }: { comments: Comment[] }) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const router = useRouter()
  const path = pathname.split('/')[1]

  if (!comments.length) return t('empty')

  return (
    <Table>
      <TableRow>
        <TableCell>{t('text')}</TableCell>
        <TableCell>{t('date')}</TableCell>
        <TableCell>{t('status')}</TableCell>
      </TableRow>

      {comments.map(comment => (
        <TableRow
          key={comment.id}
          onClick={() => router.push(`/${path}/comments/${comment.id}`)}
        >
          <TableCell>{comment.text}</TableCell>
          <TableCell>
            {dayjs(new Date(comment.createdAt)).format('H:mm, DD.MM.YYYY')}
          </TableCell>
          <TableCell>{t(comment.status)}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
