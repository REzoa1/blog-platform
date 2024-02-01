import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_BASE, PAGE_SIZE } from '../../utils/constatnts'
import { ArticlesState, DataBodyType, StatesType } from '../../types'
import { deleteData, getData, postData, putData } from '../../utils/fetchUtils'

const initialState: ArticlesState = {
  articles: [],
  article: null,

  total: 0,
  page: 1,
  errCode: null,
  status: 'idle',
}

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (page: number, { getState, rejectWithValue }) => {
    const { auth } = getState() as StatesType

    const offset = page === 1 ? 0 : (page - 1) * PAGE_SIZE
    const url = `${API_BASE}/articles/?limit=${PAGE_SIZE}&offset=${offset}`

    return getData(url, auth.isLoggedIn, rejectWithValue)
  }
)

export const getArticle = createAsyncThunk(
  'articles/getArticle',
  async (slug: string, { getState, rejectWithValue }) => {
    const { auth } = getState() as StatesType
    const url = `${API_BASE}/articles/${slug}`

    return getData(url, auth.isLoggedIn, rejectWithValue)
  }
)

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData: DataBodyType, { rejectWithValue }) => {
    const url = `${API_BASE}/articles`
    return postData(url, articleData, rejectWithValue)
  }
)

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (slug: string, { rejectWithValue }) => {
  const url = `${API_BASE}/articles/${slug}`
  return deleteData(url, rejectWithValue)
})

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, data }: { slug: string; data: DataBodyType }, { rejectWithValue }) => {
    const url = `${API_BASE}/articles/${slug}`
    return putData(url, data, rejectWithValue)
  }
)

export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug: string, { rejectWithValue }) => {
    const url = `${API_BASE}/articles/${slug}/favorite`
    return postData(url, null, rejectWithValue)
  }
)

export const unfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async (slug: string, { rejectWithValue }) => {
    const url = `${API_BASE}/articles/${slug}/favorite`
    return deleteData(url, rejectWithValue)
  }
)

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
      state.errCode = action.payload as number | null
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
      state.errCode = action.payload as number | null
      state.status = 'failed'
    })
  },
})

export const { setPage } = articlesSlice.actions

export const selectArticles = (state: StatesType) => state.articles
export default articlesSlice.reducer
