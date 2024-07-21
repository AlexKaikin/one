'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Roles } from '@/entities'
import { useTranslation } from '@/store'
import { Icon, Menu, MenuItem, SubMenu } from '@/ui'
import { Lang } from '../Lang/Lang'
import { SignOutLink } from '../SignOutLink/SignOutLink'
import { Theme } from '../Theme/Theme'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const { t } = useTranslation()
  const { data } = useSession()

  return (
    <Menu trigger={<Icon name="list" width={25} height={25} />}>
      <MenuItem>
        <Link href={'/'}>{t('home')}</Link>
      </MenuItem>

      <SubMenu trigger={t('shop')} href={'/shop'}>
        <SubMenu trigger={t('products')} href={'/shop'}>
          <MenuItem>
            <Link href={'/shop/category/tea'}>{t('tea')}</Link>
          </MenuItem>

          <MenuItem>
            <Link href={'/shop/category/coffee'}>{t('coffee')}</Link>
          </MenuItem>
        </SubMenu>

        <MenuItem>
          <Link href={'/shop/favorites'}>{t('favorites')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/shop/compare'}>{t('compare')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/shop/cart'}>{t('cart')}</Link>
        </MenuItem>
      </SubMenu>

      <MenuItem>
        <Link href={'/blog'}>{t('blog')}</Link>
      </MenuItem>

      <MenuItem>
        <Link href={'/club'}>{t('club')}</Link>
      </MenuItem>

      <SubMenu trigger={t('account')}>
        {!data?.user && (
          <>
            <MenuItem>
              <Link href={'/login'}>{t('login')}</Link>
            </MenuItem>
            <MenuItem>
              <Link href={'/register'}>{t('registration')}</Link>
            </MenuItem>
          </>
        )}
        {data?.user && (
          <>
            <MenuItem>
              <div className={styles.accountName}>
                <div>{data.user?.firstName}</div>
                <div className={styles.email}>{data.user.email}</div>{' '}
              </div>
            </MenuItem>

            <MenuItem>
              <Link href={'/account'}>{t('lk')}</Link>
            </MenuItem>
          </>
        )}

        {data?.user.role === Roles.admin && (
          <MenuItem>
            <Link href={'/admin'}>{t('admin')}</Link>
          </MenuItem>
        )}

        {data?.user && (
          <MenuItem>
            <SignOutLink />
          </MenuItem>
        )}

        <MenuItem>
          <Lang />
        </MenuItem>

        <MenuItem>
          <Theme />
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
