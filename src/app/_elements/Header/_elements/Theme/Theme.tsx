'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from '@/helpers'
import { Button, Icon } from '@/ui'
import { useTranslation } from '@/store'

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
    <Button
      variant="text"
      startIcon={<Icon name={name} width={20} height={20} />}
      onClick={themeChange}
    >
      {name === 'moon' ? t('darkTheme') : t('lightTheme')}
    </Button>
  )
}
