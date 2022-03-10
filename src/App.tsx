import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LayoutPrello from './components/LayoutPrello';
import Routes from './components/Routes';

function App() {
  return (
    <BrowserRouter>
      <LayoutPrello />
    </BrowserRouter>
  );
}

export default App;
