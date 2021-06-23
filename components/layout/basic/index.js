/**
 * 基础布局
 */
import React from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

import AvatarComponent from './avatar'

export default function LayoutBasic({ menuData, pathname, onClick, children }) {
    return (
        <div style={{ height: '100vh' }}>
            <ProLayout
                title='Admin Manager'
                logo='/favicon.ico'
                navTheme='light'
                waterMarkProps={{ content: 'Admin Manager' }}
                fixSiderbar
                {...menuData}
                location={{ pathname }}
                rightContentRender={() => (
                    <AvatarComponent />
                )}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            onClick(item, dom)
                        }}
                    >
                        {dom}
                    </a>
                )}
            >
                <PageContainer
                    ghost
                    header={{ breadcrumb: {} }}
                >
                    {children}
                </PageContainer>
            </ProLayout>
        </div>
    )
}
