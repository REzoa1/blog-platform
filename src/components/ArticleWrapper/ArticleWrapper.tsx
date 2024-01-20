import React from 'react'
import { Spin } from 'antd'

import { useAppSelector } from '../../store'
import { selectArticles } from '../../store/slices/articles'
import { StatusType } from '../../types'
import ErrorWrapper from '../ErrorWrapper/ErrorWrapper'

type MapType = { [Status in StatusType]: JSX.Element }

type PropsType = {
  component: JSX.Element
}

function ArticleWrapper({ component }: PropsType) {
  const { status, errCode } = useAppSelector(selectArticles)

  const loading = <Spin className="margin-auto" />
  const failed = <ErrorWrapper code={errCode} />
  const success = component

  const mapComponents = { idle: loading, loading, failed, success } as MapType

  return mapComponents[status]
}

export default ArticleWrapper
