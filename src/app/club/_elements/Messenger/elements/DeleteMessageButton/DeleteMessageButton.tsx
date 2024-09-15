'use client'

import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MessageService } from '@/services'
import { Icon, IconButton, useNotify } from '@/ui'
import { MessengerContext, MessengerContextType } from '../../context'

type Props = {
  id: string
  sender: string
}

export function DeleteMessageButton({ id, sender }: Props) {
  const { setMessages } = useContext(MessengerContext) as MessengerContextType
  const { data } = useSession()
  const { notify } = useNotify()

  const remove = async () => {
    try {
      await MessageService.delete(id)
      setMessages(prev => prev.filter(message => message.id !== id))
    } catch (error) {
      notify({ type: 'error', message: 'Error' })
    }
  }

  if (data?.user.id !== sender) {
    return null
  }

  return (
    <div>
      <IconButton onClick={remove}>
        <Icon name="trash" width={16} height={16} />
      </IconButton>
    </div>
  )
}
