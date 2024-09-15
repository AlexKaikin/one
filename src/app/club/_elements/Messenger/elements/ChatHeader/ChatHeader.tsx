import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import defautAvatar from '@/assets/images/user/defaultAvatar.png'
import { ChatService } from '@/services'
import { User } from '@/types'
import { MessengerContext, MessengerContextType, TriggersContext, TriggersContextType } from '../../context'
import { ChatHeaderSkeleton } from '../ChatHeaderSkeleton/ChatHeaderSkeleton'
import styles from './ChatHeader.module.css'

export function ChatHeader() {
  const { activeUser, setActiveChat, setActiveUser, setMessages, setLastMessageEntry } = useContext(
    MessengerContext
  ) as MessengerContextType
  const {
    setIsFetchedFirstMessages,
    setIsLoadingChat,
    setNextMessageId,
    setPrevMessageId,
    setFirstUnreadMessageId,
    setIsAutoScroll,
  } = useContext(TriggersContext) as TriggersContextType
  const searchParams = useSearchParams()
  const chatId = searchParams.get('chat')
  const { data: session } = useSession()
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (!session || !chatId) {
      return
    }

    setNextMessageId(null)
    setPrevMessageId(null)
    setIsLoadingChat(isFetching)
    setLastMessageEntry(undefined)
    setIsAutoScroll(true)

    const getChat = async () => {
      const response = await ChatService.getOne(chatId, {
        searchParams: {},
      })

      const { chat, messages } = response.data
      const user = chat.users.find(({ id }) => id !== session.user.id)

      if (!user) {
        return
      }

      const firstUnreadMessageId =
        messages.find(
          message =>
            !message.read.includes(session.user.id as unknown as User) &&
            message.sender !== (session.user.id as unknown as User)
        )?.id || null

      setIsFetching(false)
      setActiveChat(chat)
      setMessages(messages)
      setActiveUser(user)
      setFirstUnreadMessageId(firstUnreadMessageId)
      setIsFetchedFirstMessages(true)
    }

    getChat()
  }, [
    chatId,
    isFetching,
    session,
    setActiveChat,
    setActiveUser,
    setFirstUnreadMessageId,
    setIsAutoScroll,
    setIsFetchedFirstMessages,
    setIsLoadingChat,
    setLastMessageEntry,
    setMessages,
    setNextMessageId,
    setPrevMessageId,
  ])

  if (isFetching || !activeUser) {
    return (
      <div className={styles.chatHeader}>
        <ChatHeaderSkeleton />
      </div>
    )
  }

  return (
    <div className={styles.chatHeader}>
      <div className={styles.col}>
        <div className={styles.avatar}>
          <Image
            fill
            src={activeUser.profile?.avatarUrl || defautAvatar}
            className={styles.img}
            alt={`${activeUser.lastName} ${activeUser.firstName}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className={styles.info}>
          <div className={styles.infoName}>
            <div>
              <b className={styles.userName}>
                {activeUser.lastName} {activeUser.firstName}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
