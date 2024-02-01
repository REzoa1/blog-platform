import React from 'react'
import { Form, Spin } from 'antd'

import { useAppSelector } from '../../store'
import { selectAuth } from '../../store/slices/auth'
import { FieldsType } from '../../types'
import DynamicForm from '../../components/DynamicForm/DynamicForm'
import { hasValuesChanged } from '../../utils/helpers'

const { useForm, useWatch } = Form

function Profile() {
  const { userdata } = useAppSelector(selectAuth)
  const [form] = useForm()
  useWatch((values: FieldsType) => values, form)

  if (!userdata) {
    return <Spin className="spin" />
  }

  const { username, email, image } = userdata
  const initialValues = { username, email, image, 'new-password': '' } as { [key: string]: FieldsType }

  const disabled = hasValuesChanged(initialValues, form.getFieldsValue())

  return <DynamicForm name="profile" form={form} initialValues={initialValues} disabled={disabled} />
}

export default Profile
