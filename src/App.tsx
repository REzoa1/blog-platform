import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Flex } from 'antd'

import Articles from './pages/Articles/Articles'
import Article from './pages/Article/Article'
import ErrorWrapper from './components/ErrorWrapper/ErrorWrapper'
import PageHeader from './components/PageHeader/PageHeader'

function App() {
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

            <Route exact path="/">
              <Redirect to="/articles/" />
            </Route>

            <Route>
              <ErrorWrapper code={404} />
            </Route>
          </Switch>
        </Flex>
      </Route>
    </Switch>
  )
}

export default App
