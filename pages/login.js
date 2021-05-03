import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Input, Button, Card } from 'antd'
import { Form } from '@ant-design/compatible';

import { LayoutDefault } from '../components'
import { loginAction } from '../actions'

class _LoginForm extends React.Component {
    state = {
        isSubmitting: false,
    }

    validateUsername = (rule, value, callback) => {
        if (value && !value.match(/^.{2,20}$/)) {
            callback('用户名格式错误')
        } else {
            callback()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch, form } = this.props

        form.validateFields((err, values) => {
            if (err) {
                console.error(err)
                return
            }

            let { username, password } = values
            this.setState({ isSubmitting: true })
            dispatch(loginAction({ username, password }))
                .then(resp => {
                    this.setState({ isSubmitting: false })
                    Router.replace(Router.query.from || '/')
                })
        })
    }

    render() {
        const { form } = this.props
        const { isSubmitting } = this.state

        const fieldsError = form.getFieldsError()
        const isSubmitDisabled = Object.keys(fieldsError).some(field => fieldsError[field])

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {form.getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入用户名' },
                            { validator: this.validateUsername },
                        ],
                    })(
                        <Input placeholder="用户名" />
                    )}
                </Form.Item>

                <Form.Item>
                    {form.getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入密码' },
                            { min: 6, max: 20, message: '密码长度须为 6~20' },
                        ],
                    })(
                        <Input type="password" placeholder="密码" />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-100"
                        disabled={isSubmitDisabled}
                        loading={isSubmitting}
                        block
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const LoginForm = connect()(Form.create({ name: 'loginForm' })(_LoginForm))

class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title key="title">用户登录</title>
                </Head>

                <LayoutDefault {...this.props}>
                    <div className="root">
                        <Card
                            title="登录后台，无账号请联系管理人员"
                            bordered={false}
                            style={{ marginTop: 64, minWidth: 360 }}
                        >
                            <LoginForm />
                        </Card>

                        <style jsx>{`
              .root {
                display: flex;
                justify-content: center;
              }
            `}</style>
                    </div>
                </LayoutDefault>
            </div>
        )
    }
}

export default LoginPage
