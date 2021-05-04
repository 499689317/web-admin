/**
 * 基础布局
 */
import React from 'react';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

export default function LayoutBasic({ menuData, pathname, onClick, children }) {
    return (
        <div style={{ height: '100vh' }}>
            <ProLayout
                title='Jackpot Craze'
                logo='/favicon.ico'
                navTheme='light'
                {...menuData}
                location={{ pathname }}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            onClick(item, dom)
                        }}
                    >
                        {dom}
                    </a>
                )}
                fixSiderbar
            >
                {children}
            </ProLayout>
        </div>
    )
}
