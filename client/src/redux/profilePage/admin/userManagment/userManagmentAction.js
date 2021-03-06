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
		dispatch({type: DELETE_USER, email})
		return useRequest('/profilePage/deleteUser', 'POST', body, token)
	}
}

export const setRoleAction = (user, index) => {
	return async (dispatch, getState) => {
		const token = getState().loginReducer.token
		switch (user.role) {
			case 'admin':
				return dispatch({
					type: SET_ROLE, payload: {
						newUser: {...user, role: 'user'},
						index: index
					}
				})
			case 'user':
				return dispatch({
					type: SET_ROLE, payload: {
						newUser: {...user, role: 'admin'},
						index: index
					}
				})
		}
		return useRequest('/profilePage/setAdmin', 'POST', {email: user.email, role: user.role}, token)
	}
}