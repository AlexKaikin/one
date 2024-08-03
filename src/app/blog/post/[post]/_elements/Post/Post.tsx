'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import { useFavoritePosts, useTranslation } from '@/store'
import { Comment, Post as PostType } from '@/types'
import { Icon, IconButton, Stack, Typography } from '@/ui'
import styles from './Post.module.css'
import { TranslationKeys } from '@/langs'

type Props = { post: PostType }

export function Post({ post }: Props) {
  const { toggleFavorite, favoritesItems } = useFavoritePosts()
  const { t, tAPI } = useTranslation()
  const findFavorite = favoritesItems.find(item => item.id === post.id)
  const { title, text, category, viewsCount, createdAt, imageUrls } = post

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Typography variant="h1" tag="h1">
          {tAPI('title', post)}
        </Typography>
        <Stack flexDirection="row" spacing={2}>
          <div className={styles.meta}>
            <Stack flexDirection="row" alignItems="center" spacing={0.5}>
              <Icon name="folder" width={16} height={16} />{' '}
              {t(category as TranslationKeys)}
            </Stack>

            <Stack flexDirection="row" alignItems="center" spacing={0.5}>
              <Icon name="calendar" width={16} height={16} />{' '}
              {dayjs(createdAt).format('H:mm, DD.MM.YYYY')}
            </Stack>

            <Stack flexDirection="row" alignItems="center" spacing={0.5}>
              <Icon name="eye" width={16} height={16} /> {viewsCount}
            </Stack>
          </div>

          <Stack flexDirection="row" alignItems="center" spacing={5}>
            <IconButton
              color={findFavorite ? 'primary' : 'secondary'}
              onClick={() => toggleFavorite(post)}
            >
              <Icon name="bookmark" width={16} height={16} />
            </IconButton>
          </Stack>
        </Stack>

        <div className={styles.imgContainer}>
          <Image
            fill
            sizes="(max-width: 1800px) 50vw"
            src={imageUrls[0]}
            alt={title}
            className={styles.img}
          />
        </div>

        <div>
          {tAPI('text', post).split('\n').map((p, i) => (
            <Typography key={i} variant="p">
              {p}
            </Typography>
          ))}
        </div>
        {/* <Comments postId={_id} comments={comments} /> */}
      </div>
    </div>
  )
}
