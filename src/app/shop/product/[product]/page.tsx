import { ApiError } from '@/helpers';
import { ProductService, ReviewService } from '@/services';
import { UrlParams } from '@/types';
import { Page, PageContent } from '@/ui';
import { Product } from './_elements/Product/Product';


async function getProduct(id: string) {
  try {
    const { data } = await ProductService.getOne(id)
    return data
  } catch (error) {
    ApiError(error)
  }
}

async function getReviews(productId: string) {
  try {
    const { data } = await ReviewService.getAllbyProduct(productId)

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ProductPage(urlParams: UrlParams) {
  const productsData = await getProduct(urlParams.params!.product!)
  const reviewsData = await getReviews(urlParams.params!.product!)
  const [product, reviews] = await Promise.all([productsData, reviewsData])

  if (!product || !reviews) {
    return null
  }

  return (
    <Page>
      <PageContent>
        <Product product={product} reviews={reviews} />
      </PageContent>
    </Page>
  )
}