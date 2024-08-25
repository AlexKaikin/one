'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ProfileSettingsForm } from '@/app/club/_elements'
import { ApiError } from '@/helpers'
import { ProfileService } from '@/services'
import { Profile, UrlParams } from '@/types'
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
     const response = await ProfileService.create(data as unknown as Profile)
      router.push(`/club/groups/${response.data.id}`)
     
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