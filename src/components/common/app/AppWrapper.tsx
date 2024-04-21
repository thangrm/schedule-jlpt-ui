'use client';
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { AppMenu } from './AppMenu';
import t from '@/dictionaries/en.json';

const { Header, Content, Footer } = Layout;

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <Header
        style={{ display: 'flex', alignItems: 'center', background: 'white' }}
      >
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={60} height={60} />
        </Link>
        <AppMenu />
      </Header>
      <Content style={{ padding: '0 48px', minHeight: 900 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {t.footer.company} ©{new Date().getFullYear()} {t.footer.created}
      </Footer>
    </Layout>
  );
};
