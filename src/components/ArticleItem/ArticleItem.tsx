import React, { SyntheticEvent } from 'react'
import { Card, Flex, Tag, Space } from 'antd'
import Markdown from 'react-markdown'
import { format } from 'date-fns'

import { ArticleType } from '../../types'
import { cn } from '../../utils/helpers'
import { DEFAULT_IMAGE } from '../../utils/constatnts'

import ArticleHeader from './ArticleHeader/ArticleHeader'
import ArticleActions from './ArticleActions/ArticleActions'
import styles from './ArticleItem.module.scss'

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

  const descCN = cn(isArticlePage && styles.secondary)

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    // eslint-disable-next-line no-param-reassign
    e.currentTarget.src = DEFAULT_IMAGE
  }

  return (
    <Card className={styles.card} bordered={false}>
      <Flex className={styles.article}>
        <Flex className={styles.left} vertical gap="small">
          <ArticleHeader data={data} isArticlePage={isArticlePage} />
          {finalTagList.length !== 0 && tags}

          {description?.length !== 0 && <div className={descCN}>{croppedDesc}</div>}
        </Flex>
        <Flex vertical align="start" gap="small">
          <Space className={styles.right}>
            <div>
              <h3 className={styles.heading}>{author.username}</h3>
              <span className={styles.secondary}>{date}</span>
            </div>

            <img className={styles.avatar} alt="avatar" src={author.image} onError={onImageError} />
          </Space>

          <ArticleActions data={data} isArticlePage={isArticlePage} />
        </Flex>
      </Flex>

      {isArticlePage && body && <Markdown className={styles.body}>{body}</Markdown>}
    </Card>
  )
}

ArticleItem.defaultProps = {
  isArticlePage: false,
}

export default ArticleItem
