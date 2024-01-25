import { UserBodyType } from '../types'

type RejectType = (err: object | string) => void

const fetchData = async (url: string, options: RequestInit, rejectWithValue: RejectType) => {
  try {
    const res = await fetch(url, options)

    const data = await res.json()
    if (res.ok) {
      return data
    }

    return rejectWithValue(data.errors)
  } catch (err) {
    throw new Error('Failed to update data (The API host is invalid)')
  }
}

const postData = (url: string, dataBody: UserBodyType, rejectWithValue: RejectType) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify(dataBody)
  const options = { method: 'POST', headers, body }

  return fetchData(url, options, rejectWithValue)
}

const updateData = (url: string, dataBody: UserBodyType, rejectWithValue: RejectType) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`,
  }
  const body = JSON.stringify(dataBody)
  const options = { method: 'PUT', headers, body }

  return fetchData(url, options, rejectWithValue)
}

const getData = async (url: string, headers: HeadersInit | null = null, rejectWithValue: RejectType | null = null) => {
  try {
    const res = await fetch(url, headers ? { headers } : {})

    if (res.ok) {
      const data = await res.json()
      return data
    }

    if (rejectWithValue !== null) {
      return rejectWithValue({ error: 'Failed to fetch data', code: res.status })
    }

    return new Error('Failed to get data', { cause: res.status })
  } catch (err) {
    if (rejectWithValue) {
      return rejectWithValue('Failed to fetch data (The API host is invalid)')
    }

    throw new Error('Failed to get data (The API host is invalid)')
  }
}

export { postData, updateData, getData }
