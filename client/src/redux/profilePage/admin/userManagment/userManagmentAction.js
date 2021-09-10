import useRequest from "../../../../hooks/useRequest"
import {DELETE_USER, GET_USERS, SET_ROLE} from "./userManagmentTypes"

export const getUsersAction = () => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginReducer.token
			const currentUser = getState().loginReducer.email
			const data = await useRequest('/profilePage/getUsers', 'GET', null, token)
			const newDataWithoutCurUser = data.users?.filter(user => user.email !== currentUser)
			dispatch({
				type: GET_USERS, payload: {users: newDataWithoutCurUser}
			})
		} catch (error) {
			throw error
		}
	}
}

export const deleteUserAction = (email) => {
	return async (dispatch, getState) => {
		const token = getState().loginReducer.token
		const body = {email}
		dispatch({type: DELETE_USER, email})
		return useRequest('/profilePage/deleteUser', 'POST', body, token)
	}
}

export const setRoleAction = ( email, role, index ) => {
	return async (dispatch, getState) => {
		const token = getState().loginReducer.token
		dispatch({type: SET_ROLE, email, role, index})
		return useRequest('/profilePage/setAdmin', 'POST', {email, role} , token)
	}
}