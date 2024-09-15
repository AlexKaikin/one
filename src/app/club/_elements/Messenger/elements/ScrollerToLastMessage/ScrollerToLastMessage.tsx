import { memo, useContext, useEffect } from 'react';
import { MessengerContext, MessengerContextType, TriggersContext, TriggersContextType } from '../../context';


export const ScrollerToLastMessage = memo(function ScrollerToLastMessage() {
  const { lastMessageEntry, firstUnreadMessageEntry } = useContext(MessengerContext) as MessengerContextType
  const {
    isNewMessageReceived,
    firstUnreadMessageId,
    isAutoScroll,
    isScrollToLastMessage,
    isFetchedFirstMessages,
    setIsInitialized,
    setIsFetchedFirstMessages,
    setIsAutoScroll,
    setIsScrollToLastMessage,
    setIsNewMessageReceived,
  } = useContext(TriggersContext) as TriggersContextType

  useEffect(() => {
    if (isFetchedFirstMessages && lastMessageEntry) {
     
      if (firstUnreadMessageId && firstUnreadMessageEntry) {
        firstUnreadMessageEntry.target.scrollIntoView()
      } else {
        lastMessageEntry.target.scrollIntoView()
      }

      setIsInitialized(true)
      setIsFetchedFirstMessages(false)
      setIsAutoScroll(true)
    }
  }, [
    firstUnreadMessageEntry,
    firstUnreadMessageId,
    isFetchedFirstMessages,
    lastMessageEntry,
    setIsAutoScroll,
    setIsFetchedFirstMessages,
    setIsInitialized,
  ])

  useEffect(() => {
    if (isNewMessageReceived && isAutoScroll && lastMessageEntry) {
      lastMessageEntry.target.scrollIntoView({ behavior: 'smooth' })
      setIsNewMessageReceived(false)
    }
  }, [isAutoScroll, isNewMessageReceived, lastMessageEntry, setIsNewMessageReceived])

  useEffect(() => {
    if (isScrollToLastMessage && lastMessageEntry) {
      lastMessageEntry.target.scrollIntoView({ behavior: 'smooth' })
      setIsScrollToLastMessage(false)
    }
  }, [isAutoScroll, isFetchedFirstMessages, isScrollToLastMessage, lastMessageEntry, setIsScrollToLastMessage])

  return null
})