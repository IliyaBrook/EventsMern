import React from 'react'
import Switch from "react-bootstrap/Switch"
import {Route} from "react-router-dom"
import NavBarAuth from "./components/navBar/navBarAuth"
import './components/navBar/navBars.scss'
import EventCalendar from "./components/events/calendar/eventCalendar"
import {useSelector} from 'react-redux'
import NavBarNotAuth from "./components/navBar/navBarNotAuth"
import Spinner from "./components/styled/spinner"
import RegisterPage from "./components/registerPage/registerPage"
import LoginPage from "./components/loginPage/loginPage"

export const App = () => {
	const {
		loginReducer: {loading: loginLoading, isAuth},
		registrationReducer: {loading: registrationLoading}
	} = useSelector(state => state)
	
	switch (isAuth) {
		case true:
			return (
				<Switch>
					<NavBarAuth/>
					<Route exact path="/">
						<EventCalendar/>
					</Route>
				</Switch>
			)
		default:
			return (
				<Switch>
					<NavBarNotAuth/>
					<Route path="/registration" exact>
						{registrationLoading ? <Spinner position="absolute"/> : <RegisterPage/>}
					</Route>
					<Route path="/login" exact>
						{loginLoading ? <Spinner position="absolute"/> : <LoginPage/>}
					</Route>
					<Route path="/" exact>
						<EventCalendar/>
					</Route>
				</Switch>
			)
	}
}
export default App