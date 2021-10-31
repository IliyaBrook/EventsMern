import React from 'react'
import FacebookLogin from 'react-facebook-login'
import {facebookConfKey} from '../../../config/keys.json'
import {authApiAction} from "../../../redux/login/loginActions"
import {useDispatch} from "react-redux"
import './facebook.scss'

import {IconContext} from "react-icons";
import {FaFacebookSquare} from 'react-icons/fa';


const FaceBookAuth = (props) => {

    const fbIcon = (
        <IconContext.Provider value={{
            color: 'rgba(59, 89, 152,1)',
            size: props.square?.size || '1rem',
            className: 'facebookContext'
        }}>
            <FaFacebookSquare/>
        </IconContext.Provider>
    )


    const dispatch = useDispatch()

    const responseFacebook = ({email, name}) => {
        return dispatch(authApiAction({email, name}))
    }


    if ('square' in props) {
        props = {
            icon: fbIcon,
            textButton: '',
            buttonStyle: {
                backgroundColor: 'rgba(0, 0, 0,0)',
                border: 'none',
                margin:0,
                padding:0
            }
        }
    } else if ('custom' in props) {
        props = {
            textButton: props.custom.text || '',
            buttonStyle: {
                buttonText:'',
                ...props.custom
            }
        }
    }

    return (
        <FacebookLogin
            disableMobileRedirect={true}
            appId={facebookConfKey}
            autoLoad={false}
            fields="name,email,picture"
            size="small"
            {...props}
            callback={responseFacebook}/>
    );
};

export default FaceBookAuth