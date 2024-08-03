'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toFormData } from '@/helpers'
import { PostService } from '@/services'
import { Post as PostType } from '@/types'
import { ImageLoader, useNotify } from '@/ui'
import { PostForm } from '../../../_elements'

export function Post({ defaultValues }: { defaultValues: PostType }) {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotify()
  const router = useRouter()

  const onSubmit = async (
    data: PostType & { files: FileList | null; destroyImageUrls: string[] }
  ) => {
    if (!!data.files?.length) {
      setLoading(true)
    }

    try {
      const { id, ...body } = data
      const response = await PostService.create(
        toFormData(body) as unknown as PostType
      )

      notify({ type: 'success', message: 'Completed successfully' })
      router.push(`/admin/posts/${response.data.id}`)
      router.refresh()
    } catch (error) {
      notify({ type: 'error', message: 'Update error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ImageLoader loading={loading} />
      <PostForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  )
}
