'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { TranslationKeys } from '@/langs'
import { useTranslation } from '@/store'
import { Post } from '@/types'
import { Icon, Stack, Typography } from '@/ui'
import styles from './PostPreview.module.css'

export function PostPreview({ post }: { post: Post }) {
  const { id, title, imageUrls, createdAt, category, viewsCount } = post
  const { t, tAPI } = useTranslation()
  const url = imageUrls[0]

  return (
    <Link href={`/blog/post/${id}`} className={styles.card}>
      <div className={styles.imgContainer}>
        <Image
          fill
          priority
          src={url}
          alt={title}
          sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={styles.img}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography variant="h4" tag="h2">
            {tAPI('title', post)}
          </Typography>
        </div>

        <div className={styles.meta}>
          <Stack flexDirection="row" alignItems="center" spacing={0.5}>
            <Icon name="folder" width={16} height={16} />{' '}
            {t(category as TranslationKeys)}
          </Stack>

          <Stack flexDirection="row" alignItems="center" spacing={0.5}>
            <Icon name="calendar" width={16} height={16} />{' '}
            {dayjs(createdAt).format('DD.MM.YYYY')}
          </Stack>

          <Stack flexDirection="row" alignItems="center" spacing={0.5}>
            <Icon name="eye" width={16} height={16} /> {viewsCount}
          </Stack>
        </div>

        <div className={styles.info}>
          {tAPI('text', post)
            .slice(0, 140)
            .concat('...')
            .split('\n')
            .map((p, i) => (
              <Typography key={i} variant="p">
                {p}
              </Typography>
            ))}
        </div>
      </div>
    </Link>
  )
}
