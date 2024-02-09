import { NotificationInstance } from 'antd/es/notification/interface'

import { FieldType, MenuItemType } from '../types'

const cn = (...classes: Array<boolean | string>) => [...classes].filter(Boolean).join(' ')

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1)
}

const getString = (errs: Array<string>) => {
  const [key, val] = errs
  return `${capitalize(key)} ${val}`
}

const getErrors = (errors: Record<string, string>, fields: string[]) => {
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

const removeUndefined = (data: Record<string, string | undefined>) => {
  const keys = Object.keys(data)
  return keys.reduce((acc, key) => (data[key] ? { ...acc, [key]: data[key] } : { ...acc }), {})
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

const getFieldProps = (
  item: FieldType,
  req: boolean = true
): { key: string; name?: string; className?: string; required?: boolean } => {
  if (typeof item === 'object') {
    const { itemName, required } = item
    return getFieldProps(itemName, required)
  }

  return item === 'divider' ? { key: item, className: 'divider' } : { key: item, name: item, required: req }
}

const trimAndFilterArr = (array: Array<string> | undefined) => {
  return array?.map((val) => val?.trim()).filter(Boolean)
}

const hasValuesChanged = <T>(initialValues: Record<string, T>, currentValues: Record<string, T>) => {
  const keys = Object.keys(initialValues)

  return !keys.some((key) => {
    const initialVal = initialValues[key]
    const currentVal = currentValues[key]

    if (Array.isArray(initialVal)) {
      const current = trimAndFilterArr(currentVal as string[])
      const isArrChanged = initialVal.toString() !== current?.toString()
      return initialVal?.length !== current?.length || isArrChanged
    }
    return initialVal !== currentVal
  })
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

export { cn, getErrors, removeUndefined, trimAndFilterArr, openSuccessModal, getFieldProps, hasValuesChanged, getItem }
