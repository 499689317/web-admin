import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Button, Result } from 'antd'

import { Loading, LayoutDefault } from '../components'

// 错误页
class ErrorPage extends React.Component {
    componentDidMount() {
        const { status } = this.props
    }

    render() {
        let { status, title } = this.props

        if (status === 401) {
            return <Loading notice="正在跳转登录页" />
        }

        status = `${status}`
        if (!['403', '404', '500', 'error', 'info', 'success', 'warning'].includes(status)) {
            status = '500'
        }
        if (!title) {
            title = status
        }

        return (
            <div>
                <Head>
                    <title key="title">错误页 - {process.env.name}</title>
                </Head>

                <LayoutDefault {...this.props}>
                    <Result
                        status=""
                        status={status}
                        title={title}
                        extra={[
                            <Button
                                key="back"
                                type="primary"
                                onClick={() => {
                                    if (Router.query.from) {
                                        Router.push(Router.query.from)
                                    } else {
                                        Router.back()
                                    }
                                }}
                            >
                                返回前页
                            </Button>,
                            <Button key="index" onClick={() => Router.push('/')}>
                                返回首页
                            </Button>
                        ]}
                    />
                </LayoutDefault>
            </div>
        )
    }
}

export default ErrorPage
