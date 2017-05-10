import React from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd-mobile'
import DataImage from './assets/search.png'
import InfoImage from './assets/info.png'
import './DataSearchList.less'

const SearchItem = (props) => (
  <div className='search-item'>
    <Link to={props.url}>
      <img
        className='search-item-img'
        src={props.img}
      />
      <span className='search-item-name'>{props.title}</span>
      <span className='search-item-ico'>
        <Icon type='right' size='md' />
      </span>
    </Link>
  </div>
)

SearchItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  img : React.PropTypes.string.isRequired
}

export const DataSearchList = (props) => (
  <div className='os-card'>
    <SearchItem
      title='数据查询'
      img={DataImage}
      url='/apps/dataSearch'
    />
    <SearchItem
      img={InfoImage}
      title='客户信息'
      url='/apps/customerInfo'
    />
  </div>
)

export default DataSearchList
