'use client'

import dayjs from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import { Order } from '@/app/api/orders/model'
import { TranslationKeys } from '@/langs'
import { useTranslation } from '@/store'
import { Table, TableCell, TableRow } from '@/ui'

export function Orders({ orders }: { orders: Order[] }) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const router = useRouter()
  const path = pathname.split('/')[1]

  if (!orders.length) return t('empty')

  return (
    <Table>
      <TableRow>
        <TableCell>№</TableCell>
        <TableCell>{t('date')}</TableCell>
        <TableCell>{t('status')}</TableCell>
      </TableRow>

      {orders.map(({ id, createdAt, status }) => (
        <TableRow key={id} onClick={() => router.push(`/${path}/orders/${id}`)}>
          <TableCell>{dayjs(createdAt).format('YYYYMMDDHHmmssSSS')}</TableCell>

          <TableCell>
            {dayjs(new Date(createdAt)).format('H:mm, DD.MM.YYYY')}
          </TableCell>

          <TableCell>{t(status as TranslationKeys)}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
