'use client'

import { memo, useContext, useEffect, useMemo, useState } from 'react'
import { read } from 'fs'
import { useSession } from 'next-auth/react'
import { useDebounce } from '@/hooks'
import { MessageService } from '@/services'
import { useTranslation } from '@/store'
import { Chat, Message, User } from '@/types'
import { useNotify } from '@/ui'
import { MessengerContext, MessengerContextType, TriggersContext, TriggersContextType } from '../../context'

const MESSAGE_READING_DELAY_MILLISECONDS = 4000

export const MessagesReadWatcher = memo(function MessagesReadWatcher() {
  const { data: session } = useSession()
  const { setMessages, setChats } = useContext(MessengerContext) as MessengerContextType
  const { messagesRead, setMessagesRead } = useContext(TriggersContext) as TriggersContextType
  const debouncedMessagesRead = useDebounce(messagesRead, MESSAGE_READING_DELAY_MILLISECONDS)
  const { notify } = useNotify()
  const { t } = useTranslation()

  useEffect(() => {
    if (!session) {
      return
    }

    const updateMessage = (message: Message) => ({
      ...message,
      read: !!debouncedMessagesRead.find(m => m.id === message.id)
        ? [...message.read, session.user.id as unknown as User]
        : message.read,
    })

    setMessages(messages => messages.map(updateMessage))
    setChats(chats =>
      chats.map(chat => ({ ...chat, lastMessage: readLastMessageSwitcher(chat, messagesRead, session.user.id) }))
    )
  }, [messagesRead, setChats, setMessages, session])

  useEffect(() => {
    if (session && debouncedMessagesRead.length) {
      const isUpdatedMessage = (id: string) => !!debouncedMessagesRead.find(m => m.id === id)

      const body = debouncedMessagesRead.map(m => ({
        _id: m.id,
        read: [...m.read, session.user.id as unknown as User],
      }))

      try {
        ;(async () => await MessageService.updateMany(body as unknown as Message[]))()
      } catch (error) {
        notify({ type: 'error', message: t('globalError') })
      }

      setMessagesRead(messages => messages.filter(m => !isUpdatedMessage(m.id)))
    }
  }, [debouncedMessagesRead, session, setMessages, setMessagesRead])

  return null
})

function readLastMessageSwitcher(chat: Chat, debouncedMessagesRead: Message[], userId: string) {
  return debouncedMessagesRead.find(m => m.id === chat?.lastMessage?.id)
    ? { ...chat.lastMessage, read: [...chat.lastMessage.read, userId as unknown as User] }
    : chat.lastMessage
}
