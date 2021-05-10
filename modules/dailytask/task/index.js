import React from 'react'
import { connect } from 'react-redux'
import { Table, Button, Drawer, Card, Input } from 'antd'
import { Form } from '@ant-design/compatible'

import '@ant-design/compatible/assets/index.css'

// import EditComponent from './edit'

import { onTableChange, HttpFetch, showMessage } from '../../../lib'
import { getDailyTaskInfoAction, handleActionError } from '../../../actions'

class DailyTaskComponent extends React.Component {
    state = {
        list: [],
        total: 0,
        current: 1,
        pageSize: 20,
        isShowEdit: false,
        isLoading: false,
    }

    static async getInitialProps({ req, query, store }) {
        return {};
    }

    constructor(props) {
        super(props)
        // Object.assign(this.state, { list })
    }

    // 获取面板列表数据
    fetchDailyTaskData(playerId) {
        const { dispatch } = this.props;
        const httpFetch = new HttpFetch({ timeout: 30000 });
        this.setState({ isLoading: true });
        dispatch(getDailyTaskInfoAction({
            httpFetch,
            playerId
        })).then(resp => {
            const { taskList } = resp.data;
            this.setState({ list: taskList, isLoading: false });
        }).catch((e) => {
            handleActionError(e);
        });
    }

    onSearchDailyTask(event) {
        const { playerId } = this.props.form.getFieldsValue();
        if (!playerId) {
            return showMessage('用户id为空');
        }
        this.fetchDailyTaskData(playerId);
    }

    render() {
        const bodyHeight = document.body.clientHeight;
        const headerHeight = document.getSelection('.ant-pro-global-header').clientHeight || 64;
        const tableHeight = bodyHeight - headerHeight - 170;

        const { getFieldDecorator } = this.props.form;

        const columns = [
            {
                title: '任务id',
                dataIndex: 'taskUUID',
                key: 'taskUUID',
                width: 100,
            },
            {
                title: '任务目标',
                dataIndex: 'taskTargetData',
                key: 'taskTargetData',
                width: 100,
            },
            {
                title: '任务奖励',
                dataIndex: 'taskRewardData',
                key: 'taskRewardData',
                width: 100,
                render: (lock) => {
                    return lock ? '未解锁' : '已解锁';
                }
            },
            {
                title: '奖励领取状态',
                dataIndex: 'hasGotReward',
                key: 'hasGotReward',
                width: 100,
            },
            {
                title: '任务状态',
                dataIndex: 'taskState',
                key: 'taskState',
                width: 100,
                render: (finish) => {
                    return finish ? '已完成' : '未完成';
                }
            },
            {
                title: '机台id',
                dataIndex: 'machineId',
                key: 'machineId',
                width: 100,
            },
            {
                title: '奖励返还率',
                dataIndex: 'rewardRTP',
                key: 'rewardRTP',
                width: 100,
            },
            {
                title: '总下注金额',
                dataIndex: 'totalBet',
                key: 'totalBet',
                width: 100,
            },
            {
                title: '目标完成数量',
                dataIndex: 'targetHitCounter',
                key: 'targetHitCounter',
                width: 100,
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
                    rowKey={item => item.taskUUID}
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
                    title='任务数据修改'
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
})(Form.create()(DailyTaskComponent))
