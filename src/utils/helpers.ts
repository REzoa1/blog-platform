import { SyntheticEvent } from 'react'
import { FormInstance } from 'antd'

import { PayloadAction } from '../types'

import { DEFAULT_IMAGE } from './constatnts'

const cn = (...classes: Array<boolean | string>) => [...classes].filter(Boolean).join(' ')

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1)
}

const getString = (errs: Array<string>) => {
  const [key, val] = errs
  return `${capitalize(key)} ${val}`
}

const validateData = (
  data: PayloadAction,
  setErrors: (arg: Array<string>) => void,
  form: FormInstance,
  history: { push: (arg: string) => void } | null = null
) => {
  const status = data.meta.requestStatus
  const errs = data.payload

  if (status === 'rejected') {
    const entries = Object.entries(errs)

    const values = entries.map((el) => {
      const [key, val] = el as string[]
      const fields = Object.keys(form.getFieldsValue())
      const isFieldHasKey = fields.includes(key)

      if (isFieldHasKey) {
        return { name: key, errors: [getString([key, val])] }
      }

      setErrors([getString([key, val])])
      return []
    })

    form.setFields(values.flat())
  }

  if (history && status === 'fulfilled') {
    history?.push('/')
  }
}

const removeUndefined = (data: { [key: string]: string }) => {
  return Object.keys(data).reduce((acc, key) => (data[key] ? { ...acc, [key]: data[key] } : { ...acc }), {})
}

const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  // eslint-disable-next-line no-param-reassign
  e.currentTarget.src = DEFAULT_IMAGE
}

export { cn, validateData, removeUndefined, onImageError }
