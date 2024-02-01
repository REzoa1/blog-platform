import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Article from './pages/Article/Article'
import Articles from './pages/Articles/Articles'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import Profile from './pages/Profile/Profile'
import CreateArticle from './pages/CreateArticle/CreateArticle'
import EditArticle from './pages/EditArticle/EditArticle'
import ErrorView from './components/ErrorView/ErrorView'
import { useAppSelector } from './store'
import { selectAuth } from './store/slices/auth'

function AppRoutes() {
  const { isLoggedIn } = useAppSelector(selectAuth)

  return (
    <Switch>
      <Route exact path="/articles/" component={Articles} />
      <Route exact path="/articles/:slug" component={Article} />

      <Route exact path="/sign-in">
        {isLoggedIn ? <Redirect to="/articles/" /> : <SignIn />}
      </Route>

      <Route exact path="/sign-up">
        {isLoggedIn ? <Redirect to="/articles/" /> : <SignUp />}
      </Route>

      <Route exact path="/profile">
        {!isLoggedIn ? <Redirect to="/sign-in/" /> : <Profile />}
      </Route>

      <Route exact path="/new-article">
        {!isLoggedIn ? <Redirect to="/sign-in/" /> : <CreateArticle />}
      </Route>

      <Route exact path="/articles/:slug/edit">
        {!isLoggedIn ? <Redirect to="/sign-in/" /> : <EditArticle />}
      </Route>

      <Route exact path="/">
        <Redirect to="/articles/" />
      </Route>

      <Route>
        <ErrorView code={404} />
      </Route>
    </Switch>
  )
}

export default AppRoutes
