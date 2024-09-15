import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Message } from '@/types'

export type TriggersContextType = {
  isInitialized: boolean
  setIsInitialized: Dispatch<SetStateAction<boolean>>

  isLoadingChat: boolean
  setIsLoadingChat: Dispatch<SetStateAction<boolean>>

  isAutoScroll: boolean
  setIsAutoScroll: Dispatch<SetStateAction<boolean>>

  prevMessageId: string | null
  setPrevMessageId: Dispatch<SetStateAction<string | null>>

  nextMessageId: string | null
  setNextMessageId: Dispatch<SetStateAction<string | null>>

  firstUnreadMessageId: string | null
  setFirstUnreadMessageId: Dispatch<SetStateAction<string | null>>

  isFetchedFirstMessages: boolean
  setIsFetchedFirstMessages: Dispatch<SetStateAction<boolean>>

  isScrollToLastMessage: boolean
  setIsScrollToLastMessage: Dispatch<SetStateAction<boolean>>

  messagesRead: Message[]
  setMessagesRead: Dispatch<SetStateAction<Message[]>>

  isNewMessageReceived: boolean
  setIsNewMessageReceived: Dispatch<SetStateAction<boolean>>
}

export const TriggersContext = createContext<TriggersContextType | null>(null)

export function TriggersProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const [prevMessageId, setPrevMessageId] = useState<string | null>(null)
  const [nextMessageId, setNextMessageId] = useState<string | null>(null)
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState<string | null>(null)
  const [isFetchedFirstMessages, setIsFetchedFirstMessages] = useState(false)
  const [isScrollToLastMessage, setIsScrollToLastMessage] = useState(false)
  const [messagesRead, setMessagesRead] = useState<Message[]>([])
  const [isNewMessageReceived, setIsNewMessageReceived] = useState(false)

  const value = useMemo(
    () => ({
      isInitialized,
      setIsInitialized,
      isLoadingChat,
      setIsLoadingChat,
      isAutoScroll,
      setIsAutoScroll,
      prevMessageId,
      setPrevMessageId,
      nextMessageId,
      setNextMessageId,
      firstUnreadMessageId,
      setFirstUnreadMessageId,
      isFetchedFirstMessages,
      setIsFetchedFirstMessages,
      isScrollToLastMessage,
      setIsScrollToLastMessage,
      messagesRead,
      setMessagesRead,
      isNewMessageReceived,
      setIsNewMessageReceived,
    }),
    [
      firstUnreadMessageId,
      isAutoScroll,
      isFetchedFirstMessages,
      isInitialized,
      isLoadingChat,
      isNewMessageReceived,
      isScrollToLastMessage,
      messagesRead,
      nextMessageId,
      prevMessageId,
    ]
  )

  return <TriggersContext.Provider value={value}>{children}</TriggersContext.Provider>
}
