export type UrlParams = {
  params?: {
    id?: string
    post?: string
    product?: string
    category?: string
  }
  searchParams: {
    _page?: string
    _limit?: string
    category?: string
    q?: string
    by?: string
  }
}
