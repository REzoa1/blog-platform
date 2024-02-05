import React, { useEffect, useState } from 'react'
import { LoginOutlined, MenuOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex, Skeleton } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { cn, getItem } from '../../../utils/helpers'
import { MenuItemType } from '../../../types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { getUser, logOut, selectAuth } from '../../../store/slices/auth'

import s from './UserHeader.module.scss'

function UserHeader() {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { userdata, status } = useAppSelector(selectAuth)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogOut = () => {
    dispatch(logOut())
    history.push('/')
  }

  const items: MenuItemType[] = [
    getItem('Create Article', 'create', <PlusOutlined />, cn(s.burgerMenuItem, s.success), () =>
      history.push('/new-article')
    ),
    getItem(userdata?.username, 'profile', <UserOutlined />, s.burgerMenuItem, () => history.push('/profile')),
    getItem('Log Out', 'logout', <LoginOutlined />, s.burgerMenuItem, handleLogOut),
  ]

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const avatarCN = cn(s.avatar, isImageLoading && s.hidden)
  const skeletonCN = cn(s.avatar, !isImageLoading && s.hidden)
  const isActive = isImageLoading && status !== 'success'

  return (
    <>
      <div className={s.burger}>
        <Dropdown overlayClassName={s.dropdown} menu={{ items }} trigger={['click']}>
          <Button type="text" onClick={() => setIsMenuOpen(!isMenuOpen)} icon={<MenuOutlined />} />
        </Dropdown>
      </div>

      <Flex className={s.menu} align="center" gap={12}>
        <Link to="/new-article">
          <Button className={s.btn} size="small">
            Create article
          </Button>
        </Link>
        <Link className={s.profile} to="/profile">
          <span className={s.username}>
            {userdata?.username ? userdata.username : <Skeleton className={s.skeleton} paragraph={false} />}
          </span>

          <Skeleton className={skeletonCN} active={isActive} avatar title={false} paragraph={false} />
          <img className={avatarCN} src={userdata?.image} alt="Avatar" onLoad={() => setIsImageLoading(false)} />
        </Link>
        <Button onClick={handleLogOut}>Log Out</Button>
      </Flex>
    </>
  )
}

export default UserHeader
