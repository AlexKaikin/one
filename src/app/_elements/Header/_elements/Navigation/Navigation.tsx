'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { SCREEN_LG } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { Icon, List, Menu, MenuItem, SubMenu } from '@/ui'
import { SignOutLink } from '../SignOutLink/SignOutLink'
import styles from './Navigation.module.css'

export function Navigation() {
  const { width } = useWindowDimensions()

  if (!width) return null

  return (
    <div className={styles.navigation}>
      {width < SCREEN_LG ? <MobileMenu /> : <DesktopMenu />}
    </div>
  )
}

function DesktopMenu() {
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

            <MenuItem>RU language</MenuItem>

            <MenuItem>Light theme</MenuItem>

            <MenuItem>
              <SignOutLink />
            </MenuItem>
          </>
        )}
      </Menu>
    </List>
  )
}

function MobileMenu() {
  const { data } = useSession()

  return (
    <Menu trigger={<Icon name="list" />}>
      <MenuItem>
        <Link href={'/'}>Home</Link>
      </MenuItem>

      <SubMenu trigger={'Shop'} href={'/shop'}>
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
      </SubMenu>

      <MenuItem>
        <Link href={'/blog'}>Blog</Link>
      </MenuItem>

      <MenuItem>
        <Link href={'/club'}>Club</Link>
      </MenuItem>

      <SubMenu trigger={'Account'}>
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

            <MenuItem>RU language</MenuItem>

            <MenuItem>Light theme</MenuItem>

            <MenuItem>
              <SignOutLink />
            </MenuItem>
          </>
        )}
      </SubMenu>
    </Menu>
  )
}
