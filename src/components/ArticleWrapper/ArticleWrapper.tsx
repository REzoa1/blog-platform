import React from 'react'
import { Spin } from 'antd'

import { useAppSelector } from '../../store'
import { selectArticles } from '../../store/slices/articles'
import { StatusType } from '../../types'
import ErrorView from '../ErrorView/ErrorView'

type ComponentForType = { [Status in StatusType]: JSX.Element }

type PropsType = {
  children: JSX.Element | JSX.Element[]
}

function ArticleWrapper({ children }: PropsType) {
  const { status, errCode } = useAppSelector(selectArticles)

  const loading = <Spin className="spin" />
  const failed = <ErrorView code={errCode} />
  const success = children

  const componentFor = { idle: loading, loading, failed, success } as ComponentForType

  return componentFor[status]
}

export default ArticleWrapper
