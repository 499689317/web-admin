import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Table, Button, Drawer } from 'antd'
import moment from 'moment'

import EditComponent from './edit'
import { getUserInfo } from '../../actions'

const list = [
    {
        id: 1,
        nickname: 'Devin',
        money: 100,
        chip: 7000000,
        gem: 2000,
        et: 1627034157041,
        ct: 1620034050041
    },
    {
        id: 2,
        nickname: 'Devin2',
        money: 200,
        chip: 17000000,
        gem: 100,
        et: 1626034157041,
        ct: 1625034050041
    }
]

class PlayerComponent extends React.Component {
    state = {
        list: [],
        total: 0,
        current: 1,
        pageSize: 20,
        isShowEdit: false,
    }

    static async getInitialProps({ req, query, store }) {
        return {}
    }

    constructor(props) {
        super(props)
        Object.assign(this.state, { list })
    }

    onPageChange = (page, pageSize) => {
        Router.push({
            pathname: Router.pathname,
            query: Object.assign({ ...Router.query }, {
                offset: (page - 1) * pageSize,
            }),
        })
    }

    render() {
        const bodyHeight = document.body.clientHeight;
        const headerHeight = document.getSelection('.ant-pro-global-header').clientHeight || 64;
        const tableHeight = bodyHeight - headerHeight - 170;

        const columns = [
            {
                title: '用户id',
                dataIndex: 'id',
                key: 'id',
                width: 100,
            },
            {
                title: '用户昵称',
                dataIndex: 'nickname',
                key: 'nickname',
                width: 100,
            },
            {
                title: '充值金额',
                dataIndex: 'money',
                key: 'money',
                width: 100,
                sorter: true,
            },
            {
                title: '金币',
                dataIndex: 'chip',
                key: 'chip',
                width: 100,
                sorter: true,
            },
            {
                title: '钻石',
                dataIndex: 'gem',
                key: 'gem',
                width: 100,
                sorter: true,
            },
            {
                title: '创建时间',
                dataIndex: 'ct',
                key: 'ct',
                width: 200,
                sorter: true,
                render: (ct) => moment(ct).format('YYYY-MM-DD HH:MM:SS Z'),
            },
            {
                title: '最近登录',
                dataIndex: 'loginTime',
                key: 'loginTime',
                width: 200,
                sorter: true,
                render: (ct) => moment(ct).format('YYYY-MM-DD HH:MM:SS Z'),
            },
            {
                fixed: 'right',
                key: 'edit',
                width: 100,
                title: '编辑',
                align: 'center',
                render: (data) => {
                    return (
                        <div>
                            <Button
                                type='primary'
                                size='small'
                                style={{ marginRight: '0px' }}
                                onClick={() => {
                                    this.setState({ isShowEdit: true })
                                }}
                            >
                                详情
                            </Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Table
                    dataSource={this.state.list}
                    rowKey={item => item.id}
                    pagination={{ current: this.state.current, pageSize: this.state.pageSize }}
                    loading={this.props.isLoading}
                    columns={columns}
                    bordered
                    scroll={{ x: 1980, y: tableHeight }}
                    onChange={(pagination, filters, sorter) => {
                        console.log(pagination, filters, sorter)
                    }}
                >
                </Table>
                <Drawer
                    width='50%'
                    title='用户详情'
                    placement='right'
                    visible={this.state.isShowEdit}
                    closable
                    onClose={() => {
                        this.setState({ isShowEdit: false })
                    }}
                >
                    <EditComponent />
                </Drawer>
            </div>
        )
    }
}

export default connect(({ account }) => {
    return { account }
})(PlayerComponent)
