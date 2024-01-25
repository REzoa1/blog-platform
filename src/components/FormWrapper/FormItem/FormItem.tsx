import React from 'react'
import { Checkbox, Form, Input, FormInstance } from 'antd'
import { Rule } from 'antd/es/form'

type PropsType = {
  name: 'username' | 'email' | 'password' | 'repeat-password' | 'new-password' | 'image' | 'remember'
  required?: boolean
}

type ValuesType = {
  label: string
  component: JSX.Element
  rules: Rule[]
}

function FormItem({ name, required }: PropsType) {
  const message = name === 'repeat-password' ? 'Please repeat your password!' : `Please input your ${name}!`
  const rulesInitial = [required ? { required, message } : {}]

  const passwordRules = [
    ...rulesInitial,
    { min: 6, message: 'Your password needs to be at least 6 characters!' },
    { max: 40, message: 'Your password can’t be more than 40 characters!' },
  ]

  const valuesFor = {
    username: {
      label: 'Username',
      component: <Input placeholder="Username" />,
      rules: [
        ...rulesInitial,
        { min: 3, message: 'The username needs to be at least 3 characters!' },
        { max: 20, message: 'The username can’t be more than 20 characters!' },
      ],
    },
    email: {
      label: 'Email address',
      component: <Input placeholder="Email address" />,
      rules: [...rulesInitial, { type: 'email', message: 'Please enter a valid email address!' }],
    },
    password: {
      label: 'Password',
      component: <Input.Password placeholder="Password" autoComplete="on" />,
      rules: passwordRules,
    },
    'repeat-password': {
      label: 'Repeat Password',
      component: <Input.Password placeholder="Repeat Password" autoComplete="on" />,
      rules: [
        ...passwordRules,
        ({ getFieldValue }: FormInstance) => ({
          validator(_: Rule, value: string) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Passwords must match!'))
          },
        }),
      ],
    },
    'new-password': {
      label: 'New Password',
      component: <Input.Password placeholder="New Password" autoComplete="on" />,
      rules: passwordRules,
    },
    image: {
      label: 'Avatar image (url)',
      component: <Input placeholder="Avatar image" />,
      rules: rulesInitial,
    },
    remember: {
      label: null,
      component: <Checkbox>I agree to the processing of my personal information</Checkbox>,
      rules: [
        {
          validator: (_: Rule, value: boolean | undefined) =>
            value ? Promise.resolve() : Promise.reject(new Error('Please confirm!')),
        },
      ],
    },
  }

  const values = valuesFor[name] as ValuesType
  const { label, component, rules } = values
  const valuePropName = name === 'remember' ? 'checked' : undefined

  return (
    <Form.Item name={name} label={label} rules={rules} valuePropName={valuePropName}>
      {component}
    </Form.Item>
  )
}

FormItem.defaultProps = {
  required: true,
}

export default FormItem
