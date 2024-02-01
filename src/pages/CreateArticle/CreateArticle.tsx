import React from 'react'
import { Form } from 'antd'

import DynamicForm from '../../components/DynamicForm/DynamicForm'

function CreateArticle() {
  const [form] = Form.useForm()

  return <DynamicForm name="create-article" form={form} />
}

export default CreateArticle
