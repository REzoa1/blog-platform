import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_BASE } from '../../utils/constatnts'
import { ArticleType, StatusType } from '../../types'
import { getData } from '../../utils/fetch-helpers'

type StateType = {
  articles: ArticlesState
}

type ArticlesState = {
  articles: Array<ArticleType>
  article: ArticleType | null
  total: number
  status: StatusType
  page: number
  errCode: number | null
}

const initialState: ArticlesState = {
  articles: [],
  article: null,
  total: 0,
  status: 'idle',
  page: 1,
  errCode: null,
}

export const getArticles = createAsyncThunk('articles/getArticles', async (page: number, { rejectWithValue }) => {
  const offset = page === 1 ? 0 : (page - 1) * 5
  const url = `${API_BASE}/articles/?limit=5&offset=${offset}`
  return getData(url, null, rejectWithValue)
})

export const getArticle = createAsyncThunk('articles/getArticle', async (slug: string, { rejectWithValue }) => {
  const url = `${API_BASE}/articles/${slug}`
  return getData(url, null, rejectWithValue)
})

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.status = 'success'

      const { articles, articlesCount } = action.payload

      state.articles = articles
      state.total = articlesCount
    })
    builder.addCase(getArticles.rejected, (state, action) => {
      const { code } = action.payload as { code: number }
      state.errCode = code || null
      state.status = 'failed'
    })

    builder.addCase(getArticle.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.status = 'success'

      state.article = action.payload.article
    })
    builder.addCase(getArticle.rejected, (state, action) => {
      const { code } = action.payload as { code: number }
      state.errCode = code || null
      state.status = 'failed'
    })
  },
})

export const { setPage } = articlesSlice.actions

export const selectArticles = (state: StateType) => state.articles
export default articlesSlice.reducer
