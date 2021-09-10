import {DELETE_USER, GET_USERS, RENDER_MODAL_CONTENT, SET_ROLE} from "./userManagmentTypes";

const userManagmentReducerInitState = {
	renderComponentState:{
		component:''
	}
}
export const userManagmentReducer = (state = userManagmentReducerInitState, action) => {
	switch (action.type) {
		case GET_USERS:
			return {...state, ...action.payload}
		case DELETE_USER:
			return {...state, users: state.users.filter((elem => elem.email !== action.email))}
		case SET_ROLE:
			const foundedUser = state.users.filter(elem => elem.email === action.email)[0]
			const withAdminUser = {...foundedUser, role: action.role}
			const newUsersData = [...state.users]
			newUsersData.splice(action.index,1, withAdminUser)
			return {...state, users: newUsersData}
		case RENDER_MODAL_CONTENT:
			return {...state, renderComponentState: { component:action.payload }}
		default:
			return state
	}
}

