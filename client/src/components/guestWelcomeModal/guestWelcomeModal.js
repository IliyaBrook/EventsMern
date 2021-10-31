import React, {useEffect, useRef} from 'react'
import './guestWelcomeModal.scss'
import FaceBookAuth from "../authApi/facebook/faceBookAuth"
import GoogleAuth from "../authApi/google/googleAuth"

const GuestWelcomeModal = () => {

    const guestWelcomeModalRef = useRef()

    const handleClose = () => {
        const instance = window.M.Modal.init(guestWelcomeModalRef.current)
        instance.close()
    }
    useEffect(() => {
        const instance = window.M.Modal.init(guestWelcomeModalRef.current)
        instance.open()
    }, [])

    return (
        <div className="modal" ref={guestWelcomeModalRef}>
            <div className="modalContentWrapper">
                <div className="btnCloseWrapper">
                    <button type="button" className="btn-close" aria-label="Close"/>
                </div>
                <div className="headerWrapper">
                    <h4>WELCOME</h4>
                </div>
                <div className="description1Wrapper">
                    <div>
                        to The Social City project:
                    </div>

                    <div>
                        This APP was specially designed to make it easy for you to find
                        & enroll into all events in your city!
                    </div>
                </div>
                <div className="noteDescriptionWrapper">
                    <div className="noteDescriptionBorder">
                        <div className="noteDescriptionText">
                            NOTE: you have to be logged-in to enroll into an event
                        </div>
                    </div>
                </div>
                <p className="descriptionSignInHeader">
                    sing-in or create an account for free to start your journey
                </p>
                <div className="singInRegMethodsWrapper">
                    <div className="btnRegLoginWrapper">
                        <div className="regBtnWrapper">
                            <button className="btn">Login</button>
                        </div>
                        <div className="loginBtnWrapper">
                            <button className="btn">Registration</button>
                        </div>
                    </div>
                    <div className="socialLogin">
                        <div className="socialLoginContent">
                            or
                            <p>
                                sign-in
                            </p>
                            with
                            <div className="facebookBtnWrapper">
                                <FaceBookAuth square={{size:'2.2rem'}}/>
                            </div>
                            or
                            <div className="googleAuthBtnWrapper">
                                <GoogleAuth size='1.3'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestWelcomeModal;