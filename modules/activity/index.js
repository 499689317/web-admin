import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Table, Button, Drawer, Popconfirm } from 'antd'
import moment from 'moment'

import EditComponent from './edit'

const list = [
    {
        id: 1,
        type: 'money tree',
        st: 1620034157041,
        et: 1627034157041,
        ct: 1620034050041
    },
    {
        id: 2,
        type: 'easter basket',
        st: 1620034107041,
        et: 1627034107041,
        ct: 1620034000041
    }
]

class ActivityComponent extends React.Component {
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
                title: '活动id',
                dataIndex: 'id',
                key: 'id',
                width: 100,
            },
            {
                title: '活动类型',
                dataIndex: 'type',
                key: 'type',
                width: 100,
            },
            {
                title: '开始时间',
                dataIndex: 'st',
                key: 'st',
                width: 200,
                sorter: true,
                render: (ct) => moment(ct).format('YYYY-MM-DD HH:MM:SS Z'),
            },
            {
                title: '结束时间',
                dataIndex: 'et',
                key: 'et',
                width: 200,
                sorter: true,
                render: (ct) => moment(ct).format('YYYY-MM-DD HH:MM:SS Z'),
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
                fixed: 'right',
                key: 'edit',
                width: 100,
                title: '编辑',
                align: 'center',
                render: (data) => {
                    return (
                        <div>
                            <Popconfirm
                                title='是否确定删除？'
                                onConfirm={() => {
                                    console.log("删除")
                                }}
                            >
                                <a>删除</a>
                            </Popconfirm>
                            <Button
                                type='primary'
                                size='small'
                                style={{ marginRight: '10px', marginLeft: '10px' }}
                                onClick={() => {
                                    this.setState({ isShowEdit: true })
                                }}
                            >
                                修改
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
                    title='活动详情'
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

export default connect(({ }) => {
    return {}
})(ActivityComponent)
