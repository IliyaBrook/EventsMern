import React from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import Spinner from "./components/styled/spinner"

export const App = () => {
	const dispatch = useDispatch()
	
	const {
		loginReducer:{loading: loginLoading,isAuth},
		registrationReducer:{loading:registrationLoading},
		homePageReducer:{ loading: homePageLoading }
	} = useSelector(state => state)
	
	
	
	switch (isAuth) {
		case true:
			return (
				<Switch>
					<NavBarAuth/>
					<Route exact path="/">
						{homePageLoading ? <Spinner widht="100" height="50vh"/> : <HomePageAuth/>}
					</Route>
					<Route exact path="/events">
						{homePageLoading ? <Spinner widht="100" height="50vh"/> : <EventCalendar/>}
					</Route>
				</Switch>
			)
		default:
			return (
				<Switch>
					<NavBarNotAuth/>
					<Route path="/registration" exact>
						{registrationLoading ? <Spinner widht="100" height="50vh"/>: <RegisterPage/>}
					</Route>
					<Redirect to="/" exact/>
					<Route path="/login" exact>
						{loginLoading ? <Spinner widht="100" height="50vh"/> : <LoginPage/>}
					</Route>
					<Route path="/" exact>
						<HomePageNotAuth/>
					</Route>
				</Switch>
			)
	}
}
export default App