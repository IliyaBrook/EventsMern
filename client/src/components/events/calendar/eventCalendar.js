import React, {useCallback, useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './eventCalendar.scss'
import {customEvents} from "./customEvents";
import {useDispatch, useSelector} from "react-redux"
import {Form} from "react-bootstrap";
import {CATEGORIES_FILTER, CLICKED_EVENT_CALENDAR} from "../../../redux/events/eventsTypes"
import moment from "moment";
import CalendarModalEvent from "../modalEvent/calendarModal";


const EventCalendar = () => {
	
	const calendarRef = useRef()
	const {events} = useSelector(state => state.eventReducer)
	const dispatch = useDispatch()
	const calendarModalRef = useRef()
	
	
	
	const eventProvider = () => {
		const {events, categoriesFilter} = useSelector(state => state.eventReducer)
		const eventTemplate = (event) => {
			const start = moment(`${event?.startDate} ${event?.startTime}`, 'YYYY-MM-DD, hh:mm A').toDate()
			const end = moment(`${event?.endDate} ${event?.endTime}`, 'YYYY-MM-DD, hh:mm A').toDate()
			return {
				title: event.eventName,
				description: event.eventDescription,
				start,
				end,
				color: event.color,
				id: event._id,
			}
		}
		if (categoriesFilter) {
			return events.filter(event => event.categories === categoriesFilter).map(event => eventTemplate(event))
		}
		return events.map((event) => eventTemplate(event))
		
	}
	
	
	const eventClick = (event) => {
		const calendarApi = calendarRef.current?.getApi()
		const eventApi = calendarApi.getEventById(event.event.id)
		const isEnd = eventApi?.end < moment().toDate()
		dispatch({type: CLICKED_EVENT_CALENDAR, isEnd, id: event.event.id})
		const instance = window.M.Modal.init(calendarModalRef.current)
		instance.open()
	}
	
	
	const RenderCalendar = useCallback(() => {
		return (
			<div>
				<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					events={eventProvider()}
					height={600}
					eventDisplay={'block'}
					eventContent={customEvents}
					eventClick={eventClick}
					displayEventEnd={false}
					displayEventTime={true}
				/>
			</div>
		)
	}, [events])
	return (
		<div className="calendarEventsWrapper">
			<div className="d-flex w-100 justify-content-end ">
				<Form.Group className="p-3 filterWrapper">
					<Form.Label>Event filter</Form.Label>
					<Form.Control as="select" className="w-100 mr-3 filterControls"
					              onChange={e => dispatch({type: CATEGORIES_FILTER, payload: e.target.value})}>
						<option value=''>All</option>
						<option>Music</option>
						<option>Dance</option>
						<option>Sport</option>
						<option>Art</option>
						<option>Food</option>
					</Form.Control>
				</Form.Group>
			</div>
			<RenderCalendar/>
			<CalendarModalEvent props={{calendarModalRef, calendarRef}}/>
		</div>
	)
}


export default EventCalendar