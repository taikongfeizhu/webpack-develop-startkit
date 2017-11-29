/**
 * Created by huangjian on 2017/4/21.
 */
import React from 'react'
import { Row, Col } from 'antd'
import {
  SimpleLineChart,
  BarChart,
  RadialBarChart,
  RadarChart
} from 'components/Recharts'
import CustomCard from 'components/CustomCard'

class ChartsGallery extends React.Component {
  render () {
    return (
      <div className='gutter-example'>
        <Row gutter={16}>
          <Col className='gutter-row' md={24}>
            <div className='gutter-box'>
              <CustomCard title='基础线形图'>
                <SimpleLineChart />
              </CustomCard>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' md={24}>
            <div className='gutter-box'>
              <CustomCard title='基础线形图'>
                <BarChart />
              </CustomCard>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className='gutter-row' md={12}>
            <div className='gutter-box'>
              <CustomCard title='基础线形图'>
                <RadialBarChart />
              </CustomCard>
            </div>
          </Col>
          <Col className='gutter-row' md={12}>
            <div className='gutter-box'>
              <CustomCard title='基础线形图'>
                <RadarChart />
              </CustomCard>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ChartsGallery
