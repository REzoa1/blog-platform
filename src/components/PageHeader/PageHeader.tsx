import React from 'react'
import { Layout, Button } from 'antd'
import { Link } from 'react-router-dom'

import s from './PageHeader.module.scss'

const { Header } = Layout

function PageHeader() {
  return (
    <Header className={s.header}>
      <Link to="/articles/" className={s.link}>
        Realworld Blog
      </Link>

      <div>
        <Button type="text">Sign In</Button>
        <Button className={s.btn}>Sign Up</Button>
      </div>
    </Header>
  )
}

export default PageHeader
