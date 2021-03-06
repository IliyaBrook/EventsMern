import React, {useCallback, useRef} from 'react'
import './eventCalendar.scss'
import {useDispatch, useSelector} from "react-redux"
import {CLICKED_EVENT_CALENDAR} from "../../../redux/events/eventsTypes"
import moment from "moment";
import RenderCalendar from "./renderCalendar"
import CalendarCategoriesFilter from "./calendarCategoriesFilter"
import CalendarModalEvent from "../modalEvent/calendarModalEvent"
import GuestWelcomeModal from "../../guestWelcomeModal/guestWelcomeModal";

const EventCalendar = () => {
	const calendarRef = useRef()
	const {events, categoriesFilter} = useSelector(state => state.eventReducer)
	const {role} = useSelector(state => state.loginReducer)
	const dispatch = useDispatch()
	const calendarModalRef = useRef()
	
	const eventClick = useCallback((event) => {
		const calendarApi = calendarRef.current?.getApi()
		const eventApi = calendarApi.getEventById(event.event.id)
		const isEnd = eventApi?.end < moment().toDate()
		dispatch({type: CLICKED_EVENT_CALENDAR, isEnd, id: event.event.id})
		const instance = window.M.Modal.init(calendarModalRef.current)
		instance.open()
	}, [events])
	
	return (
		<div className="calendarEventsWrapper">
			<CalendarCategoriesFilter/>
			<RenderCalendar
				calendarRef={calendarRef}
				eventClick={eventClick}
				events={events}
				categoriesFilter={categoriesFilter}
			/>
			{role === 'guest' && <GuestWelcomeModal/>}
			<CalendarModalEvent calendarModalRef={calendarModalRef}/>
		</div>
	)
}


export default EventCalendar