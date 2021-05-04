import parse from 'url-parse'
import Router from 'next/router'
import { showMessage, HttpResponse } from '../lib'

export * from './account'

export const RESET_ACTION = 'reset_action'

export const resetAction = () => {
    return {
        type: RESET_ACTION,
    }
}

export function handleActionError(error) {
    if (error instanceof HttpResponse) {
        if (error.status === 401) {
            Router.replace(parse.format({
                pathname: '/login',
                query: {
                    from: parse.format({
                        pathname: Router.pathname,
                        query: Router.query
                    })
                }
            }))
        } else {
            showMessage(error.message)
        }
    } else {
        showMessage(`${error}`)
    }
}