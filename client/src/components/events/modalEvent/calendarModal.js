import React from 'react'
import {Button} from "react-bootstrap"
import {useDispatch, useSelector} from 'react-redux'
import {deleteEvent, deleteSubscriptionAction, subscribeEventAction} from "../../../redux/events/eventsAction"
import {CalendarModalStyled} from "./CalendarModalStyled";


const CalendarModalEvent = ({props}) => {
	const dispatch = useDispatch()
	const {calendarModalRef} = props
	const {calendarModal, events} = useSelector(state => state.eventReducer)
	const event = events.filter(e => e._id === calendarModal.clickedEvent.id)[0]
	const {role} = useSelector(state => state.loginReducer)
	const isEnd = calendarModal.clickedEvent.isEnd
	const eventId = calendarModal.clickedEvent.id
	const {email} = useSelector(state => state.loginReducer)
	
	const handleClose = () => {
		const instance = window.M.Modal.init(calendarModalRef.current)
		instance.close()
	}
	const handleSubscribe = () => {
		dispatch(subscribeEventAction(event))
	}
	const isSubscribe = event?.subscriptions.filter(
		subscription => subscription.email === email).length > 0
	
	const spotsEnd = event?.freeSpots === 0
	const btnSubscribeClass = isEnd || spotsEnd || isSubscribe ? 'disabled' : null
	const isEventExpired = isEnd && (
		<div className="d-flex align-items-center">
			<h5 className="text-danger m-0">Expired</h5>
			<i className="material-icons mt-1">event_busy</i>
		</div>
	)

	
	const setSubscribeBtnText = () => {
		switch (true) {
			case event?.freeSpots === 0:
				return 'No free spots =('
			case isSubscribe:
				return 'You\'re already subscribed'
			case isEnd:
				return 'Expired'
			default:
				return 'Subscribe'
		}
	}
	
	return (
		<CalendarModalStyled>
			<div className="modal calendarModal" ref={calendarModalRef}>
				<div className="modal-header modalHeader">
					<h4>{event?.eventName}</h4>
					<div className="d-flex justify-content-center w-100">
						{
							role === 'admin' &&
							<Button onClick={() => dispatch(deleteEvent(eventId)).then(res => {
								window.M.toast({html: res.message})
								return handleClose()
							})}
							>Delete event</Button>
						}
						{
							isSubscribe && <Button onClick={() => {
								dispatch(deleteSubscriptionAction(email, eventId))
							}
							}>Unsubscribe</Button>
						}
					</div>
					{isEventExpired}
				</div>
				<div className="modal-content calendarModalContent">
					
					<div className="eventInfoWrapper">
						<div className="border-primary">
							<i className="material-icons blue-text">access_time</i>
							<div>
								<span>Start date:</span>
								<span>{event?.startDate}</span>
							</div>
						</div>
						<div>
							<i className="material-icons blue-text">access_time</i>
							<div>
								<span>End date:</span>
								<span>{event?.endDate}</span>
							</div>
						</div>
						<div>
							<i className="material-icons blue-text">date_range</i>
							<div>
								<span>Start time:</span>
								<span>{event?.startTime}</span>
							</div>
						</div>
						<div>
							<i className="material-icons blue-text">date_range</i>
							<div>
								<span>End time:</span> <span>{event?.endTime}</span>
							</div>
						</div>
						<div>
							<i className="material-icons blue-text">event_available</i>
							<div>
								<span>Spots:</span> <p className="red-text">{event?.freeSpots} left</p>
							</div>
						</div>
					</div>
					<div className="divider mb-3 mt-4"/>
					<div className="descriptionWrapper">
						<p className="flow-text">
							<span>{event?.eventDescription}</span>
						</p>
					</div>
				</div>
				<div className="modal-footer calendarModalFooter">
					<div className="btnWrapper">
						<Button onClick={handleSubscribe}
						        className={btnSubscribeClass}>
							{setSubscribeBtnText()}
						</Button>
						<Button onClick={handleClose}>Close</Button>
					</div>
				</div>
			</div>
		</CalendarModalStyled>
	)
}

export default CalendarModalEvent



