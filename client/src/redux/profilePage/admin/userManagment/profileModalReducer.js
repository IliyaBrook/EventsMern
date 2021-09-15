import {
	DELETE_USER,
	GET_USERS,
	PROFILE_PAGE_CREATE_EVENT_LOADING_FALSE,
	PROFILE_PAGE_CREATE_EVENT_LOADING_TRUE,
	PROFILE_PAGE_EVENTS_LOADING_FALSE,
	PROFILE_PAGE_EVENTS_LOADING_TRUE,
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
		createEventLoading: false
	}
}
export const profileModalReducer = (state = userManagmentReducerInitState, action) => {
	switch (action.type) {
		case GET_USERS:
			return {...state, ...action.payload}
		case DELETE_USER:
			return {...state, users: state.users.filter((elem => elem.email !== action.email))}
		case SET_ROLE:
			const foundedUser = state.users.filter(elem => elem.email === action.email)[0]
			const withAdminUser = {...foundedUser, role: action.role}
			const newUsersData = [...state.users]
			newUsersData.splice(action.index, 1, withAdminUser)
			return {...state, users: newUsersData}
		case RENDER_MODAL_CONTENT:
			return {...state, renderComponentState: {component: action.payload}}
		case PROFILE_PAGE_USERS_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, usersLoading: true}}
		case PROFILE_PAGE_USERS_LOADING_FALSE:
			return  {...state, loadings: {...state.loadings, usersLoading: false}}
		case PROFILE_PAGE_EVENTS_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, eventsLoading: true}}
		case PROFILE_PAGE_EVENTS_LOADING_FALSE:
			return {...state, loadings: {...state.loadings, eventsLoading: false}}
		case PROFILE_PAGE_CREATE_EVENT_LOADING_TRUE:
			return {...state, loadings: {...state.loadings, createEventLoading: true}}
		case PROFILE_PAGE_CREATE_EVENT_LOADING_FALSE:
			return {...state, loadings: {...state.loadings, createEventLoading: false}}
		default:
			return state
	}
}

