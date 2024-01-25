import React from 'react'
import { Spin } from 'antd'

import { useAppSelector } from '../../store'
import { selectArticles } from '../../store/slices/articles'
import { StatusType } from '../../types'
import Error from '../Error/Error'

type MapType = { [Status in StatusType]: JSX.Element }

type PropsType = {
  children: JSX.Element
}

function ArticleWrapper({ children }: PropsType) {
  const { status, errCode } = useAppSelector(selectArticles)

  const loading = <Spin className="margin-auto" />
  const failed = <Error code={errCode} />
  const success = children

  const mapComponents = { idle: loading, loading, failed, success } as MapType

  return mapComponents[status]
}

export default ArticleWrapper
