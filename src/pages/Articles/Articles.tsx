import React from 'react'
import { Empty, Flex, Pagination } from 'antd'

import { useAppDispatch } from '../../store'
import { setPage } from '../../store/slices/articles'
import { useArticles } from '../../hooks'
import ArticleWrapper from '../../components/ArticleWrapper/ArticleWrapper'
import ArticleItem from '../../components/ArticleItem/ArticleItem'
import { PAGE_SIZE } from '../../utils/constatnts'

import s from './Articles.module.scss'

function Articles() {
  const dispatch = useAppDispatch()
  const { articles, page, total } = useArticles()

  const handleChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  const articlesData = (
    <>
      <Flex vertical gap={26}>
        {articles.map((data) => {
          return <ArticleItem key={data.slug} data={data} />
        })}
      </Flex>

      <Pagination
        showQuickJumper
        className={s.pagination}
        onChange={handleChange}
        showSizeChanger={false}
        pageSize={PAGE_SIZE}
        current={page}
        total={total}
      />
    </>
  )

  const component = articles.length ? articlesData : <Empty />

  return <ArticleWrapper>{component}</ArticleWrapper>
}

export default Articles
