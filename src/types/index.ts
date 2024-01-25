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

export type BodyType = {
  username?: string
  email: string
  password: string
  image?: string
}

export type UserBodyType = { user: BodyType }

export type FieldsType = {
  username?: string
  email: string
  password?: string
  'repeat-password'?: string
  image?: string
  'new-password'?: string
}

export type UserDataType = {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PayloadAction = {
  payload: any
  meta?: any
  error?: any
}
