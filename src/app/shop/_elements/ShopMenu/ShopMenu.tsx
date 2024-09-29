'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart, useCompareProducts, useFavoriteProducts, useTranslation } from '@/store'
import { Badge, Icon, IconType, Menu, MenuItem } from '@/ui'
import styles from './ShopMenu.module.css'

export function ShopMenu() {
  const { favoritesItems } = useFavoriteProducts()
  const { compareItems } = useCompareProducts()
  const { cartItems } = useCart()
  const { t } = useTranslation()

  const paths = [
    { href: '/shop/category/tea', title: t('tea') },
    { href: '/shop/category/coffee', title: t('coffee') },
  ]

  const menu: { title: string; icon: IconType; bage: number; path: string; paths: typeof paths | null }[] = [
    {
      title: t('products'),
      icon: 'apps',
      bage: 0,
      paths: paths,
      path: 'not',
    },
    {
      title: t('favorites'),
      icon: 'bookmarks',
      bage: favoritesItems.length,
      paths: null,
      path: '/shop/favorites',
    },
    {
      title: t('compare'),
      icon: 'barChart',
      bage: compareItems.length,
      paths: null,
      path: '/shop/compare',
    },
    {
      title: t('cart'),
      icon: 'cart',
      bage: cartItems.length,
      paths: null,
      path: '/shop/cart',
    },
  ]

  return (
    <div className={styles.shopMenu}>
      {menu.map(item => (
        <ShopMenuItem
          key={item.title}
          title={item.title}
          paths={item.paths}
          path={item.path}
          icon={item.icon}
          bage={item.bage}
        />
      ))}
    </div>
  )
}

type ShopMenuItemProps = {
  title: string
  path?: string | null
  paths?: { href: string; title: string }[] | null
  icon: IconType
  bage: number
}

function ShopMenuItem(props: ShopMenuItemProps) {
  const { title, bage, icon, path, paths } = props
  const router = useRouter()
  const pathname = usePathname()
  const isShop = pathname === '/shop'
  const isShopCategory = pathname.includes('/shop/category')
  const isShopProduct = pathname.includes('/shop/product')
  const isShopActive = isShopCategory || isShopProduct || isShop
  const isActive = pathname.includes(path || 'not')

  const startIcon = () => <Icon name={icon} width={22} height={22} />

  if (paths) {
    return (
      <div className={cn(styles.buttonContainer, { [styles['active']]: isShopActive })}>
        <div className={styles.nap}></div>

        <Menu
          trigger={
            <div className={cn(styles.button, { [styles['active']]: isShopActive })}>
              <Badge value={bage} variant="dot">
                <div className={cn(styles.iconContainer, { [styles['active']]: isShopActive })}>
                  <div className={cn(styles.icon, { [styles['active']]: isShopActive })}>{startIcon()}</div>
                </div>
              </Badge>

              <div className={styles.title}>{title}</div>
            </div>
          }
        >
          {paths.map(path => (
            <MenuItem key={path.title}>
              <Link href={path.href}>{path.title}</Link>
            </MenuItem>
          ))}
        </Menu>

        <div className={styles.nap}></div>
      </div>
    )
  }

  if (!path) {
    return null
  }

  return (
    <div className={cn(styles.buttonContainer, { [styles['active']]: isActive })}>
      <div className={styles.nap}></div>

      <div className={cn(styles.button, { [styles['active']]: isActive })} onClick={() => router.push(path)}>
        <Badge value={bage} variant="dot">
          <div className={cn(styles.iconContainer, { [styles['active']]: isActive })}>
            <div className={cn(styles.icon, { [styles['active']]: isActive })}>{startIcon()}</div>
          </div>
        </Badge>

        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.nap}></div>
    </div>
  )
}
