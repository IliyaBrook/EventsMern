import React, {useEffect, useRef, useState} from 'react'
import {Button, Form} from "react-bootstrap"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createEventSubmitAction} from "../../../redux/events/eventsAction"
import {useFormatDate} from "../../../hooks/useFormatDate"
import {CLEAR_ALL_ADD_EVENT_INPUTS, CREATE_EVENT_INPUT_FIELDS} from "../../../redux/events/eventsTypes";


const AddEvent = ({createEventSubmitAction, clearInputsState, updateReduxStateInputs}) => {
	const startDateRef = useRef()
	const endDateRef = useRef()
	const startTimeRef = useRef()
	const endTimeRef = useRef()
	const dropDownRef = useRef()
	
	const [eventInputs, setEventInputs] = useState({
		eventName: '',
		startDate: '',
		endDate:'',
		startTime:'',
		endTime:'',
		color: '',
		categories: '',
		freeSpots: '',
		eventDescription: ''
	})
	
	useEffect(() => {
		updateReduxStateInputs(eventInputs)
	}, [eventInputs])
	
	
	useEffect(() => {
		pickerEventHandler(window.M.Datepicker, startDateRef, getStartDateHandler)
		pickerEventHandler(window.M.Datepicker, endDateRef, getEndDateHandler)
		pickerEventHandler(window.M.Timepicker, startTimeRef, () => getTime(startTimeRef, setEventInputs, "startTime"))
		pickerEventHandler(window.M.Timepicker, endTimeRef, () => getTime(endTimeRef, setEventInputs, "endTime"))
		window.M.Modal.init(dropDownRef.current)
	}, [])
	
	
	const getStartDateHandler = (event) => {
		const startDate = useFormatDate(event)
		return setEventInputs(prevState => ({...prevState, startDate }))
	}
	
	const getEndDateHandler = (event) => {
		const endDate = useFormatDate(event)
		return setEventInputs(prevState => ({...prevState, endDate }))
	}
	const getTime = (ref, actionFunc, key) => {
		const amOrPmEnd = ref.current.M_Timepicker.amOrPm
		let hour = ref.current.M_Timepicker.hours
		let minute = ref.current.M_Timepicker.minutes
		hour = hour.toString().length < 2 ? "0" + hour.toString() : hour.toString()
		minute = minute.toString().length < 2 ? "0" + minute.toString() : minute.toString()
		const time = `${hour}:${minute} ${amOrPmEnd}`
		return actionFunc((prevState) => ({...prevState,[key]: time}))
	}
	const pickerEventHandler = (materializePicker, ref, onSelectCallback) => {
		return materializePicker.init(ref.current, {
			container: 'body',
			onSelect: onSelectCallback,
		})
	}
	
	const inputHandler = (event) => {
		return setEventInputs(prevState => ({...prevState, [event.target.id]: event.target.value}))
	}
	
	const clearAllInputs = () => {
		clearInputsState()
		const input = document.querySelectorAll(".inputAddEvent")
		input.forEach(elem => elem.value = '')
		document.querySelector('.selectColor').style.background = 'white'
	}
	
	const submitEvent = (event) => {
		event.preventDefault()
		return createEventSubmitAction(clearAllInputs)
	}
	
	
	const onSelect = (event) => {
		setEventInputs(prevState => ({...prevState, [event.target.id]: event.target.value}))
		const colorInput = document.querySelector('.selectColor')
		colorInput.style.background = event.target.value
		colorInput.value === 'null' ? colorInput.style.background = 'white' : null
	}
	
	return (
		<div>
			<form onSubmit={submitEvent}>
				<div className="d-flex w-100 ">
					<div className="w-50">
						
						<Form.Group className="eventForm">
							<div className="input-field">
								<i className="material-icons prefix eventNameInputStyle">create</i>
								<input id="eventName" type="text" className="datepicker inputAddEvent"
								       onChange={inputHandler}
								       value={eventInputs.eventName}
								       autoComplete="off" name="eventName" />
								<label htmlFor="eventName" className="w-50">Event name</label>
							</div>
							
							<div className="inputPickerStyle input-field">
								<div className="input-field">
									<i className="material-icons prefix">date_range</i>
									<input id="startDate" type="text"
									       className="validate datepicker inputAddEvent" ref={startDateRef}
									       name="startDate"
									       defaultValue={eventInputs.startDate}
									/>
									<label htmlFor="startDate" className="curPointer">Start date</label>
								</div>
							</div>
							
							
							<div className="inputPickerStyle">
								<div className="input-field">
									<i className="material-icons prefix">date_range</i>
									<input id="endDate"
									       type="text"
									       defaultValue={eventInputs.endDate}
									       className="validate datepicker inputAddEvent" ref={endDateRef}
									       name="endDate"/>
									<label htmlFor="endDate" className="curPointer">End date</label>
								</div>
							</div>
							
							<div className="inputPickerStyle">
								<div className="input-field">
									<i className="material-icons prefix">access_time</i>
									<input id="startTime" type="text"
									       className="validate datepicker timepicker curPointer inputAddEvent"
									       ref={startTimeRef}
									       name="startTime"
									       defaultValue={eventInputs.startTime}
									/>
									<label htmlFor="startTime" className="curPointer">Start time</label>
								</div>
							</div>
							
							<div className="inputPickerStyle">
								<div className="input-field">
									<i className="material-icons prefix">access_time</i>
									<input id="endTime" type="text"
									       className="validate timepicker inputAddEvent"
									       ref={endTimeRef}
									       name="endTime"
									       defaultValue={eventInputs.endTime}
									/>
									<label htmlFor="endTime" className="curPointer">End time</label>
								</div>
							</div>
							
							<div className='spotsInputStyle'>
								<Form.Group controlId="freeSpots">
									<Form.Label>Free spots:</Form.Label>
									<Form.Control type='number'
									              placeholder='Enter a number of spots'
									              onChange={inputHandler}
									              className="inputAddEvent"
									              value={eventInputs.freeSpots}
									/>
								</Form.Group>
							</div>
						</Form.Group>
					</div>
					
					<div className="d-row w-25 justify-content-center">
						<div className="mb-5">
							<h6 className="blue-text">Select color</h6>
							<Form.Control as="select" onChange={onSelect}
							              className="selectColor inputAddEvent"
							              value={eventInputs.color}
							              id="color">
								<option value="null"/>
								<option value="black">Black</option>
								<option value="red">Red</option>
								<option value="blue">Blue</option>
								<option value="green">Green</option>
								<option value="orange">Orange</option>
							</Form.Control>
						</div>
						<div>
							<h6 className="blue-text">Event filter</h6>
							<Form.Control
								as="select"
								onChange={onSelect}
								id="categories"
								className="inputAddEvent"
								value={eventInputs.categories}
							>
								<option value="null"/>
								<option value="Music">Music</option>
								<option value="Dance">Dance</option>
								<option value="Sport">Sport</option>
								<option value="Art">Art</option>
								<option value="Food">Food</option>
							</Form.Control>
						</div>
					</div>
				</div>
				<div className="d-flex w-100 flex-column">
					<div className="">
						<Form.Group className="p-4" controlId="eventDescription">
							<Form.Label className="m-0">Event description:</Form.Label>
							<Form.Control onChange={inputHandler}
							              as="textarea"
							              rows={4}
							              className="h-100 inputAddEvent"
							              value={eventInputs.eventDescription}
							/>
						</Form.Group>
					</div>
					
					<div className="d-flex justify-content-center mb-3 w-100">
						<Button type="submit">submit</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		clearInputsState: () => dispatch({type: CLEAR_ALL_ADD_EVENT_INPUTS}),
		updateReduxStateInputs:(inputs) => dispatch({type:CREATE_EVENT_INPUT_FIELDS, payload:inputs}),
		...bindActionCreators({createEventSubmitAction}, dispatch),
	}
}
export default connect(null,mapDispatchToProps)(AddEvent)