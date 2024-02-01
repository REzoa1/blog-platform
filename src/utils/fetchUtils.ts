import { ActionCreator } from '@reduxjs/toolkit'

import { DataBodyType, MethodType } from '../types'

const fetchData = async (url: string, options: RequestInit, reject: ActionCreator<void>) => {
  try {
    const res = await fetch(url, options)

    if (res.ok) {
      const data = await res.json()
      return data
    }

    const isGetMethod = options.method === 'GET'
    const value = isGetMethod ? res.status || null : (await res.json()).errors

    return reject(value)
  } catch (err) {
    throw new Error('Failed to fetch data (The API host is invalid)')
  }
}

const getOptions = (method: MethodType, dataBody: DataBodyType | null = null, withAuth = true) => {
  const initialHeaders = {
    'Content-Type': 'application/json',
  }
  const authHeader = {
    Authorization: `Token ${localStorage.getItem('token')}`,
  }

  const headersFor = {
    GET: authHeader,
    POST: { ...initialHeaders, ...authHeader },
    PUT: { ...initialHeaders, ...authHeader },
    DELETE: authHeader,
  }

  const headers = withAuth ? headersFor[method] : initialHeaders
  const body = JSON.stringify(dataBody)

  const options = dataBody ? { method, headers, body } : { method, headers }
  return options
}

const getData = async (url: string, withAuth: boolean, reject: ActionCreator<void>) => {
  const options = getOptions('GET', null, withAuth)
  return fetchData(url, options, reject)
}

const postData = (url: string, body: DataBodyType | null, reject: ActionCreator<void>, withAuth = true) => {
  const options = getOptions('POST', body, withAuth)
  return fetchData(url, options, reject)
}

const putData = (url: string, body: DataBodyType, reject: ActionCreator<void>) => {
  const options = getOptions('PUT', body)
  return fetchData(url, options, reject)
}

const deleteData = (url: string, reject: ActionCreator<void>) => {
  const options = getOptions('DELETE')
  return fetchData(url, options, reject)
}

export { postData, putData, getData, deleteData }
