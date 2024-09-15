'use client'

import { useContext, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks'
import { ChatService } from '@/services'
import { Input } from '@/ui'
import { MessengerContext, MessengerContextType } from '../../context'
import styles from './Search.module.css'

export function Search() {
  const { setChats } = useContext(MessengerContext) as MessengerContextType
  const [nameDebounce, setNameDebounce] = useState('')
  const debouncedValue = useDebounce(nameDebounce, 2000)

  useEffect(() => {
    const getChats = async (value: string) => {
      const response = await ChatService.getAll({ searchParams: { user: value } })

      setChats(response.data)
    }

    if (debouncedValue.length) getChats(debouncedValue)
    else getChats('')
  }, [debouncedValue, setChats])

  return (
    <div className={styles.search}>
      <Input placeholder="Search..." value={nameDebounce} onChange={e => setNameDebounce(e.target.value)} />
    </div>
  )
}
