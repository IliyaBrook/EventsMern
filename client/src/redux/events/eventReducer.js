import {
	CATEGORIES_FILTER,
	CLEAR_ALL_ADD_EVENT_INPUTS,
	CLICKED_EVENT_CALENDAR,
	CREATE_EVENT_INPUT_FIELDS,
	REFRESH_EVENTS
} from "./eventsTypes";
import {SOCKET_ADD_EVENT, SOCKET_DELETE_EVENT, SOCKET_UPDATE_EVENT} from '../social/socialTypes'


const eventReducerInit = {
	events: [],
	createEventInputsFields:{},
	categoriesFilter: '',
	calendarModal: {
		clickedEvent: {id: null, isEnd: false, isOpen:false}
	}
}

export const eventReducer = (state = eventReducerInit, action) => {
	switch (action.type) {
		case REFRESH_EVENTS:
			return {...state, events: [...action.payload]}
		case SOCKET_ADD_EVENT:
			return {...state, events: [...state.events, {...action.eventCreated}]}
		case SOCKET_UPDATE_EVENT:
			const eventsOld = state.events.filter(events => events._id !== action.eventUpdated._id)
			return {...state, events: [...eventsOld, {...action.eventUpdated}]}
		case SOCKET_DELETE_EVENT:
			return {...state, events: state.events.filter((elem => elem._id !== action.eventDeleted))}
		case CREATE_EVENT_INPUT_FIELDS:
			return {...state, createEventInputsFields: {...action.payload}}
		case CLEAR_ALL_ADD_EVENT_INPUTS:
			return {...state, createEventInputsFields :{}}
		case CATEGORIES_FILTER:
			return {...state, categoriesFilter: action.payload}
		case CLICKED_EVENT_CALENDAR:
			return {
				...state, calendarModal: {
					clickedEvent: {...state.calendarModal.clickedEvent, id: action.id, isEnd: action.isEnd}
				}
			}
		default:
			return state
	}
}