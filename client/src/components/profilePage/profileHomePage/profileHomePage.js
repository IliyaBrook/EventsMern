import React, {useMemo} from 'react'
import './profileHomePage.scss'
import {useDispatch, useSelector} from "react-redux"
import {Button, Card, ListGroup} from "react-bootstrap"
import {AccordionDropDown} from "../../styled/accordion"
import {deleteSubscriptionAction} from "../../../redux/events/eventsAction"


const ProfileHomePage = () => {
	const dispatch = useDispatch()
	const {eventReducer: {events}, loginReducer: {email}} = useSelector(state => state)
	
	const userEvents = useMemo(() => {
		return events.filter(event => {
			return event.subscriptions.find(elem => elem.email === email)
		})
	}, [events])
	
	
	const modalHomeContent = () => {
		if (userEvents.length > 0) {
			return userEvents.map((event, index) => {
				return (
					<div className="profileHomeWrapper" key={index}>
						<div className="profileHomeContentWrapper">
							<div className="profileHomeEventsWrapper">
								<Card>
									<Card.Header as="h5">
										Event Name:
										<p>
											{event.eventName}
										</p>
									</Card.Header>
									<Card.Body>
										<AccordionDropDown header="Event time"
										                   toggleHeight="2rem"
										                   wrapMargin="3% 0 0 0"
										                   headerSize="90%"
										>
											<ListGroup>
												<ListGroup.Item>
													<p>Start date:
														<span>{event.startDate}</span>
													</p>
												</ListGroup.Item>
												<ListGroup.Item>
													<p>End Date:
														<span>{event.endDate}</span>
													</p>
												</ListGroup.Item>
												<ListGroup.Item>
													<p>Start Time:
														<span>{event.startTime}</span>
													</p>
												</ListGroup.Item>
												<ListGroup.Item>
													<p>End Time:
														<span>
															{event.endTime}
														</span>
													</p>
												</ListGroup.Item>
											</ListGroup>
										</AccordionDropDown>
										
										<AccordionDropDown
											header="Event description"
											toggleHeight="2rem"
											wrapMargin="3% 0 0 0"
											headerSize="90%"
										>
											<Card.Text>
												{event.eventDescription}
											</Card.Text>
										</AccordionDropDown>
										<Button onClick={() =>
											dispatch(deleteSubscriptionAction(email, event._id))}>Delete
											subscription</Button>
									</Card.Body>
								</Card>
							</div>
						</div>
					</div>
				)
			})
		}
		return (
			<div className="profileHomeWrapper">
				<div className="profilePageNoSubscriptions">
					<h2>You have no subscriptions</h2>
				</div>
			</div>
		)
	}
	return (
		<div className="profileHomeHeaderWrapper">
			<p className="profileHomeParagraph">Your event subscriptions:</p>
			{modalHomeContent()}
		</div>
	)
}

export default ProfileHomePage