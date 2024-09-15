'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Page, PageContent, Stack } from '@/ui'
import styles from './Messenger.module.css'
import { TriggersProvider, MessengerProvider } from './context'
import { Messages, CreateMessageForm, Chats, Search, ChatHeader, ScrollDownButton } from './elements'
import { MessagesReadWatcher } from './elements/MessagesReadWatcher/MessagesReadWatcher'
import { NewMessageWatcher } from './elements/NewMessageWatcher/NewMessageWatcher'

export function Messenger() {
  const searchParams = useSearchParams()
  const { data } = useSession()
  const activeChat = searchParams.get('chat')

  if (!data) {
    return null
  }

  return (
    <Page>
      <PageContent>
        <MessengerProvider>
          <TriggersProvider>
            <NewMessageWatcher />
            <MessagesReadWatcher />

            <div className={styles.messenger}>
              <Stack flexDirection="column" spacing={2}>
                <Search />
                <Chats />
              </Stack>

              {activeChat ? (
                <div className={styles.chat}>
                  <ChatHeader />
                  <Messages />
                  <ScrollDownButton />
                  <CreateMessageForm userId={data.user.id} />
                </div>
              ) : (
                <div className={styles.chat}>Выберите чат</div>
              )}
            </div>
          </TriggersProvider>
        </MessengerProvider>
      </PageContent>
    </Page>
  )
}
