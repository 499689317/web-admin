import React from 'react'
import { connect } from 'react-redux'
import { Table, Button, Drawer, Card, Input } from 'antd'
import { Form } from '@ant-design/compatible'
import moment from 'moment'

import '@ant-design/compatible/assets/index.css'

// import EditComponent from './edit'

import { onTableChange, HttpFetch, showMessage } from '../../../lib'
import { getTaskPanelInfoAction, handleActionError } from '../../../actions'

class TaskPanelComponent extends React.Component {
    state = {
        list: [],
        total: 0,
        current: 1,
        pageSize: 20,
        isShowEdit: false,
        isLoading: false,
    }

    static async getInitialProps({ req, query, store }) {
        // const httpFetch = new HttpFetch({ timeout: 30000 });
        // const resp = await store.dispatch(getTaskPanelInfoAction({
        //     httpFetch, id: query.id
        // }))
        // const { stateDataArray, dailyTaskStateUUID, today, rewardList } = resp.data
        // return { stateDataArray, dailyTaskStateUUID, today, rewardList }
    }

    constructor(props) {
        super(props)
        // Object.assign(this.state, { list })
    }

    // 获取面板列表数据
    fetchDailyTaskData(playerId, taskStateId) {
        const { dispatch } = this.props;
        const httpFetch = new HttpFetch({ timeout: 30000 });
        this.setState({ isLoading: true });
        dispatch(getTaskPanelInfoAction({
            httpFetch,
            playerId,
            taskStateId,
        })).then(resp => {
            const { stateDataArray, dailyTaskStateUUID, today, rewardList } = resp.data;
            this.setState({ list: stateDataArray, isLoading: false });
        }).catch((e) => {
            handleActionError(e);
        });
    }

    onSearchDailyTask(event) {
        const { playerId, taskStateId } = this.props.form.getFieldsValue();
        if (!playerId || !taskStateId) {
            return showMessage('非法参数');
        }
        this.fetchDailyTaskData(playerId, taskStateId);
    }

    render() {
        const bodyHeight = document.body.clientHeight;
        const headerHeight = document.getSelection('.ant-pro-global-header').clientHeight || 64;
        const tableHeight = bodyHeight - headerHeight - 170;

        const { getFieldDecorator } = this.props.form;

        const columns = [
            {
                title: '任务天数',
                dataIndex: 'dayUUID',
                key: 'dayUUID',
                width: 100,
            },
            {
                title: '任务id',
                dataIndex: 'taskLinkedUUID',
                key: 'taskLinkedUUID',
                width: 100,
            },
            {
                title: '解锁状态',
                dataIndex: 'lock',
                key: 'lock',
                width: 100,
                render: (lock) => {
                    return lock ? '未解锁' : '已解锁';
                }
            },
            {
                title: '激活状态',
                dataIndex: 'activation',
                key: 'activation',
                width: 100,
            },
            {
                title: '完成状态',
                dataIndex: 'finish',
                key: 'finish',
                width: 100,
                render: (finish) => {
                    return finish ? '已完成' : '未完成';
                }
            },
            {
                title: '服务器开始时间',
                dataIndex: 'startServerDateStr',
                key: 'startServerDateStr',
                width: 200,
            },
            {
                title: '服务器停止时间',
                dataIndex: 'stopServerDateStr',
                key: 'stopServerDateStr',
                width: 200,
            },
            {
                title: '开始时间',
                dataIndex: 'startDate',
                key: 'startDate',
                width: 200,
                render: (time) => moment(time).format('YYYY-MM-DD HH:MM:SS Z'),
            },
            {
                title: '停止时间',
                dataIndex: 'stopDate',
                key: 'stopDate',
                width: 200,
                render: (time) => moment(time).format('YYYY-MM-DD HH:MM:SS Z'),
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
                                修改
                            </Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Card>
                    <Form layout='inline'>
                        <Form.Item>
                            {
                                getFieldDecorator('playerId', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户id不能为空'
                                        }
                                    ]
                                })
                                    (
                                        <Input
                                            style={{ width: '250px', textAlign: 'left' }}
                                            placeholder='输入用户id'
                                            allowClear
                                        >
                                        </Input>
                                    )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('taskStateId', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户id不能为空'
                                        }
                                    ]
                                })
                                    (
                                        <Input
                                            style={{ width: '250px', textAlign: 'left' }}
                                            placeholder='输入任务id'
                                            allowClear
                                        >
                                        </Input>
                                    )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                disabled={this.state.isLoading}
                                onClick={(e) => {
                                    this.onSearchDailyTask(e);
                                }}
                            >
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Table
                    dataSource={this.state.list}
                    rowKey={item => item.dayUUID}
                    pagination={{ current: this.state.current, pageSize: this.state.pageSize }}
                    loading={this.state.isLoading}
                    columns={columns}
                    bordered
                    scroll={{ x: 1980, y: tableHeight }}
                    onChange={(pagination, filters, sorter) => {
                        console.log(pagination, filters, sorter)
                        const tableChange = onTableChange(pagination, filters, sorter);
                        this.setState({ current: tableChange.current });
                    }}
                >
                </Table>
                <Drawer
                    width='50%'
                    title='面板数据修改'
                    placement='right'
                    visible={this.state.isShowEdit}
                    closable
                    onClose={() => {
                        this.setState({ isShowEdit: false })
                    }}
                >
                    {/* <EditComponent /> */}
                </Drawer>
            </div>
        )
    }
}

export default connect(({ dailytask }) => {
    return { dailytask }
})(Form.create()(TaskPanelComponent))
