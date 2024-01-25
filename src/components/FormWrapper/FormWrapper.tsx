import React, { useState } from 'react'
import { Button, Divider, Form, FormInstance, Typography, notification } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { BodyType, FieldsType, UserBodyType } from '../../types'
import { removeUndefined, validateData } from '../../utils/helpers'
import { useAppDispatch } from '../../store'
import { loginUser, registerUser, updateUser } from '../../store/slices/auth'

import FormItem from './FormItem/FormItem'
import s from './FormWrapper.module.scss'

type PropsType = {
  name: 'login' | 'register' | 'profile'
  form: FormInstance
}

type ValuesType = {
  title: string
  body: JSX.Element
  submitText: string
  subtitle?: JSX.Element
  onSubmit: (arg: FieldsType) => void
}

const { Text } = Typography
const { useNotification } = notification

function FormWrapper({ name, form }: PropsType) {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<string[]>([])
  const [api, contextHolder] = useNotification({ maxCount: 1 })

  const valuesFor = {
    login: {
      title: 'Sign In',
      body: (
        <>
          <FormItem name="email" />
          <FormItem name="password" />
        </>
      ),
      submitText: 'Login',
      subtitle: (
        <span>
          Don&#8217;t have an account? <Link to="/sign-up">Sign Up.</Link>
        </span>
      ),
      onSubmit: (values: FieldsType) => {
        const { email, password } = values
        const userData = { user: { email, password } } as UserBodyType

        dispatch(loginUser(userData)).then((newData) => validateData(newData, setErrors, form, history))
      },
    },
    register: {
      title: 'Create new account',
      body: (
        <>
          <FormItem name="username" />
          <FormItem name="email" />
          <FormItem name="password" />
          <FormItem name="repeat-password" />

          <Divider className={s.divider} />
          <FormItem name="remember" />
        </>
      ),
      submitText: 'Create',
      subtitle: (
        <span>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </span>
      ),
      onSubmit: (values: FieldsType) => {
        const { username, email, password } = values
        const userData = { user: { username, email, password } } as UserBodyType

        dispatch(registerUser(userData)).then((newData) => validateData(newData, setErrors, form, history))
      },
    },
    profile: {
      title: 'Edit Profile',
      body: (
        <>
          <FormItem name="username" />
          <FormItem name="email" />
          <FormItem name="new-password" required={false} />
          <FormItem name="image" required={false} />
        </>
      ),
      submitText: 'Save',
      onSubmit: (values: FieldsType) => {
        const { username, email, 'new-password': password, image } = values

        const data = { username, email, password, image } as BodyType

        const user = removeUndefined(data)
        const userData = { user } as UserBodyType
        dispatch(updateUser(userData)).then((newData) => {
          validateData(newData, setErrors, form)
          const status = newData.meta.requestStatus

          if (status === 'fulfilled') {
            form.setFieldValue('new-password', '')

            api.open({
              placement: 'top',
              duration: 2,
              type: 'success',
              message: 'Succes',
              description: 'The changes have been accepted',
              closeIcon: false,
            })
          }
        })
      },
    },
  }

  const { title, body, submitText, subtitle, onSubmit } = valuesFor[name] as ValuesType

  const onFinish = (values: FieldsType) => {
    setErrors([])
    onSubmit(values)
  }

  const errorsList = errors.map((err: string, i: number) => {
    const key = `${err}${i}`
    return (
      <Text key={key} className="text-center" type="danger">
        {err}
      </Text>
    )
  })

  return (
    <Form form={form} className={s.form} layout="vertical" name={name} requiredMark={false} onFinish={onFinish}>
      {contextHolder}
      <h2 className={s.title}>{title}</h2>

      {body}

      {errors.length !== 0 && errorsList}

      <div className={s.lastItem}>
        <Button className={s.btn} type="primary" htmlType="submit">
          {submitText}
        </Button>
        {subtitle}
      </div>
    </Form>
  )
}

export default FormWrapper
