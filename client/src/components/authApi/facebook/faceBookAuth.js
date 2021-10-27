import React from 'react'
import FacebookLogin from 'react-facebook-login'
import {facebookConfKey} from '../../../config/keys.json'
import {authApiAction} from "../../../redux/login/loginActions"
import {useDispatch} from "react-redux"
import './facebook.scss'

const FaceBookAuth = () => {
    const dispatch = useDispatch()

    const responseFacebook = ({ email, name }) => {
        return dispatch(authApiAction({email, name}))
    }


    return (
        <FacebookLogin
            disableMobileRedirect={true}
            appId={facebookConfKey}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}/>
    );
};

export default FaceBookAuth