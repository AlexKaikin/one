'use client'

import { useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import defautAvatar from '@/assets/images/user/defaultAvatar.png'
import { ChatService } from '@/services'
import { Chat as ChatType, User } from '@/types'
import { Stack } from '@/ui'
import { MessengerContext, MessengerContextType } from '../../context/MessengerContex'
import { ChatSkeleton } from '../ChatSkeleton/ChatSkeleton'
import styles from './Chats.module.css'

export function Chats() {
  const [isFetching, setIsFetching] = useState(true)
  const { data: session } = useSession()
  const { chats, setChats } = useContext(MessengerContext) as MessengerContextType

  useEffect(() => {
    const getChats = async () => {
      const response = await ChatService.getAll({ searchParams: {} })
      setChats(response.data)
      setIsFetching(false)
    }

    getChats()
  }, [setChats])

  if (!session) {
    return null
  }

  return (
    <div className={styles.chats}>
      {isFetching && (
        <Stack flexDirection="column" spacing={1}>
          {[1, 2, 3, 4, 5, 6].map(key => (
            <ChatSkeleton key={key} />
          ))}
        </Stack>
      )}

      {!isFetching &&
        chats.map(chat => (
          <div key={chat.id}>
            <Chat chat={chat} currentUser={session.user as User} />
          </div>
        ))}
    </div>
  )
}

function Chat({ chat, currentUser }: { chat: ChatType; currentUser: User }) {
  const { activeChat } = useContext(MessengerContext) as MessengerContextType

  const user = chat.users.filter(user => user.id !== currentUser.id)[0]

  return (
    <Link
      href={`/club/messenger?chat=${chat.id}`}
      className={cn(styles.user, {
        [styles['active']]: chat.id === activeChat?.id,
      })}
    >
      <div className={styles.avatar}>
        <Image
          fill
          src={user.profile?.avatarUrl || defautAvatar}
          alt="avatar"
          className={styles.img}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.infoName}>
          <b>
            {user.lastName} {user.firstName}
          </b>

          <span className={styles.time}>{dayjs(chat.updatedAt).format('H:mm')}</span>
        </div>

        <div className={styles.infoMessage}>
          <p className={styles.fragmentMessage}>{chat?.lastMessage?.text}</p>

          {isUnread(chat, currentUser) && <div className={styles.unreadMessage}></div>}
        </div>
      </div>
    </Link>
  )
}

function isUnread(chat: ChatType, currentUser: User) {
  const isEmpty = !chat.lastMessage
  const isMy = (chat?.lastMessage?.sender as unknown as string) === currentUser.id

  if (isEmpty || isMy) {
    return false
  }

  const isUnread = !(chat.lastMessage.read as unknown as string[]).includes(currentUser.id)

  return isUnread
}
