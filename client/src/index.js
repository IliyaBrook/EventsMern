import React from 'react'
import {applyMiddleware, createStore} from "redux"
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import thunk from "redux-thunk"
import './index.scss'
import {loginFormMiddleware} from "./redux/middleware/loginFormMiddleware"
import {registrationFormMiddleware} from "./redux/middleware/registrationFormMiddleware"
import App from "./app";
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import {Router} from 'react-router'
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from './redux/rootReducer'
import {createBrowserHistory} from 'history'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './redux/sagas/rootSaga'
import {checkRouteMiddleware} from "./redux/middleware/checkRouteMiddleware"

const saga = createSagaMiddleware()
const browserHistory = createBrowserHistory()
const middlewareRouting = routerMiddleware(browserHistory)

const composeEnhancers = composeWithDevTools({
	trace: true, traceLimit: 25
})

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(
		thunk, middlewareRouting,saga,
		registrationFormMiddleware,
		loginFormMiddleware,
		checkRouteMiddleware
	)
))
const history = syncHistoryWithStore(browserHistory, store)
saga.run(rootSaga)


const app = (
	<Provider store={store}>
		<Router history={history}>
			<App/>
		</Router>
	</Provider>
)


render(app, document.getElementById('root'))
