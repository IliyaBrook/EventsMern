import React, {useEffect} from 'react'
import Switch from "react-bootstrap/Switch"
import {Redirect, Route, useLocation} from "react-router-dom"

import NavBarNotAuth from "./components/navBar/navBarNotAuth"
import RegisterPage from "./components/registerPage/registerPage"
import NavBarAuth from "./components/navBar/navBarAuth"
import './components/navBar/navBars.scss'
import LoginPage from "./components/loginPage/loginPage"
import HomePageNotAuth from "./components/homePage/homePageNotAuth"
import HomePageAuth from "./components/homePage/homePageAuth"
import EventCalendar from "./components/events/calendar/eventCalendar"
import {useDispatch, useSelector} from 'react-redux'
import Spinner from "./components/styled/spinner"
import {push} from "react-router-redux"

export const App = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const resizeWidth = useSelector(state => state.windowSizeReducer.width)
	
	
	useEffect(() => {
		const body = document.querySelector('body')
		const windowSize = document.body.clientWidth
		if (location.pathname === '/' && windowSize < 670) {
			body.style.overflow = 'hidden'
		} else {
			body.style.overflow = 'visible'
		}
	}, [resizeWidth, location])
	
	useEffect(() => {
		dispatch({type: 'ENTER_PAGE'})
		if (location.pathname !== '/') {
			dispatch(push(location.pathname))
		}
	}, [])
	
	const {
		loginReducer: {loading: loginLoading, isAuth},
		registrationReducer: {loading: registrationLoading},
		homePageReducer: {loading: homePageLoading}
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