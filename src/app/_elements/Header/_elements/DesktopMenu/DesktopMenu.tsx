'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { List, Menu, MenuItem, SubMenu } from '@/ui'
import { SignOutLink } from '../SignOutLink/SignOutLink'
import { Theme } from '../Theme/Theme'
import styles from './DesktopMenu.module.css'

export function DesktopMenu() {
  const { data } = useSession()

  return (
    <List align="horizontal">
      <Link href={'/'}>Home</Link>

      <Menu trigger={'Shop'} href={'/shop'}>
        <SubMenu trigger={'Products'} href={'/shop'}>
          <MenuItem>
            <Link href={'/shop'}>Tea</Link>
          </MenuItem>

          <MenuItem>
            <Link href={'/shop'}>Coffee</Link>
          </MenuItem>
        </SubMenu>

        <MenuItem>
          <Link href={'/shop'}>Favorites</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/shop'}>Compare</Link>
        </MenuItem>

        <MenuItem>
          <Link href={'/shop'}>Cart</Link>
        </MenuItem>
      </Menu>

      <Link href={'/blog'}>Blog</Link>

      <Link href={'/club'}>Club</Link>

      <Menu trigger={'Account'} href={'/account'}>
        {!data?.user && (
          <>
            <MenuItem>
              <Link href={'/login'}>Login</Link>
            </MenuItem>
            <MenuItem>
              <Link href={'/register'}>Registration</Link>
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
              <Link href={'/account'}>Personal Area</Link>
            </MenuItem>

            <MenuItem>
              <Link href={'/admin'}>Admin</Link>
            </MenuItem>

            <MenuItem>
              <SignOutLink />
            </MenuItem>
          </>
        )}

        <MenuItem>RU language</MenuItem>

        <MenuItem>
          <Theme />
        </MenuItem>
      </Menu>
    </List>
  )
}
