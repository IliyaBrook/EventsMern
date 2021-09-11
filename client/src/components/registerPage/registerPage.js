import React, {useEffect} from 'react'
import useFormHandler from "../../hooks/formHandler.hook";
import {useDispatch, useSelector} from 'react-redux'
import {
	REQUEST_REGISTRATION,
	SET_INPUT_CONTROLS,
	SET_REGISTRATION_INPUTS_EMAIL,
	SET_REGISTRATION_INPUTS_NAME,
	SET_REGISTRATION_INPUTS_PASSWORD
} from "../../redux/registration/registrationTypes"
import spinner from "../loaders/spinner"


const RegisterPage = () => {
	const {
		passwordErrorVal, nameClassName, emailClassName,
		nameErrorVal, emailErrorVal, passwordClassName
	} = useSelector(state => state.registrationReducer.errors)
	const {name, email, password} = useSelector(state => state.registrationReducer.inputControls)
	const {isLoading} = useSelector(state => state.registrationReducer)
	const dispatch = useDispatch()
	const {inputHandler, input} = useFormHandler({
		email: '',
		password: '',
		name: ''
	})
	useEffect(() => {window.M.updateTextFields()})
	useEffect(() => {
		dispatch({type: SET_INPUT_CONTROLS, payload: input})
	}, [input])
	const onFormSubmit = (e) => {
		e.preventDefault()
		dispatch({type: SET_REGISTRATION_INPUTS_EMAIL, payload: input})
		dispatch({type: SET_REGISTRATION_INPUTS_PASSWORD, payload: input})
		dispatch({type: SET_REGISTRATION_INPUTS_NAME, payload: input})
		dispatch({type: REQUEST_REGISTRATION})
	}
	
	if (isLoading) {
		return spinner
	}
	return (
		<form className="container p-xl-5 mt-5" onSubmit={onFormSubmit} noValidate>
			<div className="row">
				<div className="input-field col s6 offset-xl6 pull-xl3">
					<input type="email" id="email"
					       className={emailClassName}
					       name="email"
					       onChange={inputHandler}
					       value={email}
					       autoComplete="email"
					/>
					<label htmlFor="email">Email</label>
					<span className="helper-text"
					      data-error={emailErrorVal}
					      data-success="right"/>
				</div>
			</div>
			
			<div className="row">
				<div className="input-field col s6 offset-xl6 pull-xl3">
					<input type="password" id="password"
					       className={passwordClassName}
					       autoComplete="no"
					       name="password" onChange={inputHandler} value={password}
					/>
					<label htmlFor="password">Password</label>
					<span className="helper-text"
					      data-error={passwordErrorVal}
					      data-success="right"/>
				</div>
			</div>
			
			<div className="row">
				<div className="input-field col s6 offset-xl6 pull-xl3">
					<input type="text" id="name"
					       className={nameClassName}
					       value={name}
					       name="name" onChange={inputHandler}/>
					<label htmlFor="name">Name</label>
					<span className="helper-text"
					      data-error={nameErrorVal}
					      data-success="right"/>
				</div>
			</div>
			<div className="w-100 d-flex justify-content-center">
				<button typeof="submit" className="btn">Submit</button>
			</div>
		</form>
	)
}

export default RegisterPage