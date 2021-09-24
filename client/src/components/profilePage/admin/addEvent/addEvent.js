import React, {useEffect, useRef} from 'react'
import {Button, Form} from "react-bootstrap"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createEventSubmitAction} from "../../../../redux/events/eventsAction"
import {useFormatDate} from "../../../../hooks/useFormatDate"
import {EVENT_INPUT_FIELDS} from "../../../../redux/events/eventsTypes";
import './addEvent.scss'

const AddEvent = ({createEventSubmitAction, dispatchInputs, inputsState}) => {
	const startDateRef = useRef()
	const endDateRef = useRef()
	const startTimeRef = useRef()
	const endTimeRef = useRef()
	
	
	useEffect(() => {
		window.M.updateTextFields()
	})
	
	useEffect(() => {
		window.M.updateTextFields()
		pickerEventHandler(window.M.Datepicker, startDateRef, getStartDateHandler)
		pickerEventHandler(window.M.Datepicker, endDateRef, getEndDateHandler)
		window.M.Timepicker.init(startTimeRef.current, {
			container: 'body',
			showClearBtn: true,
		})
		window.M.Timepicker.init(endTimeRef.current, {
			container: 'body',
			showClearBtn: true,
		})
		const startTimeId = startTimeRef.current.addEventListener('change', event => {
			const startTime = `${event.target.M_Timepicker.time} ${event.target.M_Timepicker.amOrPm}`
			dispatchInputs({startTime})
		})
		const endTimeId = endTimeRef.current.addEventListener('change', event => {
			const endTime = `${event.target.M_Timepicker.time} ${event.target.M_Timepicker.amOrPm}`
			dispatchInputs({endTime})
		})
		return () => {
			removeEventListener('change', startTimeId)
			removeEventListener('change', endTimeId)
		}
	}, [])
	
	
	const getStartDateHandler = (event) => {
		const startDate = useFormatDate(event)
		return dispatchInputs({startDate})
	}
	
	const getEndDateHandler = (event) => {
		const endDate = useFormatDate(event)
		return dispatchInputs({endDate})
	}
	
	const pickerEventHandler = (materializePicker, ref, onSelectCallback) => {
		return materializePicker.init(ref.current, {
			container: 'body',
			onSelect: onSelectCallback,
			showClearBtn: true,
		})
	}
	
	const inputHandler = (event) => {
		return dispatchInputs({[event.target.name]: event.target.value})
	}
	const clearAllInputs = () => {
		const input = document.querySelectorAll(".inputAddEvent")
		input.forEach(elem => elem.value = '')
		document.querySelector('.selectColor').style.background = 'white'
	}
	
	const submitEvent = (event) => {
		event.preventDefault()
		return createEventSubmitAction(clearAllInputs)
	}
	
	
	const onSelect = (event) => {
		dispatchInputs({[event.target.name]: event.target.value})
		const colorInput = document.querySelector('.selectColor')
		colorInput.style.background = event.target.value
		colorInput.value === 'null' ? colorInput.style.background = 'white' : null
	}
	
	
	return (
		
		<form onSubmit={submitEvent}>
			<div className="addEventInputsWrapper">
				<Form.Group>
					<div className="eventNameLabel">
						<div className="eventIcon">
							<i className="material-icons prefix">create</i>
						</div>
						<label htmlFor="eventName">Event name</label>
					</div>
					<div className="inputName">
						<input id="eventName" type="text" className="datepicker inputAddEvent"
						       onChange={inputHandler}
						       value={inputsState.eventName}
						       autoComplete="off" name="eventName"/>
					</div>
				</Form.Group>
				
				<div className="pickerSelectorsWrapper">
					
					<div className="dateTimePicker">
						<div className="inputsStartDateWrapper">
							<div className="input-field">
								<i className="material-icons prefix">date_range</i>
								<input id="startDate" type="text"
								       className="validate datepicker" ref={startDateRef}
								       name="startDate"
								       defaultValue={inputsState.startDate}
								/>
								<label htmlFor="startDate" className="curPointer">Start date</label>
							</div>
						</div>
						
						
						<div className="inputsEndDateWrapper">
							<div className="input-field">
								<i className="material-icons prefix">date_range</i>
								<input id="endDate"
								       defaultValue={inputsState.endDate}
								       type="text"
								       className="datepicker" ref={endDateRef}
								       name="endDate"/>
								<label htmlFor="endDate" className="curPointer">End date</label>
							</div>
						</div>
						
						<div className="inputsStartTimeWrapper">
							<div className="input-field">
								<i className="material-icons prefix">access_time</i>
								<input id="startTime" type="text"
								       defaultValue={inputsState.startTime}
								       className="timepicker"
								       ref={startTimeRef}
								       name="startTime"
								/>
								<label htmlFor="startTime" className="curPointer">Start time</label>
							</div>
						</div>
						
						<div className="inputsEndTimeWrapper">
							<div className="input-field">
								<i className="material-icons prefix">access_time</i>
								<input id="endTime" type="text"
								       className="timepicker"
								       ref={endTimeRef}
								       name="endTime"
								       defaultValue={inputsState.endTime}
								/>
								<label htmlFor="endTime" className="curPointer">End time</label>
							</div>
						</div>
					</div>
					
					<div className="colorCategoriesPickerWrapper">
						<div className="colorCategoriesJustify">
							<div className="inputsColorWrapper">
								<h6 className="blue-text">Select color</h6>
								<Form.Control as="select" onChange={onSelect}
								              className="selectColor inputAddEvent"
								              value={inputsState.color}
								              name="color"
								              id="color">
									<option value="null"/>
									<option value="black">Black</option>
									<option value="red">Red</option>
									<option value="blue">Blue</option>
									<option value="green">Green</option>
									<option value="orange">Orange</option>
								</Form.Control>
							</div>
							<div className="inputsCategoriesWrapper">
								<h6 className="blue-text">Select categories</h6>
								<Form.Control
									as="select"
									onChange={onSelect}
									id="categories"
									className="inputAddEvent"
									name="categories"
									value={inputsState.categories}
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
				</div>
				
				<div className='inputsSpotsWrapper'>
					<Form.Group controlId="freeSpots">
						<Form.Control type='number'
						              placeholder='Enter a number of spots'
						              onChange={inputHandler}
						              className="inputAddEvent"
						              name="freeSpots"
						              value={inputsState.freeSpots}
						/>
					</Form.Group>
				</div>
				
				<div className="inputsDescriptionWrapper">
					<div className="">
						<Form.Group controlId="eventDescription">
							<Form.Label>Event description:</Form.Label>
							<Form.Control onChange={inputHandler}
							              as="textarea"
							              rows={4}
							              name="eventDescription"
							              value={inputsState.eventDescription}
							/>
						</Form.Group>
					</div>
				</div>
				<div className="submitButton">
					<Button type="submit">submit</Button>
				</div>
			</div>
		</form>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchInputs: (inputs) => dispatch({type: EVENT_INPUT_FIELDS, payload: inputs}),
		...bindActionCreators({createEventSubmitAction}, dispatch),
	}
}
const mapStateToProps = state => ({inputsState: state.eventReducer.createEventInputsFields})
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)