import React, {useEffect} from 'react';
import './google.scss'
import {GoogleLogin} from 'react-google-login';
import {googleConfKey} from '../../../config/keys.json'
import {useDispatch} from "react-redux";
import {authApiAction} from "../../../redux/login/loginActions";

export default function GoogleAuth(props) {

    useEffect(() => {
        const gContext = document.querySelector('.googleContext')
        if (gContext) {
            const changeSize = ({size}) => {
                return gContext.children[0].style.transform = `scale(${size})`
            }
            props = {
                size:props.size,
                buttonText: props.text || null,
            }
            changeSize({size:props.size})
        }

    }, [props])

    const dispatch = useDispatch()

    const responseGoogle = ({profileObj}) => {
        console.log(profileObj)
        if (profileObj) {
            return dispatch(authApiAction({email: profileObj.email, name: profileObj.name}))
        }
    }

    return (
        <GoogleLogin
            autoLoad={false}
            clientId={googleConfKey}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            buttonText={props.text ? props.text : ''}
            className={props.text ? null : 'googleContext'}
        />
    )
};