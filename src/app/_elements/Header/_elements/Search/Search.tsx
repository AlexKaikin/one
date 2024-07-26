'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SCREEN_LG } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { useTranslation } from '@/store'
import { Icon, IconButton, Input, Menu, Select, SelectOption } from '@/ui'
import styles from './Search.module.css'

export function Search() {
  const { width } = useWindowDimensions()

  if (!width) return null

  return (
    <div className={styles.search}>
      {width < SCREEN_LG ? <MobileSearch /> : <DesktopSearch />}
    </div>
  )
}

function MobileSearch() {
  return (
    <Menu trigger={<Icon name="search" width={25} height={25} />}>
      <div className={styles.container}>
        <DesktopSearch />
      </div>
    </Menu>
  )
}

function DesktopSearch() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [value, setValue] = useState(searchParams.get('search') || '')
  const router = useRouter()
  const [path, setPath] = useState('shop')

  const endIcon = (
    <div className={styles.group}>
      {value !== '' && (
        <IconButton variant="text" onClick={onClean}>
          <Icon name="close" height={20} width={20} />
        </IconButton>
      )}

      <Select
        label=""
        color="var(--text)"
        onSelectChange={setPath}
        defaultSelectValue={t('inShop')}
      >
        <SelectOption value={'shop'}>{t('inShop')}</SelectOption>
        <SelectOption value={'blog'}>{t('inBlog')}</SelectOption>
      </Select>

      <IconButton color="primary" onClick={onSubmit}>
        <Icon name="search" height={20} width={20} color="white" />
      </IconButton>
    </div>
  )

  function onSubmit() {
    params.set('search', value)

    if (value === '') params.delete('search')

    router.replace(`/${path}?${params}`)
  }

  function onClean() {
    setValue('')

    params.delete('search')
    router.replace(`/${path}?${params}`)
  }

  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      endAdornment={endIcon}
      placeholder={`${t('search')}...`}
    />
  )
}
