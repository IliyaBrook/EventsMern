import React from 'react'
import './profilePage.scss'
import {useDispatch, useSelector} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import {getUsersAction} from '../../redux/profilePage/admin/userManagment/userManagmentAction'
import AddEvent from "./admin/addEvent"
import AllUsers from "./admin/allUsers"
import AllEvents from "./admin/allEvents"
import {RENDER_MODAL_CONTENT} from "../../redux/profilePage/admin/userManagment/userManagmentTypes";

const ProfilePageModal = (props) => {
	const modalComponentContent = useSelector(state => state.userManagmentReducer.renderComponentState.component)
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
							dispatch(getUsersAction())
							dispatch({type: RENDER_MODAL_CONTENT, payload: 'getUsers'})
						}}>Users</Dropdown.Item>
						
						<Dropdown.Item onClick={() => {
							dispatch({type: RENDER_MODAL_CONTENT, payload: 'usersEvents'})
						}}>Events</Dropdown.Item>
						
						<Dropdown.Item onClick={() => {
							dispatch({type: RENDER_MODAL_CONTENT, payload: 'addEvents'})
						}}>Add event</Dropdown.Item>
						
					</Dropdown.Menu>
				</Dropdown>
			)
		}
	}
	
	
	const renderContent = () => {
		switch (modalComponentContent) {
			case 'getUsers':
				return <AllUsers/>
			case 'usersEvents':
				return <AllEvents/>
			case 'addEvents':
				return <AddEvent/>
		}
	}
	
	return (
		<>
			<div id="modal1" className="modal modal-fixed-footer" ref={props.profileModalRef}>
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