import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from '@/hooks'
import { MessageService } from '@/services'
import { Message } from '@/types'
import {
  TriggersContext,
  TriggersContextType,
  MessengerContext,
  MessengerContextType,
} from '../../context'
import { MessageSkeleton } from '../MessageSkeleton/MessageSkeleton'

export function LoaderNextMessages() {
  const [enabled, setEnabled] = useState(false)
  const { activeChat, messagesRef, setMessages } = useContext(
    MessengerContext
  ) as MessengerContextType
  const { firstUnreadMessageId, nextMessageId, isLoadingChat } = useContext(
    TriggersContext
  ) as TriggersContextType
  const { ref, inView } = useInView({ threshold: 1 })
  const [data, setData] = useState<{ messages: Message[] } | undefined>(
    undefined
  )

  useEffect(() => {
    if (!activeChat?.id || !enabled) {
      return
    }

    const getMessages = async () => {
      try {
        const response = await MessageService.getAll({
          searchParams: { chat: activeChat.id, next: nextMessageId || '' },
        })

        setData({ messages: response.data })
      } catch (error) {
        throw new Error('Error loading the following messages')
      }
    }

    getMessages()
  }, [enabled])

  useEffect(() => {
    if (data && inView && messagesRef?.current) {
      const top = messagesRef.current.scrollTop - 1
      messagesRef.current.scrollTo({ top })
    }
  }, [data, inView, messagesRef])

  useEffect(() => {
    if (nextMessageId && !isLoadingChat) {
      setEnabled(true)
    }
  }, [isLoadingChat, nextMessageId])

  useEffect(() => {
    if (data) {
      setEnabled(false)
      setMessages(prev => [...prev, ...data.messages])
    }
  }, [data, inView, messagesRef, setMessages])

  if (enabled && firstUnreadMessageId) {
    return <MessageSkeleton ref={ref} />
  }

  return null
}
