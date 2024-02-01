import { SyntheticEvent } from 'react'
import { NotificationInstance } from 'antd/es/notification/interface'

import { FieldType, FieldsType, MenuItemType, PayloadAction, UserBodyType } from '../types'

import { DEFAULT_IMAGE } from './constatnts'

const cn = (...classes: Array<boolean | string>) => [...classes].filter(Boolean).join(' ')

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1)
}

const getString = (errs: Array<string>) => {
  const [key, val] = errs
  return `${capitalize(key)} ${val}`
}

const getErrors = (errors: PayloadAction, fields: string[]) => {
  const entries = Object.entries(errors)

  const fieldsErrors: { name: string; errors: string[] }[] = []
  const unknownErrors: string[] = []

  entries.forEach((el) => {
    const [key, val] = el as string[]
    const isFieldHasKey = fields.includes(key)
    const value = getString([key, val])

    if (isFieldHasKey) {
      fieldsErrors.push({ name: key, errors: [value] })
    } else {
      unknownErrors.push(value)
    }
  })

  return { fieldsErrors, unknownErrors }
}

const removeUndefined = (data: { [key: string]: string }) => {
  const keys = Object.keys(data)
  return keys.reduce((acc, key) => (data[key] ? { ...acc, [key]: data[key] } : { ...acc }), {}) as UserBodyType
}

const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  // eslint-disable-next-line no-param-reassign
  e.currentTarget.src = DEFAULT_IMAGE
}

const openSuccessModal = (api: NotificationInstance) => {
  api.open({
    placement: 'top',
    duration: 2,
    type: 'success',
    message: 'Succes',
    description: 'The changes have been accepted',
    closeIcon: false,
  })
}

type ReturnedValue = { key: string; name?: string; className?: string; required?: boolean }
const getFieldProps = (item: FieldType, req: boolean = true): ReturnedValue => {
  if (typeof item === 'object') {
    const { itemName, required } = item
    return getFieldProps(itemName, required)
  }

  return item === 'divider' ? { key: item, className: 'divider' } : { key: item, name: item, required: req }
}

type ValuesType = { [key: string]: FieldsType }
const hasValuesChanged = (initialValues: ValuesType, currentValues: ValuesType) => {
  const keys = Object.keys(initialValues)

  const changedFields = keys.filter((key) => {
    const val1 = initialValues[key]
    const val2 = currentValues[key] as string[]
    if (Array.isArray(val1)) {
      const array2 = val2?.filter(Boolean)
      const hasKeys = !val1.some((str) => array2?.some((val) => val === str))
      return val1?.length !== array2?.length || hasKeys
    }
    return val1 !== val2
  })

  return !changedFields.length
}

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  className?: string | null,
  onClick?: () => void
): MenuItemType {
  return {
    label,
    key,
    icon,
    className,
    onClick,
  } as MenuItemType
}

export { cn, getErrors, removeUndefined, onImageError, openSuccessModal, getFieldProps, hasValuesChanged, getItem }
