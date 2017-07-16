import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import Reducer from './reducers'
import App from './components/App'
import { fetchTodos, railsTestAction } from './actions'
import cablecar from './cableCarMiddleware'

const store = createStore(
    Reducer,
    undefined,
    compose(
        (process.env.NODE_ENV === "development") ?
        applyMiddleware(thunkMiddleware, logger) :
        applyMiddleware(thunkMiddleware),
        applyMiddleware(cablecar)
    )
)

const options = {
    params: { room: 'game' },
    prefix: 'RAILS'
};

cablecar.connect(store, 'ChatChannel', options);

store.dispatch(fetchTodos())

store.dispatch(railsTestAction())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
