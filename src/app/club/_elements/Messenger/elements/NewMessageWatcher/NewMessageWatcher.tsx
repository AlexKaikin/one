import React, { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Pusher from 'pusher-js'
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from '@/constants'
import { Chat, Message, User } from '@/types'
import { MessengerContext, MessengerContextType, TriggersContext, TriggersContextType } from '../../context'

export function NewMessageWatcher() {
  const { activeChat, setChats, setMessages } = useContext(MessengerContext) as MessengerContextType
  const { setIsNewMessageReceived } = useContext(TriggersContext) as TriggersContextType
  const { data: session } = useSession()

  useEffect(() => {
    if (activeChat?.id) {
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
      })

      const channel = pusher.subscribe(`message-to-${session?.user.id}`)

      channel.bind('message', (data: { message: Message }) => {
        if ((data.message.chat as unknown as String) === activeChat?.id) {
          setMessages(messages => [...messages, data.message])
        }

        setChats(chats => getUpdatedChatsByMessage(chats, data.message))
        setIsNewMessageReceived(true)
      })

      return () => {
        channel.unbind_all()
        channel.unsubscribe()
        pusher.disconnect()
      }
    }
  }, [activeChat?.id, session?.user.id, setChats, setIsNewMessageReceived, setMessages])

  return null
}

function sortChats(chats: Chat[]) {
  return chats.sort((a, b) => (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime() ? -1 : 1))
}

function getUpdatedChatsByMessage(chats: Chat[], message: Message): Chat[] {
  const chatIdOfMessage = message.chat as unknown as string
  const updatedMessage = {
    lastMessage: { ...message, sender: (message.sender as User).id },
    updatedAt: message.createdAt,
  } as unknown as Message

  const updatedChats = chats?.map(chat => (chat.id === chatIdOfMessage ? { ...chat, ...updatedMessage } : chat))
  const sortedChats = sortChats(updatedChats as Chat[])
  console.log('sortedChats', sortedChats)

  return sortedChats
}
