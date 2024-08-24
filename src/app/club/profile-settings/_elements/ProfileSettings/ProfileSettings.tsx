'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileSettingsForm } from '@/app/club/_elements'
import { ProfileService } from '@/services'
import { Profile } from '@/types'
import { useNotify } from '@/ui'

export function ProfileSettings({ defaultValues }: { defaultValues: Profile }) {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotify()
  const router = useRouter()

  const handleSubmit = async (
    data: Profile & { files: FileList | null; destroyImageUrls: string[] }
  ) => {
    if (!!data.files?.length) {
      setLoading(true)
    }

    try {
      const { files, destroyImageUrls, ...rest } = data
      await ProfileService.update(defaultValues.id, data as unknown as Profile)
      router.refresh()
      //   reset(rest)
      notify({ type: 'success', message: 'Completed successfully' })
    } catch (error) {
      notify({ type: 'error', message: 'Error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProfileSettingsForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      loading={loading}
    />
  )
}
