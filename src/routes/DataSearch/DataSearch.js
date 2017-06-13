import React from 'react'
import { Link } from 'react-router'
import Header from 'components/Header'
import './DataSearch.less'
export const DataSearch = (props) => (
  <div>
    <Header title={'数据查询'} />
    <div className='data-search os-card os-content'>
      <Link to={`/recharge/search?type=customer_num`}>
        <div className='data-search-item'>
          <span className='data-search-title'>数据查询1</span>
        </div>
      </Link>
      <Link to={`/conversion/search`}>
        <div className='data-search-item'>
          <span className='data-search-title'>数据查询2</span>
        </div>
      </Link>
    </div>
  </div>

)

export default DataSearch
