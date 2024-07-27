export type UrlParams = {
  params?: {
    id?: string
    post?: string
    product?: string
    category?: string
    review?: string
    order?: string
  }
  searchParams: {
    _page?: string
    _limit?: string
    category?: string
    q?: string
    by?: string
    populate?: string
    published?: string
    product?: string
    status?: string
    user?: string
  }
}
