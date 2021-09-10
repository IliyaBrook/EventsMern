import {combineReducers} from "redux"
import {loginReducer} from "./login/loginReducer"
import {registrationReducer} from "./registration/registrationReducer"
import {routerReducer} from "react-router-redux"
import {eventReducer} from "./events/eventReducer"
import {userManagmentReducer} from "./profilePage/admin/userManagment/userManagmentReducer"
import {windowSizeReducer} from "./toolsStates/windowSizeReducer"
import {socialReducer} from "./social/socialReducer"

export const rootReducer = combineReducers({
	loginReducer,registrationReducer,
	userManagmentReducer,socialReducer, routing: routerReducer,
	eventReducer,windowSizeReducer
})