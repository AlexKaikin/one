export type UrlParams = {
  params?: {
    id?: string
    user?: string
    post?: string
    product?: string
    category?: string
    review?: string
    order?: string
    comment?: string
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
    post?: string
    status?: string
    user?: string
  }
}
