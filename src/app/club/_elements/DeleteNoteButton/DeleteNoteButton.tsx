'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { NoteService } from '@/services'
import { Profile } from '@/types'
import { Icon, IconButton, useNotify } from '@/ui'

type Props = {
  profile: Profile
  id: string
}

export function DeleteNoteButton({ profile, id }: Props) {
  const { data } = useSession()
  const { notify } = useNotify()
  const { refresh } = useRouter()

  const deleteNote = async () => {
    try {
      await NoteService.delete(id)
      refresh()
    } catch (error) {
      notify({ type: 'error', message: 'Error' })
    }
  }

  return (
    <div>
      {profile.user.id === data?.user.id && (
        // <div className={styles.delete}>
        <IconButton onClick={deleteNote}>
          <Icon name="trash" width={16} height={16} />
        </IconButton>
        // </div>
      )}
    </div>
  )
}
