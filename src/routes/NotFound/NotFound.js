import React from 'react'
import { browserHistory } from 'react-router'
import './NotFound.less'
import img404 from './404.png'
import cloud404 from './cloud_404.png'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NotFound = () => (
  <div style={{ background:'#f6f6f6', marginTop: '-20px' }}>
    <div className='wscn-http404'>
      <div className='pic-404'>
        <img className='pic-404__parent' src={img404} alt='404' />
        <img className='pic-404__child left' src={cloud404} alt='404' />
        <img className='pic-404__child mid' src={cloud404} alt='404' />
        <img className='pic-404__child right' src={cloud404} alt='404' />
      </div>
      <div className='bullshit'>
        <div className='bullshit__oops'>当前页面无法访问！</div>
        <div className='bullshit__headline'>404 Not Found</div>
        <div className='bullshit__info'>请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <a className='bullshit__return-home' onClick={goBack}>返回首页</a>
      </div>
    </div>
  </div>
)

export default NotFound
