import { HttpFetch } from '../../lib'

export const SET_ACCOUNT_INFO_ACTION = 'set_account_info_action'

// reducer同步store state action
export const setAccountInfoAction = ({ user }) => {
    return {
        type: SET_ACCOUNT_INFO_ACTION,
        user,
    }
}

export const getAccountInfoAction = ({ httpFetch } = {}) =>
    dispatch => {
        httpFetch = httpFetch || new HttpFetch()
        return httpFetch.get('/account/info')
            .then(resp => {
                const { user } = resp.data
                dispatch(setAccountInfoAction({ user }))
                return resp
            })
    }

export const loginAction = ({ nickname, password } = {}) =>
    dispatch => {
        const httpFetch = new HttpFetch()
        return httpFetch.post('/account/login', {
            nickname, password
        })
            .then(async resp => {
                await dispatch(getAccountInfoAction())
                return resp
            })
    }

export const editAccountAction = ({ nickname, password } = {}) =>
    dispatch => {
        const httpFetch = new HttpFetch()
        return httpFetch.post('/account/edit', {
            nickname, password
        })
            .then(async resp => {
                await dispatch(getAccountInfoAction())
                return resp
            })
    }
