import { createArticle, updateArticle } from '../store/slices/articles'
import { loginUser, registerUser, updateUser } from '../store/slices/auth'
import { DataBodyType, FieldsType, UserBodyType } from '../types'

import { ARTICLE_FIELDS, EDIT_PROFILE_FIELDS, LOGIN_FIELDS, REGISTER_FIELDS } from './constatnts'
import { removeUndefined } from './helpers'

const loginData = {
  title: 'Sign In',
  fields: LOGIN_FIELDS,
  submitText: 'Login',
  subtitle: { text: 'Don’t have an account? ', link: '/sign-up', linkText: 'Sign Up.' },
  getData: (values: FieldsType) => {
    const { email: initialEmail, password } = values
    const email = initialEmail?.toLowerCase()
    const userData = { user: { email, password } }

    return { data: userData, action: loginUser, shouldValidate: true }
  },
}

const registerData = {
  title: 'Create new account',
  fields: REGISTER_FIELDS,
  submitText: 'Create',
  subtitle: { text: 'Already have an account? ', link: '/sign-in', linkText: 'Sign In.' },
  getData: (values: FieldsType) => {
    const { username, email: initialEmail, password } = values
    const email = initialEmail?.toLowerCase()
    const userData = { user: { username, email, password } } as DataBodyType

    return { data: userData, action: registerUser, shouldValidate: true }
  },
}

const profileData = {
  title: 'Edit Profile',
  fields: EDIT_PROFILE_FIELDS,
  submitText: 'Save',
  getData: (values: FieldsType) => {
    const { username, email, 'new-password': password, image } = values

    const data = { username, email, password, image } as UserBodyType

    const user = removeUndefined(data)
    const userData = { user } as DataBodyType

    return { data: userData, action: updateUser, shouldValidate: true, shouldNotify: true }
  },
}

const createArticleData = {
  title: 'Create new article',
  fields: ARTICLE_FIELDS,
  submitText: 'Send',
  getData: (values: FieldsType) => {
    const { description, title, text: body } = values
    const tagList = values.tagList?.filter(Boolean)
    const articleData = { article: { title, description, body, tagList } } as DataBodyType

    return { data: articleData, action: createArticle, pushInHistory: '/articles/' }
  },
}

const editArticleData = {
  title: 'Edit article',
  fields: ARTICLE_FIELDS,
  submitText: 'Send',
  getData: (values: FieldsType) => {
    const { description, title, text: body } = values
    const tagList = values.tagList?.filter(Boolean)
    const articleData = { article: { title, description, body, tagList } } as DataBodyType

    return { data: articleData, action: updateArticle, pushInHistory: '/articles/', withSlug: true }
  },
}

const valuesFor = {
  login: loginData,
  register: registerData,
  profile: profileData,
  'create-article': createArticleData,
  'edit-article': editArticleData,
}

export default valuesFor
