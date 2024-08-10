'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCookie, setCookie } from '@/helpers'
import { useTranslation } from '@/store'
import { Button, Icon, Stack } from '@/ui'

export function Theme() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<string | null>(null)
  const name = theme === 'light' ? 'moon' : 'sun'

  function themeChange() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage?.setItem('theme', JSON.stringify('light'))
      setCookie('theme', 'light', { expires: 60 * 60 * 24 * 30, path: '/' })
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      setTheme('dark')
      localStorage?.setItem('theme', JSON.stringify('dark'))
      setCookie('theme', 'dark', { expires: 60 * 60 * 24 * 30, path: '/' })
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  useEffect(() => {
    setTheme(getCookie('theme') || 'light')
  }, [])

  if (!theme) return null

  return (
    <Link href="#" onClick={themeChange}>
      <Stack flexDirection="row" spacing={1}>
        <Icon name={name} width={20} height={20} />
        {name === 'moon' ? t('theme') : t('theme')}
      </Stack>
    </Link>
  )
}
