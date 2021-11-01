import {combineReducers} from "redux"
import {loginReducer} from "./login/loginReducer"
import {registrationReducer} from "./registration/registrationReducer"
import {routerReducer} from "react-router-redux"
import {eventReducer} from "./events/eventReducer"
import {profileModalReducer} from "./profilePage/admin/userManagment/profileModalReducer"
import {socialReducer} from "./social/socialReducer"
import {modalsReducer} from "./modals/guestWelcomeModal";

export const rootReducer = combineReducers({
	loginReducer,registrationReducer,modalsReducer,
	profileModalReducer,socialReducer, routing: routerReducer,
	eventReducer
})