import { combineReducers } from 'redux'

import { RESET_ACTION } from '../actions'
import account from './account'
import dailytask from './dailytask'

const reducer = combineReducers({
    account,
    dailytask,
})

const initialState = reducer()

const reducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case RESET_ACTION:
            return initialState
        default:
            return reducer(state, action)
    }
}

export default reducers;
