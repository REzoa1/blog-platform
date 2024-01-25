import React from 'react'
import { Form } from 'antd'

import FormWrapper from '../../components/FormWrapper/FormWrapper'

function SignUp() {
  const [form] = Form.useForm()

  return (
    <div className="wrapper">
      <FormWrapper name="register" form={form} />
    </div>
  )
}

export default SignUp
