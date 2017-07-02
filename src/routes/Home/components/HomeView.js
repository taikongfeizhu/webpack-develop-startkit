import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { Button, Row, Col, Card } from 'antd'
import './HomeView.less'

const EnumPostStatus = {
  UNPUBLISH: '1',
  PUBLISHED: '2'
}

class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const start = moment().startOf('month').format('YYYY-MM-DD')
    const end = moment().format('YYYY-MM-DD')
    const params = {
      dashboard: `start_date=${start}&end_date=${end}`,
      list: `page=1&limit=3`
    }
    console.log(params)
  }

  handleCHangeRouter = (e, status) => {
    e.preventDefault()
    const { router } = this.props
    router.replace({
      pathname: '/',
      query: {
        status: EnumPostStatus[status]
      }
    })
  }

  render () {
    const { location, params } = this.props
    console.log(params)
    return (
      <div className='home-container'>
        <Card title='Location Demo'>
          <Row>
            <Col span={3}>action:</Col>
            <Col span={8}>{location.action}</Col>
          </Row>
          <Row>
            <Col span={3}>basename:</Col>
            <Col span={8}>{location.basename}</Col>
          </Row>
          <Row>
            <Col span={3}>pathname:</Col>
            <Col span={8}>{location.pathname}</Col>
          </Row>
          <Row>
            <Col span={3}>query:</Col>
            <Col span={8}>{JSON.stringify(location.query)}</Col>
          </Row>
        </Card>
        <Row className='link-box'>
          <Col span={10}>Link Demo:</Col>
          <Col span={7}>
            <Link to={{
              pathname: '/',
              state: { fromInside: true },
              query: { status: EnumPostStatus.UNPUBLISH }
            }}>status1</Link>
          </Col>
          <Col span={7}>
            <Link to={{
              pathname: '/',
              state: { fromInside: false },
              query: { status: EnumPostStatus.PUBLISHED }
            }}>status2</Link>
          </Col>
        </Row>
        <Row className='link-box'>
          <Col span={10}>Router Demo:</Col>
          <Col span={7}>
            <Button onClick={(e) => { this.handleCHangeRouter(e, 'UNPUBLISH') }}>Router1</Button>
          </Col>
          <Col span={7}>
            <Button onClick={(e) => { this.handleCHangeRouter(e, 'PUBLISHED') }}>Router2</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

HomeView.propTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  router: React.PropTypes.object
}

export default HomeView

