import "@/styles/globals.scss";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import theme from "@/theme/themeConfig";
import { I18nextProvider } from "react-i18next";
import i18n from "@/locales/i18n";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </I18nextProvider>
    </ConfigProvider>
  );
}
