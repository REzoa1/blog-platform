import React from 'react'
import { Button, Result } from 'antd'
import { ResultStatusType } from 'antd/es/result'
import { useHistory } from 'react-router-dom'

type SubTitleForType = { [Transfers in ResultStatusType]: string }

type PropsType = {
  code: number | null
}

function ErrorView({ code }: PropsType) {
  const history = useHistory()
  const availableCodes = [403, 404, 500]

  const subTitleFor = {
    403: 'Sorry, you are not authorized to access this page.',
    404: 'Sorry, the page you visited does not exist.',
    500: 'Sorry, something went wrong.',
  } as SubTitleForType

  const status = code && availableCodes.includes(code) ? (code as ResultStatusType) : 500
  const onClick = () => {
    history.push('/articles/')
  }

  return (
    <Result
      status={status}
      title={code || 'Unknown Error'}
      subTitle={subTitleFor[status]}
      extra={
        <Button type="primary" onClick={onClick}>
          Go Back
        </Button>
      }
    />
  )
}

export default ErrorView
