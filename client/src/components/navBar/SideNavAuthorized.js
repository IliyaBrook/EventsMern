import React, {useEffect, useRef} from 'react';
import {logoutAction} from "../../redux/login/loginActions";
import {Link} from "react-router-dom";
import FaceBookAuth from "../authApi/facebook/faceBookAuth";
import GoogleAuth from "../authApi/google/googleAuth";

const SideNavAuthorized = ({isAuth}) => {

    const sideNavRef = useRef()

    useEffect(() => {
        const clickNavEvent = event => {
            if (sideNavRef.current && sideNavRef.current.contains(event.target)) {
                instance.close()
            }
        }
        window.M.Sidenav.init(sideNavRef.current, {
            onOpenStart: () => window.addEventListener("click", clickNavEvent),
            onCloseEnd: () => window.removeEventListener('click', clickNavEvent)
        })
        const instance = M.Sidenav.getInstance(sideNavRef.current)
    }, [])

    return (
        <div>
            <ul className="sidenav" id="slide-out" ref={sideNavRef} >
                <div className="sideNavRegLoginWrapper">
                    {
                        isAuth ? (
                            <div className="p-1">
                                <div className="ml-2 hoverable">
                                    <button className="btn-flat modal-trigger"
                                            data-target="modalAuthNavBar">Profile
                                    </button>
                                </div>
                                <div className="ml-2 hoverable">
                                    <button className="btn-flat red-text" onClick={() => logoutAction()}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <li>
                                    <Link to="/registration">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="pr-4">Login</Link>
                                </li>
                            </>
                        )
                    }
                </div>

                {
                    !isAuth && (
                        <>
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
                        </>
                    )
                }
            </ul>
        </div>
    );
};

export default SideNavAuthorized;