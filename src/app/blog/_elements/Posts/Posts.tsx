'use client'

import { useTranslation } from '@/store'
import { Post } from '@/types'
import { Pagination } from '@/ui'
import { PostPreview } from '../PostPreview/PostPreview'
import styles from './Posts.module.css'

type Props = {
  posts: Post[]
  totalCount: string
}

export function Posts({ posts, totalCount }: Props) {
  const { t } = useTranslation()

  if (!posts.length) {
    return <>{t('empty')}</>
  }

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts.map(post => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>

      <Pagination totalCount={totalCount} />
    </div>
  )
}
