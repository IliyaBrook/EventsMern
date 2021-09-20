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
import {useDispatch, useSelector} from 'react-redux'
import Spinner from "./components/styled/spinner"

export const App = () => {
	const dispatch = useDispatch()
	useEffect(() => dispatch({type:'ENTER_PAGE'}),[])
	
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