import React from 'react'
import { browserHistory } from 'react-router'
import './NotFound.less'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NotFound = () => (
  <div className='not-found'>
    <p><a href='#' onClick={goBack}>&larr; Back</a></p>
  </div>
)

export default NotFound
