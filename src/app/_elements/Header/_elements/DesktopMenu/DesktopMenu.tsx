'use client'

import cn from 'classnames'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROLES } from '@/constants'
import { useTranslation } from '@/store'
import { Divider, List, Menu, MenuItem, Stack, SubMenu } from '@/ui'
import { Lang } from '../Lang/Lang'
import { SignOutLink } from '../SignOutLink/SignOutLink'
import { Theme } from '../Theme/Theme'
import styles from './DesktopMenu.module.css'

type Link = {
  url: string
  title: string
  subLinks: Link[] | null
}

export function DesktopMenu() {
  const { t } = useTranslation()
  const { data } = useSession()
  const pathname = usePathname()

  const shopLinks = [
    {
      url: '/shop',
      title: t('products'),
      subLinks: [
        { url: '/shop/category/tea', title: t('tea'), subLinks: null },
        { url: '/shop/category/coffee', title: t('coffee'), subLinks: null },
      ],
    },
    { url: '/shop/favorites', title: t('favorites'), subLinks: null },
    { url: '/shop/compare', title: t('compare'), subLinks: null },
    { url: '/shop/cart', title: t('cart'), subLinks: null },
  ]

  const blogLinks = [
    {
      url: '/blog',
      title: t('posts'),
      subLinks: [
        {
          url: '/blog/category/instructions',
          title: t('instructions'),
          subLinks: null,
        },
        {
          url: '/blog/category/traditions',
          title: t('traditions'),
          subLinks: null,
        },
        {
          url: '/blog/category/reviews',
          title: t('reviews'),
          subLinks: null,
        },
      ],
    },
    { url: '/blog/favorites', title: t('favorites'), subLinks: null },
  ]

  const clubLinks = [
    { url: '/club', title: t('myPage'), subLinks: null },
    { url: '/club/messenger', title: t('messenger'), subLinks: null },
    { url: '/club/groups', title: t('groups'), subLinks: null },
    { url: '/club/users', title: t('users'), subLinks: null },
    { url: '/club/events', title: t('events'), subLinks: null },
  ]

  return (
    <List align="horizontal" spacing={2}>
      <Link
        href={'/'}
        className={cn({
          [styles.active]: (pathname.indexOf('/') >= 0 && '/' !== '/') || pathname === '/',
        })}
      >
        {t('home')}
      </Link>

      <Menu trigger={t('shop')} active={pathname.includes('shop')}>
        {shopLinks.map(link => (
          <SubMenuItem key={link.title} link={link} />
        ))}
      </Menu>

      <Menu trigger={t('blog')} active={pathname.includes('blog')}>
        {blogLinks.map(link => (
          <SubMenuItem key={link.title} link={link} />
        ))}
      </Menu>

      <Menu trigger={t('club')} active={pathname.includes('club')}>
        {clubLinks.map(link => (
          <SubMenuItem key={link.title} link={link} />
        ))}
      </Menu>

      <Menu trigger={t('account')} active={pathname.includes('account')}>
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
            <Link href={'/admin'}>{t('adminPanel')}</Link>
          </MenuItem>
        )}

        {data?.user && (
          <MenuItem>
            <SignOutLink />
          </MenuItem>
        )}

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
    </List>
  )
}

function SubMenuItem({ link }: { link: Link }) {
  const pathname = usePathname()

  if (link.subLinks) {
    return (
      <SubMenu trigger={link.title} href={link.url}>
        {link.subLinks.map(l => (
          <SubMenuItem key={l.title} link={l} />
        ))}
      </SubMenu>
    )
  }

  return (
    <MenuItem>
      <Link href={link.url} className={cn({ [styles.active]: pathname === link.url })}>
        {link.title}
      </Link>
    </MenuItem>
  )
}
