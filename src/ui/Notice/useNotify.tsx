'use client'

import { useContext } from 'react'
import { Color } from '../types'
import { NoticeContext, NoticeContextType } from './NoticeProvider'

type Notice = {
  type?: Color
  message: string
  autoClose?: boolean
}

export function useNotify() {
  const { setNotifications } = useContext(NoticeContext) as NoticeContextType

  function notify({ type = 'info', message, autoClose = true }: Notice) {
    setNotifications(prev => [
      ...prev,
      { id: prev.length, message, type, autoClose },
    ])
  }

  return { notify }
}
