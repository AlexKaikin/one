import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { UserService } from '@/services'
import { Page, PageContent } from '@/ui'
import { UserForm } from './_elements'

async function getUser(id: string) {
  try {
    const { data } = await UserService.getOne(id)
    return data
  } catch (error) {
    console.log('error')
  }
}

export default async function Account() {
  const session = await getServerSession(authOptions)
  const user = await getUser(session.user.id)

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
