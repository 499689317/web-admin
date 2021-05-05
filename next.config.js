const withLess = require("@zeit/next-less");
const withAntdLess = require('next-plugin-antd-less');

const isProd = process.env.NODE_ENV === "production";

module.exports = withAntdLess(
    // withLess(
    {
        lessLoaderOptions: {
            lessOptions: {
                javascriptEnabled: true,
            }
        },
        cssLoaderOptions: {
            esModule: false,
            sourceMap: false,
            modules: {
                mode: 'local',
            },
        },
        env: {
            isProd,
            name: 'web-admin',
            version: '0.1.0',
            contactEmail: 'dehu.meng@centurygame.com',
            hostname: isProd ? 'http://127.0.0.1:8000' : 'http://127.0.0.1:3000'
        },
        publicRuntimeConfig: {
        },
        serverRuntimeConfig: {
        },
    }
    // )
);