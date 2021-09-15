import React from 'react'
import './profilePage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import AllUsers from "./admin/allUsers"
import {
	CLICK_RENDER_CREATE_EVENT,
	CLICK_RENDER_EVENTS,
	CLICK_RENDER_USERS
} from "../../redux/profilePage/admin/userManagment/userManagmentTypes";
import Spinner from "../styled/spinner"
import AllEvents from "./admin/allEvents"
import AddEvent from "./admin/addEvent"

const ProfilePageModal = () => {
	const modalComponentContent = useSelector(state => state.profileModalReducer.renderComponentState.component)
	const role = useSelector(state => state.loginReducer.role)
	const dispatch = useDispatch()
	
	const adminDropDown = () => {
		if (role === 'admin') {
			return (
				<Dropdown>
					<Dropdown.Toggle variant="success" id="dropdown-basic" className="mb-3">
						<div className="d-flex align-items-center">
							<span className="material-icons">menu</span>
						</div>
					</Dropdown.Toggle>
					
					<Dropdown.Menu>
						
						<Dropdown.Item onClick={() => {
							dispatch({type: CLICK_RENDER_USERS})
						}}>Users</Dropdown.Item>
						
						<Dropdown.Item onClick={() => {
							dispatch({type: CLICK_RENDER_EVENTS})
						}}>Events</Dropdown.Item>
						
						<Dropdown.Item onClick={() => {
							dispatch({type: CLICK_RENDER_CREATE_EVENT})
						}}>Add event</Dropdown.Item>
						
					</Dropdown.Menu>
				</Dropdown>
			)
		}
	}
	const {profileModalReducer:{loadings:{usersLoading, eventsLoading, createEventLoading}}} = useSelector(state => state)
	
	const renderContent = () => {
		switch (modalComponentContent) {
			case 'getUsers':
				return usersLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <AllUsers/>
			case 'getEvents':
				return eventsLoading ? <Spinner justify="center" margin="5rem 0 0 0"/> : <AllEvents/>
			case 'addEvents':
				return createEventLoading ? <Spinner justify="center" margin="5rem 0 0 0"/>: <AddEvent/>
		}
	}
	
	return (
		<>
			<div id="modal1" className="modal modal-fixed-footer" >
				<div className="modal-content">
					<div className="d-flex justify-content-end mr-1">
						{adminDropDown()}
					</div>
					{renderContent()}
				</div>
				<div className="modal-footer">
					<button className="btn modal-close">Close</button>
				</div>
			</div>
		</>
	)
}

export default ProfilePageModal