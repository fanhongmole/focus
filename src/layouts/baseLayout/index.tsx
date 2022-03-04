import React from 'react';
import { Layout } from 'antd';
import HeaderContent from './Header';
import SiderContent from './sider';
import styles from './index.less';

const { Header, Content, Sider } = Layout;

export default (props: any) => {
  return (
    <Layout className={styles.container}>
      <Sider width={210} style={{ background: '#f0f2f5', padding: '100px 20px 0' }}>
        <SiderContent/>
      </Sider>
      <Layout style={{ padding: 0 }}>
        <Header className={styles.header}>
          <HeaderContent />
        </Header>
        <Content className={styles.content}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};
