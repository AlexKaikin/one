import { Order } from '@/app/_elements'
import { ApiError } from '@/helpers'
import { OrderService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent } from '@/ui'

async function getOrder(id: string) {
  try {
    const { data } = await OrderService.getOne(id)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function OrderPage(urlParams: UrlParams) {
  const order = await getOrder(urlParams.params!.order!)

  if (!order) return null

  return (
    <Page>
      <PageContent>
        <Order order={order} />
      </PageContent>
    </Page>
  )
}
