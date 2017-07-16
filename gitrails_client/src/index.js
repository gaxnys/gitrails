import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import Reducer from './reducers'
import App from './components/App'
import { fetchTodos } from './actions'

const store = createStore(
    Reducer,
    undefined,
    (process.env.NODE_ENV === "development") ?
    applyMiddleware(thunkMiddleware, logger) :
    applyMiddleware(thunkMiddleware)
)

store.dispatch(fetchTodos())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
