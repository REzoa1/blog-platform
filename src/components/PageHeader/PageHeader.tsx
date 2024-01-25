import React, { useEffect, useState } from 'react'
import { Layout, Button, Flex, Skeleton } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store'
import { getUser, logOut, selectAuth } from '../../store/slices/auth'

import s from './PageHeader.module.scss'

const { Header } = Layout

function PageHeader() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [isImageLoading, setIsImageLoading] = useState(true)
  const { token, userdata } = useAppSelector(selectAuth)

  useEffect(() => {
    if (token) {
      dispatch(getUser(token))
    }
  }, [dispatch, token])

  const handleLogOut = () => {
    dispatch(logOut())
    history.push('/')
  }

  return (
    <Header className={s.header}>
      <Link to="/articles/" className={s.link}>
        Realworld Blog
      </Link>

      {token && userdata ? (
        <Flex align="center" gap={12}>
          <Button size="small" className={s.btn}>
            Create article
          </Button>
          <Link to="/profile" className={s.profile}>
            <span className={s.username}>
              {userdata.username || <Skeleton paragraph={false} style={{ width: 60 }} />}
            </span>

            <Skeleton
              style={{ display: isImageLoading ? 'flex' : 'none' }}
              active={isImageLoading}
              className={s.avatar}
              avatar
              title={false}
              paragraph={false}
            />
            <img
              style={{ display: !isImageLoading ? 'block' : 'none' }}
              className={s.avatar}
              src={userdata.image}
              alt="Avatar"
              onLoad={() => setIsImageLoading(false)}
            />
          </Link>
          <Button onClick={handleLogOut}>Log Out</Button>
        </Flex>
      ) : (
        <div>
          <Link to="/sign-in">
            <Button type="text">Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button className={s.btn}>Sign Up</Button>
          </Link>
        </div>
      )}
    </Header>
  )
}

export default PageHeader
