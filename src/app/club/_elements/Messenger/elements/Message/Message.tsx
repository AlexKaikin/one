'use client'

import { memo, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import defautAvatar from '@/assets/images/user/defaultAvatar.png'
import { useInView } from '@/hooks'
import { Chat, Message as MessageType, User } from '@/types'
import { Stack } from '@/ui'
import { TriggersContext, TriggersContextType } from '../../context'
import { MessengerContext, MessengerContextType } from '../../context/MessengerContex'
import { AutoScrollSwitcher } from '../AutoScrollSwitcher/AutoScrollSwitcher'
import { DeleteMessageButton } from '../DeleteMessageButton/DeleteMessageButton'
import { ScrollerToLastMessage } from '../ScrollerToLastMessage/ScrollerToLastMessage'
import styles from './Message.module.css'

export const Message = memo(function Message({ index }: { index: number }) {
  const { data: session } = useSession()
  const { messages, setChats, setLastMessageEntry, setFirstUnreadMessageEntry, activeChat } = useContext(
    MessengerContext
  ) as MessengerContextType
  const {
    isInitialized,
    firstUnreadMessageId,
    nextMessageId,
    prevMessageId,
    messagesRead,
    setPrevMessageId,
    setNextMessageId,
    setMessagesRead,
  } = useContext(TriggersContext) as TriggersContextType
  const isLastMessage = index === messages.length - 1
  const { ref, inView, entry } = useInView({ threshold: 0.1, triggerOnce: !isLastMessage })
  const { id, text, createdAt, sender, read } = messages[index]
  const { id: senderId, lastName, firstName } = sender

  const isMyMessage = senderId === session?.user.id
  const isFirstUnreadMessage = firstUnreadMessageId === messages[index].id

  const isMessageRead = !read.includes(session?.user.id as unknown as User) && inView && isInitialized
  const isLastMessageUnread =
    isLastMessage && !isMyMessage && inView && !read.includes(session?.user.id as unknown as User)
  const last10messageIds = messages.slice(-10).map(({ id }) => id)

  // useEffect(() => {
  //   if (isLastMessageUnread && activeChat?.lastMessage?.id === messages[index].id) {
  //     const checker = (value: Chat) => {
  //       return {
  //         ...value.lastMessage,
  //         read: value.id === activeChat.id || value.lastMessage.read,
  //       }
  //     }

  //     // setChats(prev =>
  //     //   prev.map(chat => ({
  //     //     ...chat,
  //     //     lastMessage: chat.lastMessage ? checker(chat) : chat.lastMessage,
  //     //   }))
  //     // )
  //   }
  // }, [activeChat?.id, activeChat?.lastMessage?.id, index, isLastMessageUnread, messages, setChats])

  useEffect(() => {
    if (isMessageRead) {
      const isMessageExists = (m: MessageType[]) => m.some(item => item.id === id)
      setMessagesRead(prev => (isMessageExists(prev) ? prev : [...prev, messages[index]]))
    }
  }, [id, index, isMessageRead, messages, setMessagesRead])

  useEffect(() => {
    if (isLastMessage && entry) {
      setLastMessageEntry(entry)
    }
  }, [entry, isLastMessage, setLastMessageEntry])

  useEffect(() => {
    if (isFirstUnreadMessage && entry) {
      setFirstUnreadMessageEntry(entry)
    }
  }, [entry, isFirstUnreadMessage, setFirstUnreadMessageEntry])

  useEffect(() => {
    const firstMessageId = messages[0].id
    const isPrevMessageIdEqualFirstMessageId = prevMessageId === firstMessageId

    if (isInitialized && index === 10 && messages.length > 19 && inView && !isPrevMessageIdEqualFirstMessageId) {
      setPrevMessageId(firstMessageId)
    }
  }, [inView, index, isInitialized, messages, prevMessageId, setPrevMessageId])

  useEffect(() => {
    const isLast10IncludesNext = last10messageIds.includes(nextMessageId || '')
    const lastMessageId = messages[messages.length - 1].id
    const isNextMessageIdEqualLastMessageId = nextMessageId === lastMessageId

    if (
      isInitialized &&
      index === messages.length - 10 &&
      messages.length > 19 &&
      inView &&
      !isLast10IncludesNext &&
      !isNextMessageIdEqualLastMessageId
    ) {
      setNextMessageId(lastMessageId)
    }
  }, [inView, index, isInitialized, last10messageIds, messages, nextMessageId, setNextMessageId])

  return (
    <div ref={ref}>
      {isLastMessage && (
        <>
          <ScrollerToLastMessage />
          <AutoScrollSwitcher inView={inView} />
        </>
      )}

      <div className={styles.message}>
        {!isTodayEqualYesterday(messages, index) && (
          <div className={styles.date}>{dayjs(createdAt).format('D MMMM YYYY')}</div>
        )}

        <div
          className={cn(styles.card, {
            [styles['my']]: sender.id !== session?.user.id,
          })}
        >
          <div className={styles.avatar}>
            <Image
              fill
              src={sender.profile?.avatarUrl || defautAvatar}
              alt="avatar"
              className={styles.img}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className={cn(styles.content)}>
            <div className={styles.header}>
              <Stack spacing={1}>
                <div className={styles.name}>{firstName}</div>

                <div className={styles.time}>{dayjs(createdAt).format('H:mm')}</div>
              </Stack>

              <DeleteMessageButton id={id} sender={sender.id} />
            </div>

            <div>
              {text.split('\n').map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

function isTodayEqualYesterday(messages: MessageType[], messageIndex: number) {
  if (messageIndex === 0) {
    return false
  } else {
    return (
      dayjs(messages[messageIndex].createdAt).format('D MMMM YYYY') ===
      dayjs(messages[messageIndex - 1].createdAt).format('D MMMM YYYY')
    )
  }
}
