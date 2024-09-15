export type UrlParams = {
  params?: {
    id?: string
    user?: string
    profile?: string
    group?: string
    post?: string
    product?: string
    category?: string
    review?: string
    order?: string
    comment?: string
  }
  searchParams: {
    page?: string
    limit?: string
    category?: string
    q?: string
    by?: string
    populate?: string
    published?: string
    product?: string
    post?: string
    status?: string
    user?: string
    profile?: string
    chat?: string
    prev?: string
    next?: string
    id_nin?: string
    type?: string
  }
}
