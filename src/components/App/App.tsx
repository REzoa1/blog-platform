import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Flex } from 'antd'

import { selectAuth } from '../../store/slices/auth'
import Articles from '../../pages/Articles/Articles'
import Article from '../../pages/Article/Article'
import Error from '../Error/Error'
import PageHeader from '../PageHeader/PageHeader'
import SignIn from '../../pages/SignIn/SignIn'
import SignUp from '../../pages/SignUp/SignUp'
import Profile from '../../pages/Profile/Profile'
import { useAppSelector } from '../../store'

function App() {
  const { token } = useAppSelector(selectAuth)

  return (
    <Switch>
      <Route path="/">
        <PageHeader />
        <Flex vertical className="container">
          <Switch>
            <Route
              exact
              path="/articles/:slug?"
              render={({ match: { params } }) => (params.slug ? <Article /> : <Articles />)}
            />

            <Route exact path="/sign-in" render={() => (token ? <Redirect to="/" /> : <SignIn />)} />

            <Route exact path="/sign-up" render={() => (token ? <Redirect to="/" /> : <SignUp />)} />

            <Route exact path="/profile" render={() => (!token ? <Redirect to="/" /> : <Profile />)} />

            <Route exact path="/">
              <Redirect to="/articles/" />
            </Route>

            <Route>
              <Error code={404} />
            </Route>
          </Switch>
        </Flex>
      </Route>
    </Switch>
  )
}

export default App
