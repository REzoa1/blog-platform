import { AsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { MenuProps } from 'antd'
import { ReactNode } from 'react'
import { Rule } from 'antd/es/form'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'

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

export type FormItemType =
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

export type FieldType = FormItemType | 'divider'

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

type UserBodyType = {
  username: string
  email: string
  password: string
  image?: string
}

export type DataType = { user: UserBodyType } | { article: ArticleBodyType }

export type LoginFields = { email: string; password: string }
export type RegisterFields = {
  username: string
  email: string
  password: string
  'repeat-password': string
  divider: string
  remember: string
}
export type EditProfileFields = { username: string; email: string; 'new-password': string; image: string }
export type ArticleFields = { title: string; description: string; text: string; tagList: string[] }

export type FieldsType = LoginFields | RegisterFields | EditProfileFields | ArticleFields

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

export type FormPayloadType = PayloadAction<unknown, string, { requestStatus: string }>

export type ReturnedValue = {
  data: DataType
  action: AsyncThunk<DataType, DataType | { slug: string; data: DataType }, AsyncThunkConfig>
  shouldValidate?: boolean
  shouldNotify?: boolean
  pushInHistory?: string
  withSlug?: boolean
}
