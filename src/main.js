import React from 'react'
import ReactDOM from 'react-dom'

import { Router, browserHistory } from 'react-router'

// import CoreLayout from './layouts/CoreLayout'
// import Home from './Home'
// import ManageRoute from './routes/Manage'
// import StatisticRoute from './routes/Statistic'
// import ForbiddenRoute from './Forbidden'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default

  ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
