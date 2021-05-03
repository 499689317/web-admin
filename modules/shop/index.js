import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Table, Button, Drawer, Popconfirm } from 'antd'

import EditComponent from './edit'

const list = [
    {
        id: 1,
        name: 'product1',
        price: 1.99,
        type: 1,
        count: 10000000,
        bonus: [{
            type: 1,
            count: 100000
        }]
    },
    {
        id: 2,
        name: 'product2',
        price: 2.99,
        type: 3,
        count: 300,
        bonus: []
    }
]

class ShopComponent extends React.Component {
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
                title: '商品id',
                dataIndex: 'id',
                key: 'id',
                width: 100,
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                width: 100,
            },
            {
                title: '商品类型',
                dataIndex: 'type',
                key: 'type',
                width: 100,
            },
            {
                title: '数量',
                dataIndex: 'count',
                key: 'count',
                width: 100,
            },
            {
                title: '赠品',
                dataIndex: 'bonus',
                key: 'bonus',
                width: 200,
                render: (bonus) => {
                    const l = [];
                    for (let i = 0; i < bonus.length; i++) {
                        l.push(`商口类型${bonus[i].type}赠送${bonus[i].count}`)
                    }
                    return l.join('\n');
                }
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
                    title='商品编辑'
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
})(ShopComponent)
