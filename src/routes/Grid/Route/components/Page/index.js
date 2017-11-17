import React from 'react'
import { Provider } from 'react-redux'
import ControlPanel from './views/ControlPanel'
import store from './Store'

export default function () {
  return (
    <Provider store={store}>
      <ControlPanel />
    </Provider>
  )
}
