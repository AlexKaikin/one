'use client'

import { useState } from 'react'
import { toFormData } from 'axios'
import { useRouter } from 'next/navigation'
import { PostService } from '@/services'
import { useTranslation } from '@/store'
import { Post as PostType } from '@/types'
import { Page, PageContent, PageHeader, ImageLoader, useNotify } from '@/ui'
import { PostForm } from '../../../_elements'

export function Post({ defaultValues }: { defaultValues: PostType }) {
  const { t } = useTranslation()
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
      await PostService.update(
        defaultValues.id,
        toFormData(body) as unknown as PostType
      )
      notify({ type: 'success', message: 'Completed successfully' })

      router.refresh()
    } catch (error) {
      notify({ type: 'error', message: 'Update error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <PageHeader>{t('editing')}</PageHeader>
      <PageContent>
        <ImageLoader loading={loading} />
        <PostForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </PageContent>
    </Page>
  )
}
