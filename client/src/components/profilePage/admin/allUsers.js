import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Form} from "react-bootstrap"
import {deleteUserAction, setRoleAction} from "../../../redux/profilePage/admin/userManagment/userManagmentAction"
import '../profilePage.scss'


const AllUsers = () => {
	const [filterInput, setFilterInput] = useState('')
	
	const dispatch = useDispatch()
	const users = useSelector(state => state.profileModalReducer.users)
	
	
	const showUsers = () => {
		const setRole = (event, role = 'user') => {
			const email = JSON.parse(event.target.id).email
			const index = JSON.parse(event.target.id).index
			return dispatch(setRoleAction(email, role, index))
		}
		
		return users.filter(user => user.name.toLowerCase().includes(filterInput)).map((user, index) => {
			const deleteUserEvent = (event) => {
				return dispatch(deleteUserAction(event.target.id))
			}
			const setAdminEvent = (event) => {
				return setRole(event, 'admin')
			}
			const removeAdminEvent = (event) => {
				return setRole(event)
			}
			
			// const showRole = () => {
			// 	switch (user.role) {
			// 		case 'admin':
			// 			return (
			// 				<>
			// 					<div className="showRule">
			// 						<span className="ml-2 blue-text">Role:</span>
			// 						<span>
			// 							{user.role}
			// 						</span>
			// 					</div>
			// 					<div className="d-flex justify-content-center mb-2">
			// 						<Button
			// 							id={JSON.stringify({email: user.email, index})}
			// 							size="small" className="red ml-4" onClick={removeAdminEvent}>Delete role
			// 						</Button>
			// 					</div>
			// 				</>
			// 			)
			// 		default:
			// 			return (
			// 				<div className="showRule">
			// 					<div>
			// 						<span className="blue-text">Role:</span>
			// 						<span>
			// 							{user.role}
			// 						</span>
			// 					</div>
			// 					<div className="d-flex justify-content-center mb-2">
			// 						<Button id={JSON.stringify({email: user.email, index})} size="small"
			// 						        className="blue ml-4 setRoleBtnStyle" onClick={setAdminEvent}>Set
			// 							admin</Button>
			// 					</div>
			// 				</div>
			// 			)
			// 	}
			// }
			const showRole = () => {
				return (
					<>
						<div className="showRule">
							<span className="ml-2 blue-text">Role:</span>
							<span>
								{user.role}
							</span>
						</div>
						{/*<div className="d-flex justify-content-center mb-2">*/}
						{/*	<Button*/}
						{/*		id={JSON.stringify({email: user.email, index})}*/}
						{/*		size="small" className="red ml-4" onClick={removeAdminEvent}>Delete role*/}
						{/*	</Button>*/}
						{/*</div>*/}
						
						<Form.Check
							type="switch"
							id="custom-switch"
							label="Check this switch"
						/>
						<Form.Check
							disabled
							type="switch"
							label="disabled switch"
							id="disabled-custom-switch"
						/>
					
					
					</>
				)
			}
			
			return (
				<div className='w-100 allUser' key={index + 1}>
					<div className="black-text mb-5 mt-5">
						<div className="shadow p-2 w-75 rounded text-nowrap h-100">
							<div className="row">
								<div className="topBtnsWrapper">
									<div className="col s6 d-flex justify-content-center">
										<Button id={user.email} size="small" className="red ml-4"
										        onClick={deleteUserEvent}>Delete
											user</Button>
									</div>
									
									<div className="col s6 d-flex justify-content-center">
										<Button size="small" className="ml-4">User events</Button>
									</div>
								</div>
							</div>
							<div>
								<span className="mr-2 blue-text">Email:</span>
								<span>{user.email}</span>
							</div>
							<div>
								<span className="mr-2 blue-text">Name:</span>
								<span>{user.name}</span>
							</div>
							<div className='divider mt-3'/>
							{showRole()}
						</div>
					</div>
				</div>
			)
		})
	}
	return (
		<>
			<Form>
				<Form.Group>
					<Form.Label>Search</Form.Label>
					<Form.Control
						type="text" placeholder="Type text filter events"
						onChange={e => {
							setFilterInput(e.target.value)
						}}
					/>
				</Form.Group>
				{showUsers()}
			</Form>
		</>
	)
}
export default AllUsers