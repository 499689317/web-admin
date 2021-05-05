/**
 * 用户头像下拉组件
 */
import React, { useState } from 'react'
import { Drawer, Dropdown, Menu, Avatar } from 'antd'
import { DislikeFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import styles from './avatar.less'

export default function AvatarComponent() {
    const [isShowEdit, setIsShowEdit] = useState(false)
    const menuClick = function (key) {
        if (key === 'account') {
            setIsShowEdit(true);
        }
        if (key === 'logout') {
            console.log('用户退出')
        }
    }
    const menuDropdown = (
        <Menu
            selectable
            selectedKeys={[]}
            onClick={(e) => {
                menuClick(e.key);
            }}
        >
            <Menu.Item key='account'>
                <UserOutlined />
                用户信息
            </Menu.Item>
            <Menu.Item key='logout'>
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    )
    return (
        <div>
            <Dropdown overlay={menuDropdown}>
                <span className={styles.accountHeader}>
                    <Avatar size="small" icon={<DislikeFilled />} />
                    <span className={styles.accountName}>admin</span>
                </span>
            </Dropdown>
            <Drawer
                width='30%'
                title='用户信息'
                placement='right'
                closable
                visible={isShowEdit}
                onClose={() => {
                    setIsShowEdit(false);
                }}
            >
            </Drawer>
        </div>
    )
}