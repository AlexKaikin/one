'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Icon, IconButton, Input } from '@/ui'
import styles from './Search.module.css'

export function Search() {
  const [value, setValue] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)

  const endIcon = (
    <div className={styles.group}>
      {value !== '' && (
        <IconButton
          variant="text"
          style={{ padding: '10px', marginRight: '5px' }}
          onClick={onClean}
        >
          <Icon name="close" height={20} width={20} />
        </IconButton>
      )}

      <IconButton
        color="primary"
        style={{ padding: '10px', marginRight: '5px' }}
        onClick={onSubmit}
      >
        <Icon name="search" height={20} width={20} color="white" />
      </IconButton>
    </div>
  )

  function onSubmit() {
    params.set('search', value)

    if (value === '') params.delete('search')

    router.replace(`/shop?${params}`)
  }

  function onClean() {
    setValue('')

    params.delete('search')
    router.replace(`/shop?${params}`)
  }

  return (
    <div className={styles.search}>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        endIcon={endIcon}
        placeholder="Search..."
      />
    </div>
  )
}
