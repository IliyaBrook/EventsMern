import React from 'react';
import './google.scss'
import {GoogleLogin} from 'react-google-login';
import {googleConfKey} from '../../../config/keys.json'
import {useDispatch} from "react-redux";
import {authApiAction} from "../../../redux/login/loginActions";


export default function GoogleAuth () {
    const dispatch = useDispatch()

    const responseGoogle = ({ profileObj }) => {
        return dispatch(authApiAction(profileObj.email))
    }
    return (
        <>
            <GoogleLogin
                className="googleAuth"
                clientId={googleConfKey}
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
};