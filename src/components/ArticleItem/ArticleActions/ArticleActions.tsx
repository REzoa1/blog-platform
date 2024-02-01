import { Button, Popconfirm, Space } from 'antd'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { deleteArticle } from '../../../store/slices/articles'
import { useAppDispatch, useAppSelector } from '../../../store'
import { selectAuth } from '../../../store/slices/auth'
import { cn } from '../../../utils/helpers'
import { ArticleType } from '../../../types'

import s from './ArticleActions.module.scss'

type PropsType = {
  data: ArticleType
  isArticlePage: boolean
}

function ArticleActions({ data, isArticlePage }: PropsType) {
  const history = useHistory()
  const { slug, author } = data
  const dispatch = useAppDispatch()
  const { userdata } = useAppSelector(selectAuth)

  const isAuthor = userdata?.username === author.username

  const onDeleteArticle = () => {
    dispatch(deleteArticle(slug)).then(() => history.push('/articles/'))
  }
  const btnCN = cn(s.btn, s.successBtn)

  return (
    <Space>
      {isAuthor && isArticlePage && (
        <>
          <Popconfirm
            placement="rightTop"
            title="Are you sure to delete this article?"
            onConfirm={onDeleteArticle}
            okText="Yes"
            cancelText="No"
          >
            <Button className={s.btn} danger>
              Delete
            </Button>
          </Popconfirm>
          <Link to={`/articles/${slug}/edit`}>
            <Button className={btnCN}>Edit</Button>
          </Link>
        </>
      )}
    </Space>
  )
}

export default ArticleActions
