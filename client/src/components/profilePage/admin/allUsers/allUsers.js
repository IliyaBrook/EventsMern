import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form, ListGroup} from "react-bootstrap"
import {setRoleAction} from "../../../../redux/profilePage/admin/userManagment/userManagmentAction"
import '../../profilePage.scss'
import {AccordionDropDown} from "../../../styled/accordion"
import {deleteSubscriptionAction} from "../../../../redux/events/eventsAction"


const AllUsers = () => {
	const [filterInput, setFilterInput] = useState('')
	
	const dispatch = useDispatch()
	const users = useSelector(state => state.profileModalReducer.users)
	const events = useSelector(state => state.eventReducer.events)
	
	const showUsers = () => {
		return users.filter(user => user.name.toLowerCase().includes(filterInput)).map((user, index) => {
			const findEvents = events.filter(event => event.subscriptions.find(elem => elem.email === user.email))
			
			const renderSubscriptions = () => {
				if (findEvents.length > 0) {
					return (
						<div>
							<AccordionDropDown
								header="User subscriptions"
								toggleHeight="2rem"
								wrapMargin="3% 0 0 0"
								headerSize="110%"
							>
								<ListGroup>
									{findEvents.map((event, idx) => {
										return (
											<div className="subscriptions" key={idx}>
												<ListGroup.Item>
													<p className="descriptionName">
														{event.eventName}
													</p>
													<div>
														<Button
															onClick={() => dispatch(deleteSubscriptionAction(user.email, event._id))}>Unsubscribe
															user</Button>
													</div>
												</ListGroup.Item>
											</div>
										)
									})}
								</ListGroup>
							</AccordionDropDown>
						</div>
					)
				}
			}
			
			
			const showRole = () => {
				return (
					<>
						<div className="showSetRoleWrapper">
							<div className="roleNameWrapper">Role:
								<p>{user.role}</p>
							</div>
							
							<div className="switch setRoleSwitchWrapper">
								<label>
									User
									<input type="checkbox"
									       name={user.email}
									       id={index}
									       checked={user.role === 'admin' && true}
									       onChange={() => {
										       dispatch(setRoleAction(users[index], index))
									       }}/>
									<span className="lever"/>
									Admin</label>
							</div>
						</div>
					</>
				)
			}
			
			return (
				<div className='usersWrapper' key={index + 1}>
					<div className="shadow rounded userWrapper">
						<div className="row">
							<div className="topBtnsWrapper">
								<Button size="small" className="ml-4">User events</Button>
							</div>
						</div>
						<div className="userDetailsEmailWrapper">
							<span className="email">Email:</span>
							<span className="emailDetails">{user.email}</span>
						</div>
						<div className="userDetailsNameWrapper">
							<span className="name">Name:</span>
							<span className="nameDetails">{user.name}</span>
						</div>
						{renderSubscriptions()}
						
						<div className='divider mt-3'/>
						{showRole()}
					</div>
				</div>
			)
		})
	}
	return (
		<>
			<Form>
				<Form.Group>
					<Form.Control
						type="text" placeholder="Search"
						onChange={e => {
							setFilterInput(e.target.value.toLowerCase())
						}}
					/>
				</Form.Group>
				{showUsers()}
			</Form>
		</>
	)
}
export default AllUsers