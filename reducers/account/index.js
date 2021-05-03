import { SET_ACCOUNT_INFO_ACTION } from '../../actions'

const initialState = {
    "user": {
        "id": 0,
        "nickname": '',
        "password": '',
        "author": '',
        "cover": ''
    }
}

const account = (state = initialState, action = {}) => {
    const { type, ...payload } = action
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

    switch (type) {
        case SET_ACCOUNT_INFO_ACTION:
            return Object.assign({ ...state }, payload)
        default:
            return state
    }
}
export default account;