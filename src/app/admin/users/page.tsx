import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, Pagination } from '@/ui'
import { Users } from './_elements'

async function getUsers(urlParams: UrlParams) {
  try {
    const response = await UserService.getAll(urlParams)
    const users = response.data
    const totalCount = response.headers['x-total-count']

    return { users, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function UsersPage(urlParams: UrlParams) {
  const data = await getUsers(urlParams)

  if (!data) return null

  const { users, totalCount } = data

  return (
    <Page>
      <PageContent>
        <Users users={users} />
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
