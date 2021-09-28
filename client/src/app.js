import React, {useEffect} from 'react'
import Switch from "react-bootstrap/Switch"
import {Route, useLocation} from "react-router-dom"
import NavBarAuth from "./components/navBar/navBarAuth"
import './components/navBar/navBars.scss'
import HomePageAuth from "./components/homePage/auth/homePageAuth"
import EventCalendar from "./components/events/calendar/eventCalendar"
import {useDispatch, useSelector} from 'react-redux'
import {push} from "react-router-redux"
import NavBarNotAuth from "./components/navBar/navBarNotAuth"
import Spinner from "./components/styled/spinner"
import RegisterPage from "./components/registerPage/registerPage"
import {Redirect} from "react-router"
import LoginPage from "./components/loginPage/loginPage"
import HomePageNotAuth from "./components/homePage/notAuth/homePageNotAuth"

export const App = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	
	useEffect(() => {
		const htmlSelector = document.querySelector('html')
		if (location.pathname === '/') {
			document.body.style.overflow = 'hidden'
			htmlSelector.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'visible'
			htmlSelector.style.overflow = 'visible'
		}
	}, [location.pathname])
	
	useEffect(() => {
		if (location.pathname !== '/') {
			dispatch(push(location.pathname))
		}
	}, [])
	
	const {
		loginReducer: {loading: loginLoading, isAuth},
		registrationReducer: {loading: registrationLoading},
		homePageReducer: {loading: homePageLoading},
	} = useSelector(state => state)
	
	
	switch (isAuth) {
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
					<Route path="/registration" exact>
						{registrationLoading ? <Spinner position="absolute"/> : <RegisterPage/>}
					</Route>
					<Redirect to="/" exact/>
					<Route path="/login" exact>
						{loginLoading ? <Spinner position="absolute"/> : <LoginPage/>}
					</Route>
					<Route path="/" exact>
						{!homePageLoading ? <HomePageNotAuth/> : <Spinner position="absolute"/>}
					</Route>
				</Switch>
			)
	}
}
export default App