import useRequest from "../../hooks/useRequest"


export const createEventSubmitAction = (clearInputFunc = null) => {
	return async (dispatch, getState) => {
		const token = getState().loginReducer.token
		const body = getState().eventReducer.createEventInputsFields
		const res = await useRequest('/profilePage/eventsManagment', 'POST', body, token)
		if (res.Error) {
			return res.message.forEach(elem => window.M.toast({html: elem.msg}))
		}
		if (Array.isArray(res.message)) {
			return res.message.map(message => window.M.toast({html: message.msg}))
		} else if (res.message === 'Event already exists') {
			return window.M.toast({html: res.message})
		} else {
			clearInputFunc()
			return window.M.toast({html: 'Event created successfully'})
		}
		
	}
}

export const deleteEvent = (id) => {
	return (dispatch, getState) => {
		return new Promise(async resolve => {
			const token = getState().loginReducer.token
			const res = await useRequest('/events/deleteEvent', 'POST', {eventId: id}, token)
			resolve(res)
		})
	}
}

export const subscribeEventAction = (event) => {
	return async (dispatch, getState) => {
		const {token} = getState().loginReducer
		const response = await useRequest('/events/subscribe', 'POST', {id: event._id}, token)
		window.M.toast({html: response.message})
		if (response.message === 'Your subscription has been confirmed') {
			const calendarModal = document.querySelector('.calendarModal')
			const modal = window.M.Modal.getInstance(calendarModal)
			modal.close()
		}
	}
}
export const deleteSubscriptionAction = (email, eventId) => {
	return async (dispatch, getState) => {
		const {token} = getState().loginReducer
		const response = await useRequest('/events/deleteSubscription', 'POST', {email, eventId}, token)
		response.message && window.M.toast({html: response.message})
		response.error && window.M.toast({html: response.error})
	}
}



















