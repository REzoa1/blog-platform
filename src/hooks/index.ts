import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../store'
import { getArticle, getArticles, selectArticles } from '../store/slices/articles'

const useArticles = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectArticles)
  const { page } = state

  useEffect(() => {
    dispatch(getArticles(page))
  }, [dispatch, page])

  return state
}

const useArticle = () => {
  const dispatch = useAppDispatch()
  const { slug } = useParams<{ slug: string }>()
  const { article } = useAppSelector(selectArticles)

  useEffect(() => {
    dispatch(getArticle(slug))
  }, [dispatch, slug])

  return article
}

export { useArticles, useArticle }
