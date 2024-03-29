import React from 'react'
import { Form } from 'antd'

import DynamicForm from '../../components/DynamicForm/DynamicForm'

function SignIn() {
  const [form] = Form.useForm()

  return <DynamicForm name="login" form={form} />
}

export default SignIn
