'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  useCart,
  useCompareProducts,
  useFavoriteProducts,
  useTranslation,
} from '@/store'
import { Badge, Button, Icon, Menu, MenuItem } from '@/ui'
import styles from './ShopMenu.module.css'

export function ShopMenu() {
  const { favoritesItems } = useFavoriteProducts()
  const { compareItems } = useCompareProducts()
  const { cartItems } = useCart()
  const { t } = useTranslation()
  const router = useRouter()

  const onCart = () => (cartItems.length ? router.push('/shop/cart') : null)
  const onFavorites = () =>
    favoritesItems.length ? router.push('/shop/favorites') : null
  const onCompare = () =>
    compareItems.length ? router.push('/shop/compare') : null

  return (
    <div className={styles.shopMenu}>
      <Menu
        trigger={
          <Button
            startIcon={<Icon name="apps" width={20} height={20} />}
            className={styles.button}
            variant="text"
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
        startIcon={
          <Badge
            value={favoritesItems.length}
            onClick={onFavorites}
            variant="dot"
          >
            <Icon name="bookmarks" width={25} height={25} />
          </Badge>
        }
        className={styles.button}
        onClick={() => router.push('/shop/favorites')}
      >
        {t('favorites')}
      </Button>

      <Button
        className={styles.button}
        variant="text"
        startIcon={
          <Badge value={compareItems.length} variant="dot" onClick={onCompare}>
            <Icon name="barChart" width={25} height={25} />
          </Badge>
        }
      >
        {t('compare')}
      </Button>

      <Button
        className={styles.button}
        variant="text"
        startIcon={
          <Badge value={cartItems.length} variant="dot" onClick={() => onCart}>
            <Icon name="cart" width={25} height={25} />
          </Badge>
        }
      >
        {t('cart')}
      </Button>
    </div>
  )
}
