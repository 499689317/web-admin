import { showMessage, HttpResponse, needLogin } from '../lib'

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
            needLogin()
        } else {
            showMessage(error.message)
        }
    } else {
        showMessage(`${error}`)
    }
}