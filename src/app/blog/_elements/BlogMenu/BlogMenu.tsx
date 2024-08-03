'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFavoritePosts, useTranslation } from '@/store'
import { Badge, Button, Icon, Menu, MenuItem } from '@/ui'
import styles from './BlogMenu.module.css'

export function BlogMenu() {
  const { favoritesItems } = useFavoritePosts()
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className={styles.blogMenu}>
      <Menu
        trigger={
          <Button
            startIcon={<Icon name="apps" width={20} height={20} />}
            className={styles.button}
            variant="clean"
          >
            {t('posts')}
          </Button>
        }
      >
        <MenuItem>
          <Link href={'/blog/category/instructions'}>{t('instructions')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/blog/category/traditions'}>{t('traditions')}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={'/blog/category/reviews'}>{t('reviews')}</Link>
        </MenuItem>
      </Menu>

      <Button
        variant="clean"
        startIcon={
          <Badge value={favoritesItems.length} variant="dot">
            <Icon name="bookmarks" width={25} height={25} />
          </Badge>
        }
        className={styles.button}
        onClick={() => router.push('/blog/favorites')}
      >
        {t('favorites')}
      </Button>
    </div>
  )
}
