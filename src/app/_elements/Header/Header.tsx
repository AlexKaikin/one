'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Divider, Menu, MenuItem } from '@/ui'
import styles from './Header.module.css'
import { Logo, Search, SignOutLink } from './_elements'

export function Header() {
  const { data } = useSession()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.group}>
          <Logo />

          <div className={styles.menu}>
            <Link href={'/'}>Home</Link>
            <Link href={'/shop'}>Shop</Link>
            <Link href={'/blog'}>Blog</Link>
            <Link href={'/club'}>Club</Link>

            <Menu trigger={'Account'}>
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

                  <Divider />

                  <MenuItem>RU language</MenuItem>
                  <MenuItem>Light theme</MenuItem>

                  <Divider />

                  <MenuItem>
                    <SignOutLink />
                  </MenuItem>
                </>
              )}
            </Menu>
          </div>
        </div>

        <Search />
      </div>
    </header>
  )
}
