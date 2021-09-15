import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useFormHandler from "../../hooks/formHandler.hook"
import {REQUEST_LOGIN, UPDATE_LOGIN_INPUTS} from "../../redux/login/loginTypes"
import './loginPage.scss'


const LoginPage = () => {
	useEffect(() => {window.M.updateTextFields()})
	const dispatch = useDispatch()
	const {
		loginErrors:{emailError, emailClassName, passwordError, passwordClassName},
		inputs:{email, password}
	} = useSelector(state => state.loginReducer)
	const {inputHandler, input} = useFormHandler({
		email: '',
		password: '',
	})
	useEffect(() => {
		dispatch({type: UPDATE_LOGIN_INPUTS, payload: input})
	}, [input])
	const formSubmit = async (event) => {
		event.preventDefault()
		return dispatch({type: REQUEST_LOGIN})
	}
	
	return (
		<form noValidate onSubmit={formSubmit}>
			<div className="container p-xl-5 mt-5">
				<div className="row">
					<div className="input-field col s6 offset-xl6 pull-xl3">
						<input type="email"
						       className={emailClassName}
						       name="email"
						       id="email"
						       onChange={inputHandler}
						       autoComplete="email"
						       value={email}
						/>
						<label htmlFor="email">Email</label>
						<span className="helper-text"
						      data-error={emailError}
						      data-success="right"/>
					</div>
				</div>
				
				<div className="row">
					<div className="input-field col s6 offset-xl6 pull-xl3">
						<input type="password"
						       className={passwordClassName}
						       name="password" autoComplete="no"
						       id="password"
						       onChange={inputHandler}
						       value={password}
						/>
						<label htmlFor="password">Password</label>
						<span className="helper-text"
						      data-error={passwordError}
						      data-success="right"/>
					</div>
				</div>
			</div>
			<div className="w-100 d-flex justify-content-center">
				<button typeof="submit" className="btn">Submit</button>
			</div>
		</form>
	)
	
}

export default LoginPage