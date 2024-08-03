'use client'

import { useTranslation } from '@/store'
import { Post as PostType } from '@/types'
import { Page, PageContent, PageHeader } from '@/ui'
import { Post } from './_elements'

const defaultValues = {
  id: '',
  title: '',
  text: '',
  imageUrls: [],
  published: false,
  translations: { ru: { title: '', text: '' } },
} as unknown as PostType

export default function NewPostPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <PageHeader>{t('newPost')}</PageHeader>
      <PageContent>
        <Post defaultValues={defaultValues} />
      </PageContent>
    </Page>
  )
}
