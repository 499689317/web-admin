import getConfig from 'next/config'
import querystring from 'querystring'
import fetch from 'isomorphic-unfetch'

const { publicRuntimeConfig } = getConfig()

export class HttpResponse {
    constructor({ status = 200, code = 0, message = '', data = {} }) {
        this.status = status
        this.code = code
        this.message = message
        this.data = data
    }
}

export class HttpFetch {
    timeout = 0
    headers = {}

    constructor({ timeout = 10000, headers = {} } = {}) {
        this.timeout = timeout
        this.headers = headers
    }

    request(path, options) {
        const url = `${process.env.hostname}/api/admin${path}`
        options.headers = { ...this.headers, ...(options.headers || {}) }
        options = {
            credentials: 'include',
            timeout: this.timeout,
            ...options
        }

        if (!process.env.isProd) {
            console.log({ url, options })
        }

        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('fetch timeout')), options.timeout)
            )
        ])
            .catch(e => Promise.reject(new HttpResponse({
                status: 400,
                message: String(e),
            })))
            .then(resp => resp.json())
            .then(({ code, message, data }) => {
                if (!process.env.isProd) {
                    console.log({ code, message, data })
                }

                if (code === 0) {
                    return new HttpResponse({ code, message, data })
                } else {
                    return Promise.reject(new HttpResponse({ code, message, data }))
                }
            })
    }

    get(path, params, options = {}) {
        if (typeof params === 'object') {
            params = querystring.stringify(params)
        }
        if (params) {
            path = `${path}?${params}`
        }
        return this.request(path, Object.assign(options, { method: 'GET' }))
    }

    post(path, body, options = {}) {
        if (typeof body === 'object') {
            options.headers = options.headers || {}
            options.headers['Content-Type'] = 'application/json'
            body = JSON.stringify(body)
        }
        return this.request(path, Object.assign(options, { method: 'POST', body }))
    }
}
