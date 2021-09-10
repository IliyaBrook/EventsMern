import {
	CHAT_WINDOW_CLOSE,
	CHAT_WINDOW_OPEN,
	DELETE_DISCONNECTED_USER,
	GET_ONLINE_USERS,
	TEST_SOCKETS_ACTION,
	UPDATE_ONLINE_USERS
} from "./socialTypes";


const socialStateInitReducer = {
	chatWindowOpen: 'none',
	online:[],
	test:''
}

export const socialReducer = (state = socialStateInitReducer, action) => {
	switch (action.type) {
		case GET_ONLINE_USERS:
			return {...state, online: [...state.online,action.payload]}
		case UPDATE_ONLINE_USERS:
			return state
		case DELETE_DISCONNECTED_USER:
			return state
		case CHAT_WINDOW_OPEN:
			return {...state, chatWindowOpen: 'block'}
		case CHAT_WINDOW_CLOSE:
			return {...state, chatWindowOpen: 'none'}
		case TEST_SOCKETS_ACTION:
			return {...state, test: action.payload}
		default:
			return state
	}
}