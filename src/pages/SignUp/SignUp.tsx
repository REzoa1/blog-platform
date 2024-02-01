import React from 'react'
import { Form } from 'antd'

import DynamicForm from '../../components/DynamicForm/DynamicForm'

function SignUp() {
  const [form] = Form.useForm()

  return <DynamicForm name="register" form={form} />
}

export default SignUp
