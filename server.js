/**
 * 自定义服务端渲染
 */
const parse = require('url-parse')
const express = require('express')
const next = require('next')

// 把/api为前缀的路径路由到对应api服务器
const devProxy = {
    '/api': {
        target: 'http://127.0.0.1:8000',
        pathRewrite: { '^/api': '/' },
        changeOrigin: true,
    },
}

const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        server = express()

        if (dev && devProxy) {
            const proxyMiddleware = require('http-proxy-middleware')
            Object.keys(devProxy).forEach(function (context) {
                server.use(proxyMiddleware(context, devProxy[context]))
            })
        }

        server.all('*', (req, res) => {
            const parsedUrl = parse(req.url, true)

            const { pathname } = parsedUrl
            // restful api中解析路径中的参数
            m = pathname.match(/^\/account\/(\d+)$/)
            if (m) {
                parsedUrl.pathname = '/account/info'
                parsedUrl.query.id = m[1]
            }

            handle(req, res, parsedUrl)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
    })
