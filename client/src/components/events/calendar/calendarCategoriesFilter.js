import React from 'react'
import {Form} from "react-bootstrap"
import {CATEGORIES_FILTER} from "../../../redux/events/eventsTypes"

const CalendarCategoriesFilter = () => {
	return (
		<div className="d-flex w-100 justify-content-end justifyFilterWrapper">
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
	)
}

export default CalendarCategoriesFilter