'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ROLES } from '@/constants'
import { useTranslation } from '@/store'
import { Divider, Icon, Menu, MenuItem, Stack, SubMenu } from '@/ui'
import { Lang } from '../Lang/Lang'
import { SignOutLink } from '../SignOutLink/SignOutLink'
import { Theme } from '../Theme/Theme'
import styles from './MobileMenu.module.css'

export function MobileMenu() {
  const { t } = useTranslation()
  const { data } = useSession()

  return (
    <Menu trigger={<Icon name="twoLineHorizontal" />}>
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

      <SubMenu trigger={t('blog')} href={'/blog'}>
        <SubMenu trigger={t('posts')} href={'/blog'}>
          <MenuItem>
            <Link href={'/blog/category/instructions'}>{t('instructions')}</Link>
          </MenuItem>

          <MenuItem>
            <Link href={'/blog/category/traditions'}>{t('traditions')}</Link>
          </MenuItem>

          <MenuItem>
            <Link href={'/blog/category/reviews'}>{t('reviews')}</Link>
          </MenuItem>
        </SubMenu>

        <MenuItem>
          <Link href={'/blog/favorites'}>{t('favorites')}</Link>
        </MenuItem>
      </SubMenu>

      <SubMenu trigger={t('club')} href={'/club'}>
        <MenuItem>
          <Link href={'/club'}>{t('myPage')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/club/messenger'}>{t('messenger')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/club/groups'}>{t('groups')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/club/users'}>{t('users')}</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/club/events'}>{t('events')}</Link>
        </MenuItem>
      </SubMenu>

      <SubMenu trigger={t('account')} href={'/account'}>
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

        {data?.user.role === ROLES.ADMIN && (
          <MenuItem>
            <Link href={'/admin'}>{t('admin')}</Link>
          </MenuItem>
        )}

        {data?.user && (
          <MenuItem>
            <SignOutLink />
          </MenuItem>
        )}
      </SubMenu>

      <Divider />

      <Stack spacing={2}>
        <MenuItem>
          <Lang />
        </MenuItem>

        <MenuItem>
          <Theme />
        </MenuItem>
      </Stack>
    </Menu>
  )
}
