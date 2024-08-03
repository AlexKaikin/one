'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/store'
import { Post } from '@/types'
import { Table, TableCell, TableRow } from '@/ui'

export function Posts({ posts }: { posts: Post[] }) {
  const { t, tAPI } = useTranslation()
  const router = useRouter()
  return (
    <Table>
      <TableRow>
        <TableCell>{t('title')}</TableCell>
        <TableCell>{t('date')}</TableCell>
        <TableCell>{t('published')}</TableCell>
      </TableRow>

      {posts.map(post => (
        <TableRow
          key={post.id}
          onClick={() => router.push(`/admin/posts/${post.id}`)}
        >
          <TableCell>{tAPI('title', post)}</TableCell>
          <TableCell>
            {dayjs(new Date(post.createdAt)).format('H:mm, DD.MM.YYYY')}
          </TableCell>
          <TableCell>{post.published ? t('yes') : t('no')}</TableCell>
        </TableRow>
      ))}
    </Table>
  )
}
