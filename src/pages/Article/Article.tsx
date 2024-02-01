import React from 'react'
import { Empty } from 'antd'

import ArticleItem from '../../components/ArticleItem/ArticleItem'
import ArticleWrapper from '../../components/ArticleWrapper/ArticleWrapper'
import { useArticle } from '../../hooks'

function Article() {
  const article = useArticle()

  const component = article ? <ArticleItem data={article} isArticlePage /> : <Empty />

  return <ArticleWrapper>{component}</ArticleWrapper>
}

export default Article
