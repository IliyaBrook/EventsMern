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
		
		
		return users.filter(user => user.name.toLowerCase().includes(filterInput)).map((user, index) => {
			const deleteUserEvent = (event) => {
				return dispatch(deleteUserAction(event.target.id))
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
									       checked={users[index].role === 'admin' && true}
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
						<div className="userDetailsEmailWrapper">
							<span className="email">Email:</span>
							<span className="emailDetails">{user.email}</span>
						</div>
						<div className="userDetailsNameWrapper">
							<span className="name">Name:</span>
							<span className="nameDetails">{user.name}</span>
						</div>
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