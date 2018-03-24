import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Nucare from './reducers/nucare'
import Auth from './reducers/auth'
const store = createStore(
    combineReducers({
        Auth,
        Nucare,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk,logger)
)

export default store