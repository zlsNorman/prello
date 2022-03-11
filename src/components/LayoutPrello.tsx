import { Layout, Menu } from 'antd'
import { Header, Content } from 'antd/lib/layout/layout'
import React from 'react'
import Routes from './Routes'
import "../index.css"
import { ProjectOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';

export default function LayoutPrello() {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1"><NavLink to="/board">Board</NavLink></Menu.Item>
          <Menu.Item key="2"><NavLink to="/board/project/new">create Project</NavLink></Menu.Item>
          <Menu.Item key="3">Settings</Menu.Item>
          <Menu.Item key="4">Statistic</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content>
          <Routes />
        </Content>
      </Layout>
    </Layout >
  )
}
