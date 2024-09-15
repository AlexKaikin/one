'use client'

import { memo, useContext, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { TriggersContext, TriggersContextType } from '../../context'
import { MessengerContext, MessengerContextType } from '../../context/MessengerContex'
import { LoaderNextMessages } from '../LoaderNextMessages/LoaderNextMessages'
import { LoaderPrevMessages } from '../LoaderPrevMessages/LoaderPrevMessages'
import { Message } from '../Message/Message'
import { MessageSkeleton } from '../MessageSkeleton/MessageSkeleton'
import styles from './Messages.module.css'

export const Messages = memo(function Messages() {
  const { messages, setMessages, setIsInitialized, setIsAutoScroll, setActiveChat, setMessagesRef } = useContext(
    MessengerContext
  ) as MessengerContextType

  const { isLoadingChat, setNextMessageId, setPrevMessageId } = useContext(TriggersContext) as TriggersContextType
  const messagesRef = useRef(null)

  useEffect(() => {
    return () => {
      setActiveChat(null)
      setIsInitialized(false)
      setPrevMessageId(null)
      setNextMessageId(null)
      setMessages([])
      setIsAutoScroll(false)
    }
  }, [setActiveChat, setIsAutoScroll, setIsInitialized, setMessages, setPrevMessageId, setNextMessageId])

  useEffect(() => {
    messagesRef && setMessagesRef(messagesRef)
  }, [messagesRef, setMessagesRef])

  if (isLoadingChat) {
    return (
      <div className={styles.messages}>
        {[1, 2, 3, 4, 5].map(key => (
          <MessageSkeleton key={key} />
        ))}
      </div>
    )
  }

  return (
    <div ref={messagesRef} className={styles.messages}>
      <LoaderPrevMessages />

      {messages.map((message, index) => (
        <Message key={message.id} index={index} />
      ))}

      <LoaderNextMessages />
    </div>
  )
})
