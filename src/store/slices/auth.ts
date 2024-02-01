import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_BASE } from '../../utils/constatnts'
import { AuthState, DataBodyType, StatesType } from '../../types'
import { getData, postData, putData } from '../../utils/fetchUtils'

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('token') || false,
  userdata: null,
  status: 'idle',
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: DataBodyType, { rejectWithValue }) => {
    const url = `${API_BASE}/users`
    return postData(url, userData, rejectWithValue, false)
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', async (userData: DataBodyType, { rejectWithValue }) => {
  const url = `${API_BASE}/users/login`
  return postData(url, userData, rejectWithValue, false)
})

export const updateUser = createAsyncThunk('auth/updateUser', async (userData: DataBodyType, { rejectWithValue }) => {
  const url = `${API_BASE}/user`
  return putData(url, userData, rejectWithValue)
})

export const getUser = createAsyncThunk('auth/getUser', async (_, { getState, rejectWithValue }) => {
  const { auth } = getState() as StatesType
  const url = `${API_BASE}/user`

  return getData(url, auth.isLoggedIn, rejectWithValue)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token')
      state.token = ''
      state.isLoggedIn = false
      state.userdata = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.user.token)
      state.token = action.payload.user.token
      state.isLoggedIn = true
      state.userdata = action.payload.user
      state.status = 'success'
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.user.token)
      state.token = action.payload.user.token
      state.isLoggedIn = true
      state.userdata = action.payload.user
      state.status = 'success'
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(updateUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userdata = action.payload.user
      state.status = 'success'
    })
    builder.addCase(updateUser.rejected, (state) => {
      state.status = 'failed'
    })

    builder.addCase(getUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userdata = action.payload.user
      state.status = 'success'
    })
    builder.addCase(getUser.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const { logOut } = authSlice.actions

export const selectAuth = (state: StatesType) => state.auth
export default authSlice.reducer
