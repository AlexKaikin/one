import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { PROFILE_TYPES } from '@/constants'
import { ApiError } from '@/helpers'
import { ProfileService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, Pagination } from '@/ui'
import { ProfilePreview } from './_elements'
import styles from './page.module.css'

async function getUsers(urlParams: UrlParams) {
  try {
    const session = await getServerSession(authOptions)
    urlParams.searchParams.populate = 'user'
    urlParams.searchParams.type = PROFILE_TYPES.USER
    urlParams.searchParams.id_nin = session!.user.profile
    const response = await ProfileService.getAll(urlParams)
    const profiles = response.data
    const totalCount = response.headers['x-total-count']

    return { profiles, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function UsersPage(urlParams: UrlParams) {
  const data = await getUsers(urlParams)

  if (!data) return null

  const { profiles, totalCount } = data

  return (
    <Page>
      <PageContent>
        <div className={styles.users}>
          {profiles.map(profile => (
            <ProfilePreview key={profile.id} profile={profile} />
          ))}
        </div>

        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
