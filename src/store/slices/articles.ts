import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_BASE } from '../../utils/constatnts'
import { ArticleType, StatusType } from '../../types'

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
  try {
    const offset = page === 1 ? 0 : (page - 1) * 5
    const url = `${API_BASE}/articles/?limit=5&offset=${offset}`
    const res = await fetch(url)

    if (res.ok) {
      const data = await res.json()
      return data
    }

    return rejectWithValue({ error: 'Failed to fetch data', code: res.status })
  } catch (err) {
    return rejectWithValue('Failed to fetch data (The API host is invalid)')
  }
})

export const getArticle = createAsyncThunk('articles/getArticle', async (slug: string, { rejectWithValue }) => {
  try {
    const url = `${API_BASE}/articles/${slug}`
    const res = await fetch(url)

    if (res.ok) {
      const data = await res.json()
      return data
    }

    return rejectWithValue({ error: 'Failed to fetch data', code: res.status })
  } catch (err) {
    return rejectWithValue('Failed to fetch data (The API host is invalid)')
  }
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
      if (articles) {
        state.articles = articles
        state.total = articlesCount
      }
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

      const { article } = action.payload
      if (article) {
        state.article = article
      }
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
