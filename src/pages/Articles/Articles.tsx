import React from 'react'
import { Empty, Flex, Pagination } from 'antd'

import { useAppDispatch } from '../../store'
import { setPage } from '../../store/slices/articles'
import { useArticles } from '../../hooks'
import ArticleWrapper from '../../components/ArticleWrapper/ArticleWrapper'
import ArticleItem from '../../components/ArticleItem/ArticleItem'

function Articles() {
  const dispatch = useAppDispatch()
  const { articles, page, total } = useArticles()

  const handleChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  const articlesData = (
    <>
      <Flex className="wrapper" vertical gap={26}>
        {articles.map((data) => {
          return <ArticleItem key={data.slug} data={data} />
        })}
      </Flex>

      <Pagination
        showQuickJumper
        className="mx-auto"
        onChange={handleChange}
        showSizeChanger={false}
        pageSize={5}
        current={page}
        total={total}
      />
    </>
  )

  const component = articles.length ? articlesData : <Empty />
  return <ArticleWrapper component={component} />
}

export default Articles
