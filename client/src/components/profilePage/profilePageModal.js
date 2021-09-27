import React from 'react'
import './profilePage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {Nav} from 'react-bootstrap'
import AllUsers from "./admin/allUsers/allUsers"
import Spinner from "../styled/spinner"
import AllEvents from "./admin/allEvents/allEvents"
import AddEvent from "./admin/addEvent/addEvent"
import {
	CLICK_RENDER_CREATE_EVENT,
	CLICK_RENDER_EVENTS,
	CLICK_RENDER_HOME_PAGE,
	CLICK_RENDER_USERS
} from "../../redux/profilePage/admin/userManagment/userManagmentTypes"
import ProfileHomePage from "./profileHomePage/profileHomePage"
import UserProfilePage from "./user/userProfilePage"


const ProfilePageModal = () => {
	
	const userName = useSelector(state => state.loginReducer.name)
	const componentClicked = useSelector(state => state.profileModalReducer.renderComponentState.component)
	const role = useSelector(state => state.loginReducer.role)
	const dispatch = useDispatch()
	const renderProfileByRole = () => {
		switch (role) {
			case 'admin':
				return (
					<div>
						<div className="adminNavWrapper">
							<div className="adminNavButtonsWrapper">
								<Nav fill variant="tabs"
								     activeKey={componentClicked}
								>
									<Nav.Item>
										<Nav.Link onClick={() => {
											dispatch({type: CLICK_RENDER_HOME_PAGE})
										}} eventKey="profileHome">{userName.toUpperCase()}</Nav.Link>
									</Nav.Item>
									
									
									<Nav.Item>
										<Nav.Link onClick={() => {
											dispatch({type: CLICK_RENDER_USERS})
										}} eventKey="getUsers">Users</Nav.Link>
									</Nav.Item>
									
									<Nav.Item>
										<Nav.Link onClick={() => {
											dispatch({type: CLICK_RENDER_EVENTS})
										}} eventKey="getEvents">Events</Nav.Link>
									</Nav.Item>
									
									<Nav.Item>
										<Nav.Link onClick={() => {
											dispatch({type: CLICK_RENDER_CREATE_EVENT})
										}} eventKey="addEvents">Add event</Nav.Link>
									</Nav.Item>
								</Nav>
							</div>
						</div>
						{renderContent()}
					</div>
				)
			case 'user':
				return <UserProfilePage/>
		}
	}
	
	const {
		profileModalReducer: {
			loadings: {
				usersLoading,
				eventsLoading,
				createEventLoading,
				homePageLoading
			}
		}
	} = useSelector(state => state)
	
	const renderContent = () => {
		switch (componentClicked) {
			case 'profileHome':
				return homePageLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <ProfileHomePage/>
			case 'getUsers':
				return usersLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <AllUsers/>
			case 'getEvents':
				return eventsLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <AllEvents/>
			case 'addEvents':
				return createEventLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <AddEvent/>
			default:
				return homePageLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <ProfileHomePage/>
		}
	}
	
	return (
		<>
			<div id="modalAuthNavBar" className="modal modal-fixed-footer">
				<div className="modal-content">
					{renderProfileByRole()}
				</div>
				<div className="modal-footer">
					<button className="btn modal-close">Close</button>
				</div>
			</div>
		</>
	)
}

export default ProfilePageModal