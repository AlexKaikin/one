import { getServerSession } from 'next-auth'
import { Orders } from '@/app/_elements'
import { Reviews } from '@/app/_elements/Reviews/Reviews'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { OrderService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, Pagination } from '@/ui'

async function getOrders(urlParams: UrlParams) {
  try {
    const response = await OrderService.getAll(urlParams)
    const orders = response.data
    const totalCount = response.headers['x-total-count']

    return { orders, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function OrdersPage(urlParams: UrlParams) {
  const session = await getServerSession(authOptions)
  urlParams.searchParams.user = session?.user.id
  const data = await getOrders(urlParams)

  if (!data) {
    return null
  }

  const { orders, totalCount } = data

  return (
    <Page>
      <PageContent>
        <Orders orders={orders} />
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
