import React from 'react'
import { Form } from 'antd'

import { FormItemValuesType, FormItemType } from '../../types'
import valuesFor from '../../utils/formItemData'

type PropsType = {
  name: FormItemType
  required?: boolean
}

function FormItem({ name, required }: PropsType) {
  const { label, type, props, children, rules = [] } = valuesFor[name] as FormItemValuesType

  const message = name === 'repeat-password' ? 'Please repeat your password!' : `Please input ${name}!`
  const finalRules = required ? [{ required, message }, ...rules] : rules

  const valuePropName = name === 'remember' ? 'checked' : undefined

  return (
    <Form.Item name={name !== 'tags' ? name : undefined} label={label} rules={finalRules} valuePropName={valuePropName}>
      {React.createElement(type, props, children)}
    </Form.Item>
  )
}

FormItem.defaultProps = {
  required: false,
}

export default FormItem
