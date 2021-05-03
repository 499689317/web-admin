import getConfig from 'next/config'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { compareVersion } from './lib'
import reducer from './reducers'

const { publicRuntimeConfig } = getConfig()

export function makeStore(initialState, { isServer }) {
    initialState = initialState || reducer()

    const middlewares = [thunk]
    if (!process.env.isProd) {
        middlewares.push(logger)
    }
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

    if (isServer) {
        return createStore(reducer, initialState, enhancer)
    } else {
        const { persistReducer, persistStore } = require('redux-persist')
        const storage = require('redux-persist/lib/storage').default

        const persistedReducer = persistReducer({
            key: 'admin',
            whitelist: ['common', 'form', 'account'],
            storage,
            migrate: state => {
                // TODO 客户端渲染时候数据版本不一致需要更新store
                // if (state && compareVersion(state.common.version, process.env.version, 2) !== 0) {
                //     state = initialState
                // }
                return Promise.resolve(state)
            },
        }, reducer)
        const store = createStore(persistedReducer, initialState, enhancer)

        store.__persistor = persistStore(store)

        return store
    }
}
