import {combineReducers} from "redux"
import {loginReducer} from "./login/loginReducer"
import {registrationReducer} from "./registration/registrationReducer"
import {routerReducer} from "react-router-redux"
import {eventReducer} from "./events/eventReducer"
import {profileModalReducer} from "./profilePage/admin/userManagment/profileModalReducer"
import {windowSizeReducer} from "./tools/windowSizeReducer"
import {socialReducer} from "./social/socialReducer"
import {homePageReducer} from "./homePage/homePageReducer"

export const rootReducer = combineReducers({
	loginReducer,registrationReducer,windowSizeReducer,
	profileModalReducer,socialReducer, routing: routerReducer,
	eventReducer,homePageReducer
})