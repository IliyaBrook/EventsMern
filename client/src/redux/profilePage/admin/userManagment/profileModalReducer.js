import {
	DELETE_USER,
	GET_USERS,
	PROFILE_PAGE_CREATE_EVENT_LOADING_FALSE,
	PROFILE_PAGE_CREATE_EVENT_LOADING_TRUE,
	PROFILE_PAGE_EVENTS_LOADING_FALSE,
	PROFILE_PAGE_EVENTS_LOADING_TRUE,
	PROFILE_PAGE_HOME_LOADING_FALSE,
	PROFILE_PAGE_HOME_LOADING_TRUE,
	PROFILE_PAGE_USERS_LOADING_FALSE,
	PROFILE_PAGE_USERS_LOADING_TRUE,
	RENDER_MODAL_CONTENT,
	SET_ROLE
} from "./userManagmentTypes";

const userManagmentReducerInitState = {
	renderComponentState: {
		component: ''
	},
	users: [],
	loadings: {
		usersLoading: false,
		eventsLoading: false,
		createEventLoading: false,
		homePageLoading: false
	}
}
export const profileModalReducer = (state = userManagmentReducerInitState, action) => {
	switch (action.type) {
		case GET_USERS:
			return {...state, ...action.payload}
		case DELETE_USER:
			return {...state, users: state.users.filter((elem => elem.email !== action.email))}
		case SET_ROLE:
			const newData = [...state.users]
			newData.splice(action.payload.index, 1, action.payload.newUser)
			return {...state, users: [...newData]}
		case RENDER_MODAL_CONTENT:
			return {...state, renderComponentState: {component: action.payload}}
		case PROFILE_PAGE_USERS_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, usersLoading: true}}
		case PROFILE_PAGE_USERS_LOADING_FALSE:
			return {...state, loadings: {...state.loadings, usersLoading: false}}
		case PROFILE_PAGE_EVENTS_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, eventsLoading: true}}
		case PROFILE_PAGE_EVENTS_LOADING_FALSE:
			return {...state, loadings: {...state.loadings, eventsLoading: false}}
		case PROFILE_PAGE_CREATE_EVENT_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, createEventLoading: true}}
		case PROFILE_PAGE_CREATE_EVENT_LOADING_FALSE:
			return {...state, loadings: {...state.loadings, createEventLoading: false}}
		case PROFILE_PAGE_HOME_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, homePageLoading: true}}
		case PROFILE_PAGE_HOME_LOADING_FALSE:
			return {...state, loadings: {...state.loadings, homePageLoading: false}}
		
		default:
			return state
	}
}

