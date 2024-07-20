'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Product } from '@/app/api/products/model'
import { useTranslation } from '@/store'
import { Table, TableCell, TableRow } from '@/ui'
import dayjs from 'dayjs'

export function Products({ products }: { products: Product[] }) {
  const { t, tAPI } = useTranslation()
  const router = useRouter()
  return (
    <Table>
      <TableRow>
        <TableCell>{t('title')}</TableCell>
        <TableCell>{t('date')}</TableCell>
        <TableCell>{t('published')}</TableCell>
      </TableRow>

      {products.map(product => (
        <TableRow
          key={product.id}
          onClick={() => router.push(`/admin/products/${product.id}`)}
        >
          <TableCell>{tAPI('title', product)}</TableCell>
          <TableCell>
            {dayjs(new Date(product.createdAt)).format('H:mm, DD.MM.YYYY')}
          </TableCell>
          <TableCell>{product.published ? t('yes') : t('no')}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
