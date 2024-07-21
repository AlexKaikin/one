import { ApiError } from '@/helpers';
import { ReviewService } from '@/services';
import { UrlParams } from '@/types';
import { Page, PageContent, Pagination } from '@/ui';
import { Reviews } from './_elements/Reviews/Reviews';


async function getReviews(urlParams: UrlParams) {
  try {
    const response = await ReviewService.getAll(urlParams)
    const reviews = response.data
    const totalCount = response.headers['x-total-count']

    return { reviews, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function ReviewsPage(urlParams: UrlParams) {
  urlParams.searchParams.status = 'all'
  const data = await getReviews(urlParams)

  if (!data) {
    return null
  }

  const { reviews, totalCount } = data

  return (
    <Page>
      <PageContent>
        <Reviews reviews={reviews} />
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}