import { Checkbox, Input } from 'antd'

import TagList from '../components/FormItem/TagList/TagList'

import {
  EMAIL_RULES,
  IMAGE_RULES,
  PASSWORD_RULES,
  REMEMBER_RULES,
  REPEAT_PASSWORD_RULES,
  USERNAME_RULES,
} from './constatnts'

const { TextArea } = Input

const valuesFor = {
  username: {
    label: 'Username',
    type: Input,
    props: { placeholder: 'Username' },
    rules: USERNAME_RULES,
  },

  email: {
    label: 'Email address',
    type: Input,
    props: { placeholder: 'Email address' },
    rules: EMAIL_RULES,
  },

  password: {
    label: 'Password',
    type: Input.Password,
    props: { placeholder: 'Password', autoComplete: 'on' },
    rules: PASSWORD_RULES,
  },

  'repeat-password': {
    label: 'Repeat Password',
    type: Input.Password,
    props: { placeholder: 'Repeat Password', autoComplete: 'on' },
    rules: REPEAT_PASSWORD_RULES,
  },

  'new-password': {
    label: 'New Password',
    type: Input.Password,
    props: { placeholder: 'New Password', autoComplete: 'on' },
    rules: PASSWORD_RULES,
  },

  image: {
    label: 'Avatar image (url)',
    type: Input,
    props: { placeholder: 'Avatar image' },
    rules: IMAGE_RULES,
  },

  remember: {
    label: null,
    type: Checkbox,
    children: 'I agree to the processing of my personal information',
    rules: REMEMBER_RULES,
  },

  title: { label: 'Title', type: Input, props: { placeholder: 'Title' } },

  description: {
    label: 'Short description',
    type: Input,
    props: { placeholder: 'Short description' },
  },

  text: {
    label: 'Text',
    type: TextArea,
    props: { rows: 7, placeholder: 'Text' },
  },

  tags: {
    label: 'Tags',
    type: TagList,
  },
}

export default valuesFor
