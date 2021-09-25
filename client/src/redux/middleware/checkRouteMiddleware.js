export const checkRouteMiddleware = () => next => action => {
	if (action.type === "@@router/LOCATION_CHANGE") {
		if (action.payload.pathname === '/' && document.body.clientWidth < 650) {
			document.body.style.overflow = 'hidden'
		}else {
			document.body.style.overflow = 'visible'
		}
	}
	next(action)
}