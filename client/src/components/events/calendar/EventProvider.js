import React from "react"
import {useSelector} from "react-redux"
import moment from "moment"

const EventProvider = () => {
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
	return events?.map((event) => eventTemplate(event))
}

export default EventProvider