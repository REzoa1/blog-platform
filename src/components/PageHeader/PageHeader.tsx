import React from 'react'
import { Layout, Button, Space } from 'antd'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { selectAuth } from '../../store/slices/auth'

import UserHeader from './UserHeader/UserHeader'
import styles from './PageHeader.module.scss'

const { Header } = Layout

function PageHeader() {
  const { isLoggedIn } = useAppSelector(selectAuth)

  return (
    <Header className={styles.header}>
      <Link to="/articles/" className={styles.link}>
        Realworld Blog
      </Link>

      {isLoggedIn ? (
        <UserHeader />
      ) : (
        <Space>
          <Link to="/sign-in">
            <Button type="text">Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button className={styles.btn}>Sign Up</Button>
          </Link>
        </Space>
      )}
    </Header>
  )
}

export default PageHeader
