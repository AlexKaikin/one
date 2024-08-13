import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, Pagination } from '@/ui'
import { UserPreview } from './_elements'
import styles from './page.module.css'

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
        <div className={styles.users}>
          {users.map(user => (
            <UserPreview key={user.id} user={user} />
          ))}
        </div>

        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
