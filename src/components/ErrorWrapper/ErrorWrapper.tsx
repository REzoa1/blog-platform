import React from 'react'
import { Button, Result } from 'antd'
import { ResultStatusType } from 'antd/es/result'
import { useHistory } from 'react-router-dom'

type MapType = { [Transfers in ResultStatusType]: string }

type PropsType = {
  code: number | null
}

function ErrorWrapper({ code }: PropsType) {
  const history = useHistory()
  const availableCodes = [403, 404, 500]

  const mapErrors = {
    403: 'Sorry, you are not authorized to access this page.',
    404: 'Sorry, the page you visited does not exist.',
    500: 'Sorry, something went wrong.',
  } as MapType

  const status = code && availableCodes.includes(code) ? (code as ResultStatusType) : 500
  const onClick = () => {
    history.push('/articles/')
  }

  return (
    <Result
      className="wrapper"
      status={status}
      title={code || 'Unknown Error'}
      subTitle={mapErrors[status]}
      extra={
        <Button type="primary" onClick={onClick}>
          Go Back
        </Button>
      }
    />
  )
}

export default ErrorWrapper
