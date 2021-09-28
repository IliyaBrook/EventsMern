export const inputCheckMiddleware = () => next => action => {
	if (action.type === "EVENT_INPUT_FIELDS") {
		if (Object.keys(action.payload)[0] === 'freeSpots') {
			const spotsValue = action.payload.freeSpots
			if (spotsValue < 0) {
				return window.M.toast({html: 'Enter valid spots number'})
			} else if (spotsValue > 1000) {
				return window.M.toast({html: 'Free spots limit 1000 users'})
			}
		}
	}
	
	return next(action)
}