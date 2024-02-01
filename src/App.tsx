import React from 'react'
import { Flex } from 'antd'

import PageHeader from './components/PageHeader/PageHeader'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <>
      <PageHeader />
      <Flex vertical className="container">
        <div className="wrapper">
          <AppRoutes />
        </div>
      </Flex>
    </>
  )
}

export default App
