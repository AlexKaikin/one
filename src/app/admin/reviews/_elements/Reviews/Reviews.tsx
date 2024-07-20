'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { Review } from '@/app/api/reviews/model'
import { useTranslation } from '@/store'
import { Table, TableCell, TableRow } from '@/ui'

export function Reviews({ reviews }: { reviews: Review[] }) {
  const { t } = useTranslation()
  const router = useRouter()

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
          onClick={() => router.push(`/admin/reviews/${review.id}`)}
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
