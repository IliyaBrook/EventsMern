import React from 'react';
import './google.scss'
import {GoogleLogin} from 'react-google-login';
import {googleConfKey} from '../../../config/keys.json'
import {useDispatch} from "react-redux";
import {authApiAction} from "../../../redux/login/loginActions";


export default function GoogleAuth () {
    const dispatch = useDispatch()

    const responseGoogle = ({ profileObj }) => {
        if (profileObj) {
            return dispatch(authApiAction({email:profileObj.email, name:profileObj.name}))
        }
    }
    return (
        <>
            <GoogleLogin
                autoLoad={false}
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