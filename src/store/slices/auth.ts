import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_BASE } from '../../utils/constatnts'
import { StatusType, UserBodyType, UserDataType } from '../../types'
import { getData, updateData, postData } from '../../utils/fetch-helpers'

type StateType = {
  auth: AuthState
}

type AuthState = { token: string; status: StatusType; userdata: UserDataType | null }

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  status: 'idle',
  userdata: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: UserBodyType, { rejectWithValue }) => {
    const url = `${API_BASE}/users`
    return postData(url, userData, rejectWithValue)
  }
)

export const loginUser = createAsyncThunk('auth/loginUser', async (userData: UserBodyType, { rejectWithValue }) => {
  const url = `${API_BASE}/users/login`
  return postData(url, userData, rejectWithValue)
})

export const updateUser = createAsyncThunk('auth/updateUser', async (userData: UserBodyType, { rejectWithValue }) => {
  const url = `${API_BASE}/user`
  return updateData(url, userData, rejectWithValue)
})

export const getUser = createAsyncThunk('auth/getUser', async (token: string) => {
  const url = `${API_BASE}/user`
  const headers = {
    Authorization: `Token ${token}`,
  }
  return getData(url, headers)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token')
      state.token = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.user.token)
      state.token = action.payload.user.token
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

export const selectAuth = (state: StateType) => state.auth
export default authSlice.reducer
