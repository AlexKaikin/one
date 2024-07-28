'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { TranslationKeys } from '@/langs'
import { useTranslation } from '@/store'
import { User } from '@/types'
import { Table, TableCell, TableRow } from '@/ui'

export function Users({ users }: { users: User[] }) {
  const { t } = useTranslation()
  const router = useRouter()

  if (!users.length) return t('empty')

  return (
    <Table>
      <TableRow>
        <TableCell>{t('email')}</TableCell>
        <TableCell>{t('name')}</TableCell>
        <TableCell>{t('date')}</TableCell>
        <TableCell>{t('role')}</TableCell>
      </TableRow>

      {users.map(({ id, email, lastName, firstName, role, createdAt }) => (
        <TableRow key={id} onClick={() => router.push(`/admin/users/${id}`)}>
          <TableCell>{email}</TableCell>
          <TableCell>
            {lastName} {firstName}
          </TableCell>
          <TableCell>
            {dayjs(new Date(createdAt)).format('H:mm, DD.MM.YYYY')}
          </TableCell>
          <TableCell>{t(role as TranslationKeys)}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
