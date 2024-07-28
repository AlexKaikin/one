'use client'

import dayjs from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import { Review } from '@/types'
import { useTranslation } from '@/store'
import { Table, TableCell, TableRow } from '@/ui'

export function Reviews({ reviews }: { reviews: Review[] }) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const router = useRouter()
  const path = pathname.split('/')[1]

  if (!reviews.length) return t('empty')

  return (
    <Table>
      <TableRow>
        <TableCell>{t('text')}</TableCell>
        <TableCell>{t('date')}</TableCell>
        <TableCell>{t('status')}</TableCell>
      </TableRow>

      {reviews.map(review => (
        <TableRow
          key={review.id}
          onClick={() => router.push(`/${path}/reviews/${review.id}`)}
        >
          <TableCell>{review.body}</TableCell>
          <TableCell>
            {dayjs(new Date(review.createdAt)).format('H:mm, DD.MM.YYYY')}
          </TableCell>
          <TableCell>{t(review.status)}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
