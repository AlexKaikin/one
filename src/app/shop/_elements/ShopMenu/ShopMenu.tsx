'use client'

import Link from 'next/link'
import { useTranslation } from '@/store'
import { Button, Icon, Menu, MenuItem } from '@/ui'
import styles from './ShopMenu.module.css'

export function ShopMenu() {
  const { t } = useTranslation()

  return (
    <div className={styles.shopMenu}>
      <Menu
        trigger={
          <Button
            variant="text"
            startIcon={<Icon name="apps" width={20} height={20} />}
            className={styles.button}
          >
            {t('products')}
          </Button>
        }
      >
        <MenuItem>
          <Link href={'/shop'}>{t('tea')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/shop'}>{t('coffee')}</Link>
        </MenuItem>
      </Menu>

      <Button
        variant="text"
        startIcon={<Icon name="bookmarks" width={25} height={25} />}
        className={styles.button}
      >
        {t('favorites')}
      </Button>

      <Button
        variant="text"
        startIcon={<Icon name="listCheck" />}
        className={styles.button}
      >
        {t('compare')}
      </Button>

      <Button
        variant="text"
        startIcon={<Icon name="cart" width={25} height={25} />}
        className={styles.button}
      >
        {t('cart')}
      </Button>
    </div>
  )
}
