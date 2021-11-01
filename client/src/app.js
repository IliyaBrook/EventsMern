import React, {useEffect, useState} from 'react'
import Switch from "react-bootstrap/Switch"
import {Route} from "react-router-dom"
import './components/navBar/navBars.scss'
import EventCalendar from "./components/events/calendar/eventCalendar"
import {useSelector} from 'react-redux'
import NavBar from "./components/navBar/navBar"
import Spinner from "./components/styled/spinner"
import RegisterPage from "./components/registerPage/registerPage"
import LoginPage from "./components/loginPage/loginPage"

export const App = () => {
    const [pageLoading, setPageLoading] = useState(true)
    useEffect(() => {
        setPageLoading(false)
    },[])

    const {
        loginReducer: {loading: loginLoading},
        registrationReducer: {loading: registrationLoading},
    } = useSelector(state => state)
    return (
        <Switch>
            {
                pageLoading ? (
                    <Spinner position="absolute"/>
                ) : (
                    <>
                        <NavBar/>
                        <Route path="/" exact>
                            <EventCalendar/>
                        </Route>
                    </>
                )
            }
            <Route path="/registration" exact>
                {registrationLoading ? <Spinner position="absolute"/> : <RegisterPage/>}
            </Route>
            <Route path="/login" exact>
                {loginLoading ? <Spinner position="absolute"/> : <LoginPage/>}
            </Route>
        </Switch>
    )
}
export default App