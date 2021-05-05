/**
 * 自定义table搜索组件
 */
import React from 'react'
import { Input, Space, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

export default function getColumnSearchProps(dataIndex) {
    return {
        filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
            return (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            // icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            )
        },
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    }
}