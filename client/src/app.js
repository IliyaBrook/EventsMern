import React, {useEffect} from 'react'
import Switch from "react-bootstrap/Switch"
import {Redirect, Route} from "react-router-dom"
import NavBarNotAuth from "./components/navBar/navBarNotAuth"
import RegisterPage from "./components/registerPage/registerPage"
import NavBarAuth from "./components/navBar/navBarAuth"
import './components/navBar/navBars.scss'
import LoginPage from "./components/loginPage/loginPage"
import HomePageNotAuth from "./components/homePage/homePageNotAuth"
import HomePageAuth from "./components/homePage/homePageAuth"
import EventCalendar from "./components/events/calendar/eventCalendar"
import {useDispatch} from 'react-redux'
import {refreshUserAction} from "./redux/login/loginActions"
import {windowSizeAction} from "./redux/toolsStates/windowSizeReducer";


export const App = () => {
	const storageData = JSON.parse(localStorage.getItem('userData'))
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(windowSizeAction())
		dispatch(refreshUserAction())
	}, [])
	
	
	const isToken = !!storageData?.token
	
	switch (isToken) {
		case true:
			return (
				<Switch>
					<NavBarAuth/>
					<Route exact path="/">
						<HomePageAuth/>
					</Route>
					<Route exact path="/events">
						<EventCalendar/>
					</Route>
				</Switch>
			)
		default:
			return (
				<Switch>
					<NavBarNotAuth/>
					<Route path="/register" exact>
						<RegisterPage/>
					</Route>
					<Redirect to="/" exact/>
					<Route path="/login" exact>
						<LoginPage/>
					</Route>
					<Route path="/" exact>
						<HomePageNotAuth/>
					</Route>
				</Switch>
			)
	}
	
}
export default App