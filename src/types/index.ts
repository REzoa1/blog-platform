import { ActionCreator } from '@reduxjs/toolkit'
import { MenuProps } from 'antd'
import { ReactNode } from 'react'
import { Rule } from 'antd/es/form'

export type StatusType = 'idle' | 'loading' | 'failed' | 'success'

export type ArticlesState = {
  articles: ArticleType[]
  article: ArticleType | null

  total: number
  page: number
  errCode: number | null
  status: StatusType
}

type UserDataType = {
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export type AuthState = { token: string; isLoggedIn: boolean; userdata: UserDataType | null; status: StatusType }

export type StatesType = { articles: ArticlesState; auth: AuthState }

export type ItemNameType =
  | 'username'
  | 'email'
  | 'password'
  | 'repeat-password'
  | 'new-password'
  | 'image'
  | 'remember'
  | 'title'
  | 'description'
  | 'text'
  | 'tags'

export type FieldType = ItemNameType | 'divider'

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

type ArticleBodyType = {
  title: string
  description: string
  body: string
  tagList: string[]
}

export type UserBodyType = {
  username: string
  email: string
  password: string
  image?: string
}

export type DataBodyType = { [name: string]: ArticleBodyType | UserBodyType }

export type FieldsType = {
  username?: string
  email?: string
  password?: string
  'repeat-password'?: string
  image?: string
  'new-password'?: string

  title?: string
  text?: string
  description?: string
  tagList?: string[]
}

export type FormValuesType = {
  title: string
  fields: FieldType[]
  submitText: string
  subtitle?: { text: string; link: string; linkText: string }
  getData: (values: FieldsType) => ReturnedValue
}

export type FormItemValuesType = {
  label: string
  type: React.FC
  props?: object
  children?: ReactNode
  rules?: Rule[]
}

export type MenuItemType = Required<MenuProps>['items'][number]

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PayloadAction = {
  payload: any
  meta?: any
  error?: any
}
export type ReturnedValue = {
  data: DataBodyType
  action: ActionCreator<any>
  shouldValidate?: boolean
  shouldNotify?: boolean
  pushInHistory?: string
  withSlug?: boolean
}
