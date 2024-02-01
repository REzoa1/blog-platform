import React, { useState } from 'react'
import { Button, Flex } from 'antd'
import { Link } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import { cn } from '../../../utils/helpers'
import { ArticleType } from '../../../types'
import { favoriteArticle, unfavoriteArticle } from '../../../store/slices/articles'
import { useAppDispatch, useAppSelector } from '../../../store'
import { selectAuth } from '../../../store/slices/auth'

import s from './ArticleHeader.module.scss'

type PropsType = {
  data: ArticleType
  isArticlePage: boolean
}

function ArticleHeader({ data, isArticlePage }: PropsType) {
  const dispatch = useAppDispatch()
  const { slug, title, favoritesCount, favorited } = data
  const [isFavorite, setIsFavorite] = useState(favorited)
  const [favCount, setFavCount] = useState(favoritesCount)
  const { isLoggedIn } = useAppSelector(selectAuth)

  const isTitleEmpty = title?.trim().length === 0

  const onClick = () => {
    const action = isFavorite ? unfavoriteArticle : favoriteArticle
    dispatch(action(slug))

    setIsFavorite(!isFavorite)
    setFavCount((prev) => (isFavorite ? prev - 1 : prev + 1))
  }

  const containerCN = cn(isArticlePage && s.inline)
  const titleCN = cn(s.title, !isArticlePage && s.ellipsis, isTitleEmpty && s.secondary)
  const btnCN = cn(s.likeBtn, !isFavorite && isLoggedIn && s.hoverColor)

  const btnIcon = isFavorite ? <HeartFilled /> : <HeartOutlined />

  return (
    <Flex className={containerCN} align="center">
      <Link className={titleCN} to={`/articles/${slug}`}>
        {isTitleEmpty ? 'No title' : title}
      </Link>
      <Button className={btnCN} type="link" onClick={onClick} icon={btnIcon} danger={isFavorite} disabled={!isLoggedIn}>
        {favCount}
      </Button>
    </Flex>
  )
}

export default ArticleHeader
