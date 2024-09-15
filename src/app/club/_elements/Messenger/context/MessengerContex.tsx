'use client'

import React, { createContext, Dispatch, RefObject, SetStateAction, useMemo, useState } from 'react'
import { Chat, Message, User } from '@/types'

export type MessengerContextType = {
  isInitialized: boolean
  setIsInitialized: Dispatch<SetStateAction<boolean>>

  chats: Chat[]
  setChats: Dispatch<SetStateAction<Chat[]>>

  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>

  messagesRef: RefObject<HTMLDivElement> | null
  setMessagesRef: Dispatch<SetStateAction<RefObject<HTMLDivElement> | null>>

  isAutoScroll: boolean
  setIsAutoScroll: Dispatch<SetStateAction<boolean>>

  activeChat: Chat | null
  setActiveChat: Dispatch<SetStateAction<Chat | null>>

  activeUser: User | null
  setActiveUser: Dispatch<SetStateAction<User | null>>

  lastMessageEntry: IntersectionObserverEntry | undefined
  setLastMessageEntry: Dispatch<SetStateAction<IntersectionObserverEntry | undefined>>

  firstUnreadMessageEntry: IntersectionObserverEntry | undefined
  setFirstUnreadMessageEntry: Dispatch<SetStateAction<IntersectionObserverEntry | undefined>>

  prevMessageId: string | null
  setPrevMessageId: Dispatch<SetStateAction<string | null>>

  nextMessageId: string | null
  setNextMessageId: Dispatch<SetStateAction<string | null>>
}

export const MessengerContext = createContext<MessengerContextType | null>(null)

export function MessengerProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [messagesRef, setMessagesRef] = useState<RefObject<HTMLDivElement> | null>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [activeUser, setActiveUser] = useState<User | null>(null)

  const [lastMessageEntry, setLastMessageEntry] = useState<IntersectionObserverEntry | undefined>(undefined)
  const [firstUnreadMessageEntry, setFirstUnreadMessageEntry] = useState<IntersectionObserverEntry | undefined>(
    undefined
  )

  const [prevMessageId, setPrevMessageId] = useState<string | null>(null)
  const [nextMessageId, setNextMessageId] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      isInitialized,
      setIsInitialized,
      messages,
      setMessages,
      messagesRef,
      setMessagesRef,
      chats,
      setChats,
      isAutoScroll,
      setIsAutoScroll,
      activeChat,
      setActiveChat,
      activeUser,
      setActiveUser,
      lastMessageEntry,
      setLastMessageEntry,
      firstUnreadMessageEntry,
      setFirstUnreadMessageEntry,
      prevMessageId,
      setPrevMessageId,
      nextMessageId,
      setNextMessageId,
    }),
    [
      isInitialized,
      messages,
      messagesRef,
      chats,
      isAutoScroll,
      activeChat,
      activeUser,
      lastMessageEntry,
      firstUnreadMessageEntry,
      prevMessageId,
      nextMessageId,
    ]
  )

  return <MessengerContext.Provider value={value}>{children}</MessengerContext.Provider>
}
