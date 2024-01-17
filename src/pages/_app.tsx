import React from 'react';
import { ConfigProvider } from 'antd';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import theme from '@/theme/themeConfig';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}
