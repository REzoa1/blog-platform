import React, { FC, useState } from 'react'
import { Button, Divider, Form, FormInstance, notification } from 'antd'
import { Link, useHistory, useParams } from 'react-router-dom'

import { FieldType, FieldsType, FormPayloadType, FormValuesType } from '../../types'
import { useAppDispatch } from '../../store'
import { cn, getErrors, getFieldProps, openSuccessModal } from '../../utils/helpers'
import valuesFor from '../../utils/formData'
import FormItem from '../FormItem/FormItem'

import styles from './DynamicForm.module.scss'

type PropsType = {
  name: 'login' | 'register' | 'profile' | 'create-article' | 'edit-article'
  form: FormInstance
  initialValues?: FieldsType | object
  disabled?: boolean
}

const { useNotification } = notification

function DynamicForm({ name, form, initialValues = {}, disabled = false }: PropsType) {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { slug } = useParams<{ slug: string }>()
  const [api, contextHolder] = useNotification({ maxCount: 1 })
  const [errors, setErrors] = useState<string[]>([])

  const { title, fields, submitText, subtitle, getData } = valuesFor[name] as FormValuesType

  const body = fields.map((field: FieldType) => {
    const initialProps = getFieldProps(field)
    const props = initialProps.className ? { ...initialProps, className: styles[initialProps.className] } : initialProps

    const type = field === 'divider' ? Divider : FormItem

    return React.createElement(type as FC, props)
  })

  const onFinish = (values: FieldsType) => {
    setErrors([])
    const { data, action, shouldValidate, shouldNotify, pushInHistory, withSlug } = getData(values)
    const finalData = withSlug ? { slug, data } : data

    dispatch(action(finalData)).then(({ payload, meta }: FormPayloadType) => {
      const status = meta.requestStatus

      if (shouldValidate && status === 'rejected') {
        const { fieldsErrors, unknownErrors } = getErrors(payload as Record<string, string>, fields)

        if (fieldsErrors.length) {
          form.setFields(fieldsErrors)
        }
        if (unknownErrors.length) {
          setErrors(unknownErrors)
        }
      }

      if (shouldNotify && status === 'fulfilled') {
        form.setFieldValue('new-password', '')
        openSuccessModal(api)
      }

      if (pushInHistory) {
        const path = withSlug ? `${pushInHistory}${slug}` : pushInHistory
        history.push(path)
      }
    })
  }

  const isArticleForm = name.includes('article')
  const formCN = cn(styles.form, isArticleForm && styles.articleForm)
  const submitCN = cn(styles.btn, isArticleForm && styles.articleBtn)

  const isLoginPage = name === 'login'

  return (
    <Form
      form={form}
      className={formCN}
      layout="vertical"
      name={name}
      requiredMark={false}
      onFinish={onFinish}
      initialValues={initialValues}
      validateTrigger={isLoginPage ? [] : ['onChange']}
    >
      {contextHolder}

      <h2 className={styles.title}>{title}</h2>
      {body}

      {errors.length !== 0 && <Form.ErrorList className={styles.errors} errors={errors} />}

      <div className={styles.footer}>
        <Button className={submitCN} type="primary" htmlType="submit" disabled={disabled}>
          {submitText}
        </Button>

        {subtitle && (
          <span>
            {subtitle.text}
            <Link to={subtitle.link}>{subtitle.linkText}</Link>
          </span>
        )}
      </div>
    </Form>
  )
}

export default DynamicForm
