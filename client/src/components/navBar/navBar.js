import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import SideNavAuthorized from "./SideNavAuthorized";
import {Dropdown} from "react-bootstrap";

const NavBar = () => {
    const {isAuth, name} = useSelector(state => state.loginReducer)

    const dropDownAuth = () => {
        return (
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" as="i"
                                 className="material-icons"
                                 style={{cursor: 'pointer'}}
                >
                    menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper #607d8b blue-grey darken-3">
                    <Link className="brand-logo center logoNavBar logoHeader" to="/">
                        <div className="logoHeader">
                            Social City
                        </div>
                    </Link>

                    {
                        !isAuth ? (
                            <div
                                data-target={!isAuth && "slide-out"}
                                className={!isAuth && "sidenav-trigger"}
                            >
                                <i className="material-icons" style={{cursor: 'pointer'}}>
                                    menu
                                </i>
                            </div>
                        ) : (
                            <div>
                                {dropDownAuth()}
                            </div>
                        )
                    }

                    <ul className="right">
                        {
                            isAuth ? (
                                <div className="userNameNav">
                                    <span className="font-weight-bold">
                                    {name}
                                </span>
                                </div>
                            ) : (
                                <li>
                                    <Link to="/registration">Register</Link>
                                </li>
                            )
                        }

                        {
                            !isAuth && (
                                <li>
                                    <Link to="/login" className="pr-4">Login</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
            <SideNavAuthorized isAuth={isAuth}/>

        </div>
    );
};

export default NavBar