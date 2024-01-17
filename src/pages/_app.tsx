import '@/styles/globals.scss';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import theme from '@/theme/themeConfig';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ConfigProvider>
  );
}
