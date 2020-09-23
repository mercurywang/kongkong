import React from 'react';
import './App.css';
import EmployeeList from './components/List';
import { Layout } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content className="App">
          <EmployeeList />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
