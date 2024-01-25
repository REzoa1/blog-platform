import React from 'react'
import { Form } from 'antd'

import FormWrapper from '../../components/FormWrapper/FormWrapper'

function SignIn() {
  const [form] = Form.useForm()

  return (
    <div className="wrapper">
      <FormWrapper name="login" form={form} />
    </div>
  )
}

export default SignIn
