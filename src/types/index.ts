export type StatusType = 'idle' | 'loading' | 'failed' | 'success'

type AuthorType = {
  username: string
  image: string
  following: boolean
}

export type ArticleType = {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: AuthorType
}
