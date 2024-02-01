import React, { useEffect } from 'react'
import { Form, Spin } from 'antd'
import { Redirect, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store'
import { selectAuth } from '../../store/slices/auth'
import ArticleWrapper from '../../components/ArticleWrapper/ArticleWrapper'
import DynamicForm from '../../components/DynamicForm/DynamicForm'
import { getArticle, selectArticles } from '../../store/slices/articles'
import { FieldsType } from '../../types'
import { hasValuesChanged } from '../../utils/helpers'

const { useForm, useWatch } = Form

function EditArticle() {
  const dispatch = useAppDispatch()
  const { slug } = useParams<{ slug: string }>()
  const { article } = useAppSelector(selectArticles)
  const { userdata } = useAppSelector(selectAuth)
  const [form] = useForm()
  useWatch((values: FieldsType) => values, form)

  useEffect(() => {
    if (!article) {
      dispatch(getArticle(slug))
    }
  }, [article, dispatch, slug])

  if (!article || !userdata) {
    return <Spin className="spin" />
  }

  const { title, description, body: text, tagList, author } = article
  const initialValues = { title, description, text, tagList } as { [key: string]: FieldsType }
  const disabled = hasValuesChanged(initialValues, form.getFieldsValue())

  const isAuthor = userdata.username === author.username
  const component = isAuthor ? (
    <DynamicForm name="edit-article" form={form} initialValues={initialValues} disabled={disabled} />
  ) : (
    <Redirect to={`/articles/${slug}`} />
  )

  return <ArticleWrapper>{component}</ArticleWrapper>
}

export default EditArticle
