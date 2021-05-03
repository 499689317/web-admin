import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import { HttpResponse } from '../lib'
import { makeStore } from '../store'
import ErrorPage from './error'

import '../styles/antd.less'
class AdminApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { req, res, pathname, query, store } = ctx

    let pageError, pageProps
    try {
      pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    } catch (error) {
      if (error instanceof HttpResponse) {
        pageError = { status: error.status, title: error.message }
      } else {
        throw error
      }
    }

    return { pathname, query, store, pageError, pageProps }
  }

  componentDidMount() {
    const { pageError } = this.props
    if (pageError) {
      return
    }
  }

  render() {
    const { Component, pathname, query, store, pageError, pageProps } = this.props

    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          {pageError ?
            <ErrorPage {...{ pathname, query, store }} {...pageError} /> :
            <Component {...{ pathname, query, store }} {...pageProps} />
          }
        </Provider>
      </ConfigProvider>
    )
  }
}

export default withRedux(makeStore)(AdminApp)
