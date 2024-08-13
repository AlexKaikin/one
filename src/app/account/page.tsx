import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent } from '@/ui'
import { UserForm } from './_elements'

async function getUser(id: string, urlParams: UrlParams) {
  try {
    const { data } = await UserService.getOne(id, urlParams)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function Account(urlParams: UrlParams) {
  const session = await getServerSession(authOptions)
  const user = await getUser(session!.user.id, urlParams)

  if (!user) {
    return null
  }

  return (
    <Page>
      <PageContent>
        <UserForm defaultValues={user} />
      </PageContent>
    </Page>
  )
}
