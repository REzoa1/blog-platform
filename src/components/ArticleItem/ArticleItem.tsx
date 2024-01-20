import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Card, Flex, Tag, Button, Space } from 'antd'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'

import { ArticleType } from '../../types'
import { cn } from '../../utils/helpers'

import s from './ArticleItem.module.scss'

type PropsType = {
  data: ArticleType
  isArticlePage?: boolean
}

function ArticleItem({ data, isArticlePage = false }: PropsType) {
  const { slug, title, tagList, description, author, createdAt, favoritesCount, body } = data

  const date = format(createdAt, 'MMMM dd, yyyy')
  const trimmedTagList = tagList && tagList?.map((tag: string) => tag?.trim()).filter(Boolean)

  const isEmptyTitle = title?.trim().length === 0
  const titleClassName = cn(s.title, !isArticlePage && s.ellipsis, isEmptyTitle && s.secondary)

  const croppedDesc = description?.length > 300 ? `${description?.slice(0, 300)}...` : description

  const article = (
    <Flex className={s.article}>
      <Flex className={s.left} vertical justify="center" gap="small">
        <Flex align="center">
          <Link className={titleClassName} to={`/articles/${slug}`}>
            {!isEmptyTitle ? title : 'No title'}
          </Link>

          <Button size="large" disabled type="text" icon={<HeartOutlined />}>
            {favoritesCount}
          </Button>
        </Flex>

        {trimmedTagList.length !== 0 && (
          <Space size={[0, 'small']} wrap>
            {tagList.map((tag: string, i: number) => {
              const key = `${tag}${i}`
              const finalTag = tag.slice().trim().length > 30 ? `${tag.slice(0, 30)}...` : tag

              return (
                tag.trim().length !== 0 && (
                  <Tag key={key} style={{ whiteSpace: 'normal' }}>
                    {isArticlePage ? tag : finalTag}
                  </Tag>
                )
              )
            })}
          </Space>
        )}

        {description?.length !== 0 && <div className={cn(isArticlePage && s.secondary)}>{croppedDesc}</div>}
      </Flex>
      <Flex className={s.right} align="start" gap="middle">
        <div>
          <h3 className={s.heading}>{author.username}</h3>
          <span className={s.secondary}>{date}</span>
        </div>

        <img className={s.avatar} alt="avatar" src={author.image} />
      </Flex>
    </Flex>
  )

  return (
    <Card bordered={false} className={s.card}>
      {article}
      {isArticlePage && body && (
        <Markdown className={s.body} options={{ wrapper: 'article', forceWrapper: true }}>
          {body}
        </Markdown>
      )}
    </Card>
  )
}

ArticleItem.defaultProps = {
  isArticlePage: false,
}

export default ArticleItem
