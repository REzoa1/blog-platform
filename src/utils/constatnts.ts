import { FormInstance } from 'antd'
import { Rule } from 'antd/es/form'

const API_BASE = 'https://blog.kata.academy/api'

const PAGE_SIZE = 5

const DEFAULT_IMAGE = 'https://static.productionready.io/images/smiley-cyrus.jpg'

const THEME_TOKENS = {
  token: {
    fontFamily:
      '-apple-system, "DM Sans", "Inter", BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  components: {
    Pagination: {
      itemActiveBg: '#1890ff',
      colorPrimary: '#fff',
      colorPrimaryHover: '#fff',
      itemSize: 22,
    },
    Form: {
      itemMarginBottom: 12,
    },
    Divider: {
      orientationMargin: 1,
      verticalMarginInline: 1,
    },
  },
}

/* ============================== FIELDS ============================== */

const remember = { itemName: 'remember', required: false }
const newPassword = { itemName: 'new-password', required: false }
const image = { itemName: 'image', required: false }

const LOGIN_FIELDS = ['email', 'password']
const REGISTER_FIELDS = ['username', 'email', 'password', 'repeat-password', 'divider', remember]
const EDIT_PROFILE_FIELDS = ['username', 'email', newPassword, image]
const ARTICLE_FIELDS = ['title', 'description', 'text', 'tags']

/* ============================== RULES ============================== */

const USERNAME_RULES = [
  { min: 3, message: 'The username needs to be at least 3 characters!' },
  { max: 20, message: 'The username can’t be more than 20 characters!' },
]
const PASSWORD_RULES = [
  { min: 6, message: 'Your password needs to be at least 6 characters!' },
  { max: 40, message: 'Your password can’t be more than 40 characters!' },
]
const EMAIL_RULES = [{ type: 'email', message: 'Please enter a valid email address!' }]
const REPEAT_PASSWORD_RULES = [
  ...PASSWORD_RULES,
  ({ getFieldValue }: FormInstance) => ({
    validator(_: Rule, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Passwords must match!'))
    },
  }),
]
const IMAGE_RULES = [{ type: 'url', message: 'Avatar image is not a valid url' }]
const REMEMBER_RULES = [
  {
    validator: (_: Rule, value: boolean | undefined) =>
      value ? Promise.resolve() : Promise.reject(new Error('Please confirm!')),
  },
]

export {
  API_BASE,
  PAGE_SIZE,
  DEFAULT_IMAGE,
  THEME_TOKENS,
  LOGIN_FIELDS,
  REGISTER_FIELDS,
  EDIT_PROFILE_FIELDS,
  ARTICLE_FIELDS,
  USERNAME_RULES,
  PASSWORD_RULES,
  EMAIL_RULES,
  REPEAT_PASSWORD_RULES,
  IMAGE_RULES,
  REMEMBER_RULES,
}
