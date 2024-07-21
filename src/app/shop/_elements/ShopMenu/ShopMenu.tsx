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

  const onCart = () => (!!cartItems.length ? router.push('/shop/cart') : null)
  const onFavorites = () =>
    !!favoritesItems.length ? router.push('/shop/favorites') : null
  const onCompare = () =>
    !!compareItems.length ? router.push('/shop/compare') : null

  return (
    <div className={styles.shopMenu}>
      <Menu
        trigger={
          <Button
            startIcon={<Icon name="apps" width={20} height={20} />}
            className={styles.button}
            variant="clean"
          >
            {t('products')}
          </Button>
        }
      >
        <MenuItem>
          <Link href={'/shop/category/tea'}>{t('tea')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/shop/category/coffee'}>{t('coffee')}</Link>
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
        onClick={onFavorites}
      >
        {t('favorites')}
      </Button>

      <Button
        className={styles.button}
        variant="clean"
        startIcon={
          <Badge value={compareItems.length} variant="dot">
            <Icon name="barChart" width={25} height={25} />
          </Badge>
        }
        onClick={onCompare}
      >
        {t('compare')}
      </Button>

      <Button
        className={styles.button}
        variant="clean"
        startIcon={
          <Badge value={cartItems.length} variant="dot">
            <Icon name="cart" width={25} height={25} />
          </Badge>
        }
        onClick={onCart}
      >
        {t('cart')}
      </Button>
    </div>
  )
}
