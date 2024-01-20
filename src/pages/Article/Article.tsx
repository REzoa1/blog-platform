import React from 'react'
import { Empty } from 'antd'

import ArticleItem from '../../components/ArticleItem/ArticleItem'
import ArticleWrapper from '../../components/ArticleWrapper/ArticleWrapper'
import { useArticle } from '../../hooks'

function Article() {
  const article = useArticle()

  const component = article ? (
    <div className="wrapper">
      <ArticleItem data={article} isArticlePage />
    </div>
  ) : (
    <Empty />
  )

  return <ArticleWrapper component={component} />
}

export default Article
