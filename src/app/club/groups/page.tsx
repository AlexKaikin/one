import { PROFILE_TYPES } from '@/constants'
import { ApiError } from '@/helpers'
import { ProfileService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, PageHeader, Pagination } from '@/ui'
import styles from '../users/page.module.css'
import { AddGroupButton } from './_elements/AddGroupButton/AddGroupButton'
import { ProfilePreview } from '../_elements'

async function getUsers(urlParams: UrlParams) {
  try {
    urlParams.searchParams.populate = 'user'
    urlParams.searchParams.type = PROFILE_TYPES.GROUP
    const response = await ProfileService.getAll(urlParams)
    const profiles = response.data
    const totalCount = response.headers['x-total-count']

    return { profiles, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function GroupsPage(urlParams: UrlParams) {
  const data = await getUsers(urlParams)

  if (!data)
    return (
      <Page>
        <PageHeader>
          <AddGroupButton />
        </PageHeader>
      </Page>
    )

  const { profiles, totalCount } = data

  return (
    <Page>
      <PageHeader>
        <AddGroupButton />
      </PageHeader>

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
