import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {useInitSideNav} from "../../hooks/useInitNav";
import FaceBookAuth from "../authApi/facebook/faceBookAuth";
import GoogleAuth from "../authApi/google/googleAuth";


const NavBarNotAuth = () => {
    const sideNavRef = useRef()
    useInitSideNav(sideNavRef)

    return (
        <div>
            <nav>
                <div className="nav-wrapper #607d8b blue-grey darken-3">
                    <Link className="brand-logo center logoNavBar logoHeader" to="/">
                        <div className="logoHeader">
                            Social City
                        </div>
                    </Link>

                    <div data-target="slide-out"
                         className="sidenav-trigger left">
                        <i className="material-icons" style={{cursor: 'pointer'}}>
                            menu
                        </i>
                    </div>
                        <ul className="right">
                            <li>
                                <Link to="/registration">Register</Link>
                            </li>

                            <li>
                                <Link to="/login" className="pr-4">Login</Link>
                            </li>
                        </ul>

                </div>
            </nav>

            <ul className="sidenav" id="slide-out" ref={sideNavRef}>
                <li>
                    <Link to="/registration">Register</Link>
                </li>
                <li>
                    <Link to="/login" className="pr-4">Login</Link>
                </li>

                <div className="facebookGoogleButtonsWrapper">
                    <div className="facebookGoogleButtonsContent">
                        <div className="facebookWrapper">
                            <FaceBookAuth custom={{text: 'FACEBOOK'}}/>
                        </div>
                        <div className="googleWrapper">
                            <GoogleAuth text="GMAIL"/>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default NavBarNotAuth