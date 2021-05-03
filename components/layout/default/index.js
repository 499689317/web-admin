/**
 * 默认的简单布局
 */
import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';

import HeaderDefault from './header';
import FooterDefault from './footer';

export default function LayoutDefault({ children }) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Layout style={{ minHeight: '100vh' }}>
                <HeaderDefault />

                <Layout.Content>
                    {children}
                </Layout.Content>

                <FooterDefault />
            </Layout>
        </div>
    )
}
