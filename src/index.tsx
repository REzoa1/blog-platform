import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './components/App/App'
import { store } from './store'
import { THEME_TOKENS } from './utils/constatnts'
import './scss/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ConfigProvider theme={THEME_TOKENS}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>
)
