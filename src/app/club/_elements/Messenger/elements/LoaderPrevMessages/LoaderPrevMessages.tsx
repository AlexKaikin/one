import { useContext, useEffect, useState } from 'react'
import { useInView } from '@/hooks'
import { MessageService } from '@/services'
import { Message } from '@/types'
import { MessengerContext, MessengerContextType, TriggersContext, TriggersContextType } from '../../context'
import { MessageSkeleton } from '../MessageSkeleton/MessageSkeleton'

export function LoaderPrevMessages() {
  const [enabled, setEnabled] = useState(false)
  const { activeChat, messagesRef, setMessages } = useContext(MessengerContext) as MessengerContextType
  const { prevMessageId, isLoadingChat } = useContext(TriggersContext) as TriggersContextType
  const { ref, inView } = useInView({ threshold: 1 })
  const [data, setData] = useState<{ messages: Message[] } | undefined>(undefined)

  useEffect(() => {
    if (!activeChat?.id || !enabled) {
      return
    }

    const getMessages = async () => {
      try {
        const response = await MessageService.getAll({
          searchParams: { chat: activeChat.id, prev: prevMessageId || '' },
        })

        setData({ messages: response.data })
      } catch (error) {
        throw new Error('Error loading the following messages')
      }
    }

    getMessages()
  }, [activeChat?.id, enabled, prevMessageId])

  useEffect(() => {
    data && messagesRef?.current && inView && messagesRef.current.scrollTo({ top: 1 })
  }, [data, inView, messagesRef])

  useEffect(() => {
    prevMessageId && !isLoadingChat && setEnabled(true)
  }, [isLoadingChat, prevMessageId])

  useEffect(() => {
    if (data && messagesRef?.current) {
      setEnabled(false)
      setMessages(prev => [...data.messages, ...prev])
    }
  }, [data, messagesRef, setMessages])

  if (enabled) {
    return <MessageSkeleton ref={ref} />
  }

  return null
}
