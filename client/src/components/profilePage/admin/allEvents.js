import React, {useState} from 'react'
import {Button, Form, ListGroup} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import './admin.scss'
import {deleteEvent} from "../../../redux/events/eventsAction"
import {AccordionDropDown} from "../../styled/accordion"

const AllEvents = () => {
	const [filterInput, setFilterInput] = useState('')
	const eventsState = useSelector(state => state.eventReducer)
	const dispatch = useDispatch()
	
	const allEventsRender = () => {
		
		const deleteEventHandler = (e) => {
			return dispatch(deleteEvent(e.target.id))
		}
		
		
		return eventsState?.events.filter(event =>
			event.eventName.toLowerCase().includes(filterInput))?.map((event, index) => {
			
			
			return <div className="row" key={index + 1}>
				<div className="col s12 m6">
					<div className="card blue-grey darken-1">
						<div className="card-content white-text cardContent">
							<span className="card-title">Name: {event.eventName}</span>
							{
								event.startDate &&
								<div className="timeWrapper">
									<span>Start date:</span>
									<p>{event.startDate}</p>
								</div>
							}
							{
								event.endDate &&
								<div className="timeWrapper">
									<span>End date:</span>
									<p>{event.endDate}</p>
								</div>
							}
							{
								event.startTime &&
								<div className="timeWrapper">
									<span>Start Time:</span>
									<p>{event.startTime}</p>
								</div>
							}
							{
								event.endTime &&
								<div className="timeWrapper">
									<span>End Time:</span>
									<p>{event.endTime}</p>
								</div>
							}
							{
								event.freeSpots &&
								<div className="timeWrapper">
									<span>Free spots:</span>
									<p>{event.freeSpots}</p>
								</div>
							}
							{
								event.subscriptions.length > 0 && (
									<AccordionDropDown
										header="Subscription" wrapMargin="3% 0 0 0"
										toggleHeight="3rem"
									>
										<div>
											{event.subscriptions.map((subs, index) => {
												return (
													<div key={index + 1} className="mb-4">
														<ListGroup.Item>
															<div>Name: {subs.name}</div>
															<div>Email: {subs.email}</div>
															<Button className="red"
															        onClick={() =>
																        dispatch(deleteSubscriptionAction(subs.email, event._id))}>
																Delete Subscription</Button>
														</ListGroup.Item>
													</div>
												)
											})}
										</div>
									</AccordionDropDown>
								)
							}
							
							
							<AccordionDropDown header="Created By"
							                   wrapMargin="2% 0 0 0"
							                   toggleHeight="3rem"
							>
								<ListGroup.Item>Name: {event.createdBy.name}</ListGroup.Item>
								<ListGroup.Item>Email: {event.createdBy.email}</ListGroup.Item>
							</AccordionDropDown>
							
							<AccordionDropDown
								header="Event Description" display="block"
								wrapMargin="2% 0 0 0" padding="2%"
								toggleHeight="3rem"
							>
								<p className="accordingDescription">{event.eventDescription}</p>
							</AccordionDropDown>
						</div>
						<div className="card-action">
							<Button className="red" id={event._id} onClick={deleteEventHandler}>Delete</Button>
						</div>
					</div>
				</div>
			</div>
		})
	}
	return (
		<>
			<Form>
				<Form.Group>
					<Form.Label>Search</Form.Label>
					<Form.Control
						type="text" placeholder="Type text filter events"
						onChange={e => {
							setFilterInput(e.target.value)
						}}
					/>
				</Form.Group>
				<div>
					{allEventsRender()}
				</div>
			</Form>
		</>
	)
}
export default AllEvents