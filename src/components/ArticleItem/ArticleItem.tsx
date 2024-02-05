import React from 'react'
import { Card, Flex, Tag, Space } from 'antd'
import Markdown from 'react-markdown'
import { format } from 'date-fns'

import { ArticleType } from '../../types'
import { cn, onImageError } from '../../utils/helpers'

import ArticleHeader from './ArticleHeader/ArticleHeader'
import ArticleActions from './ArticleActions/ArticleActions'
import s from './ArticleItem.module.scss'

type PropsType = {
  data: ArticleType
  isArticlePage?: boolean
}

function ArticleItem({ data, isArticlePage = false }: PropsType) {
  const { tagList, description, author, createdAt, body } = data

  const date = format(createdAt, 'MMMM dd, yyyy')

  const trimmedTagList = tagList && tagList?.map((tag: string) => tag?.trim()).filter(Boolean)
  const isTagOverload = trimmedTagList.length > 10 && !isArticlePage
  const finalTagList = isTagOverload ? trimmedTagList.slice(0, 10) : trimmedTagList

  const croppedDesc = !isArticlePage && description?.length > 300 ? `${description?.slice(0, 300)}...` : description

  const tags = (
    <Space size={[0, 'small']} wrap>
      {finalTagList.map((tag: string, i: number) => {
        const key = `${tag}${i}`
        const finalTag = tag.slice().length > 30 ? `${tag.slice(0, 30)}...` : tag

        return (
          <Tag key={key} style={{ whiteSpace: 'normal' }}>
            {isArticlePage ? tag : finalTag}
          </Tag>
        )
      })}
      {isTagOverload && '...'}
    </Space>
  )

  const descCN = cn(isArticlePage && s.secondary)

  return (
    <Card className={s.card} bordered={false}>
      <Flex className={s.article}>
        <Flex className={s.left} vertical gap="small">
          <ArticleHeader data={data} isArticlePage={isArticlePage} />
          {finalTagList.length !== 0 && tags}

          {description?.length !== 0 && <div className={descCN}>{croppedDesc}</div>}
        </Flex>
        <Flex vertical align="start" gap="small">
          <Space className={s.right}>
            <div>
              <h3 className={s.heading}>{author.username}</h3>
              <span className={s.secondary}>{date}</span>
            </div>

            <img className={s.avatar} alt="avatar" src={author.image} onError={onImageError} />
          </Space>

          <ArticleActions data={data} isArticlePage={isArticlePage} />
        </Flex>
      </Flex>

      {isArticlePage && body && <Markdown className={s.body}>{body}</Markdown>}
    </Card>
  )
}

ArticleItem.defaultProps = {
  isArticlePage: false,
}

export default ArticleItem
