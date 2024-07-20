import { ApiError } from '@/helpers'
import { ReviewService } from '@/services'
import { UrlParams } from '@/types'
import { ReviewForm } from './_elements/ReviewForm/ReviewForm'

async function getReview(id: string, urlParams: UrlParams) {
  try {
    const { data } = await ReviewService.getOne(id, urlParams)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ReviewPage(urlParams: UrlParams) {
  urlParams.searchParams.populate = 'product user'
  const review = await getReview(urlParams.params!.review!, urlParams)

  if (!review) {
    return null
  }

  return <ReviewForm review={review} />
}