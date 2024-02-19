import React, { useEffect, useState } from 'react'
import { LoginOutlined, MenuOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex, Skeleton } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { cn, getItem } from '../../../utils/helpers'
import { MenuItemType } from '../../../types'
import { useAppDispatch, useAppSelector } from '../../../store'
import { getUser, logOut, selectAuth } from '../../../store/slices/auth'

import styles from './UserHeader.module.scss'

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
    getItem('Create Article', 'create', <PlusOutlined />, cn(styles.burgerMenuItem, styles.success), () =>
      history.push('/new-article')
    ),
    getItem(userdata?.username, 'profile', <UserOutlined />, styles.burgerMenuItem, () => history.push('/profile')),
    getItem('Log Out', 'logout', <LoginOutlined />, styles.burgerMenuItem, handleLogOut),
  ]

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const avatarCN = cn(styles.avatar, isImageLoading && styles.hidden)
  const skeletonCN = cn(styles.avatar, !isImageLoading && styles.hidden)
  const isActive = isImageLoading && status !== 'success'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const onImageLoad = () => {
    setIsImageLoading(false)
  }

  return (
    <>
      <div className={styles.burger}>
        <Dropdown overlayClassName={styles.dropdown} menu={{ items }} trigger={['click']}>
          <Button type="text" onClick={toggleMenu} icon={<MenuOutlined />} />
        </Dropdown>
      </div>

      <Flex className={styles.menu} align="center" gap={12}>
        <Link to="/new-article">
          <Button className={styles.btn} size="small">
            Create article
          </Button>
        </Link>
        <Link className={styles.profile} to="/profile">
          <span className={styles.username}>
            {userdata?.username ? userdata.username : <Skeleton className={styles.skeleton} paragraph={false} />}
          </span>

          <Skeleton className={skeletonCN} active={isActive} avatar title={false} paragraph={false} />
          <img className={avatarCN} src={userdata?.image} alt="Avatar" onLoad={onImageLoad} />
        </Link>
        <Button onClick={handleLogOut}>Log Out</Button>
      </Flex>
    </>
  )
}

export default UserHeader
