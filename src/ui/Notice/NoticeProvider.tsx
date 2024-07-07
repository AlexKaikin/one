'use client'

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Color } from '../types'
import { Notice } from './Notice'
import styles from './Notice.module.css'

export type Notice = {
  id: number
  message: string
  type: Color
  autoClose: boolean
}

export type NoticeContextType = {
  notifications: Notice[]
  setNotifications: Dispatch<SetStateAction<Notice[]>>
}

export const NoticeContext = React.createContext<NoticeContextType | null>(null)

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notice[]>([])

  const deleteNotification = (id: number) =>
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    )

  const value = { notifications, setNotifications }

  return (
    <NoticeContext.Provider value={value}>
      {children}
      {!!notifications.length && (
        <div id="notifyContaner" className={styles.notifyContaner}>
          {notifications.map(({ id, message, type, autoClose }) => (
            <Notice
              key={id}
              type={type}
              autoClose={autoClose}
              onDelete={() => deleteNotification(id)}
            >
              {message}
            </Notice>
          ))}
        </div>
      )}
    </NoticeContext.Provider>
  )
}
