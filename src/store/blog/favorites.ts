'use client'

import { create } from 'zustand'
import { getLocalStorage } from '@/helpers'
import { Post } from '@/types'

export type Favorites = {
  favoritesItems: Post[]
  getFavoritePosts: () => void
  toggleFavorite: (post: Post) => void
}

export const useFavoritePosts = create<Favorites>()(set => ({
  favoritesItems: [],
  getFavoritePosts: () =>
    set(() => ({ favoritesItems: getLocalStorage('favoritePosts') || [] })),
  toggleFavorite: post => {
    set(() => ({ favoritesItems: handleToggleFavorite(post) }))
  },
}))

function handleToggleFavorite(post: Post) {
  const favoriteItems: Post[] = getLocalStorage('favoritePosts') || []
  const findPost = favoriteItems.find(item => item.id === post.id)

  if (!findPost) {
    favoriteItems.push(post)
    localStorage.setItem('favoritePosts', JSON.stringify(favoriteItems))

    return [...favoriteItems]
  } else {
    favoriteItems.splice(favoriteItems.indexOf(findPost), 1)
    localStorage.setItem('favoritePosts', JSON.stringify(favoriteItems))

    return [...favoriteItems]
  }
}
