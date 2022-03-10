import { Layout } from 'antd'
import { Header, Content } from 'antd/lib/layout/layout'
import React from 'react'
import Routes from './Routes'

export default function LayoutPrello() {
  return (
    <Layout>
      <Header>header</Header>
      <Layout>
        <Content>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  )
}
