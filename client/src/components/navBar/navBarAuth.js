import React, {useEffect, useRef} from 'react';
import {Link, useHistory} from "react-router-dom";
import ProfilePageModal from "../profilePage/profilePageModal";
import {connect} from 'react-redux'
import {logoutAction} from '../../redux/login/loginActions'
import {useSidenavInitCollapse} from "../../hooks/useSidenavInitCollapse";

const NavBarAuth = ({userData, logoutAction}) => {
	const history = useHistory()
	const sideNavTrigger = useRef()
	const dropDownProfile = useRef()
	
	useEffect(() => {
		window.M.Dropdown.init(dropDownProfile.current)
		const modalElem = document.querySelectorAll('.modal')
		window.M.Modal.init(modalElem)
	}, [])
	useSidenavInitCollapse(sideNavTrigger)
	
	const logOut = () => {
		logoutAction()
		history.push('/')
		localStorage.clear()
	}
	
	
	return (
		<div>
			<nav>
				<div className="nav-wrapper #607d8b blue-grey darken-3">
					<ul className="left hide-on-med-and-down">
						<li>
							<button className="btn" onClick={() => history.push('/events')}>City Events</button>
						</li>
					</ul>
					<div>
						<Link className="brand-logo center logoNavBar logoHeader" to="/">
							<div className="logoHeader">
								Social City
							</div>
						</Link>
					</div>
					
					<a data-target="mobile-nav" className="sidenav-trigger "><i
						className="material-icons pointer-event" style={{cursor: 'pointer'}}>menu</i>
					</a>
					<ul className="right hide-on-med-and-down">
						<li>
							<span className="font-weight-bold">
								{userData.name}
							</span>
						</li>
						<li className="mr-3">
							<i className="material-icons dropdown-trigger"
							   data-target='dropdown1'
							   ref={dropDownProfile}
							>menu</i>
						</li>
					</ul>
					<ProfilePageModal/>
					<ul id='dropdown1' className='dropdown-content'>
						<li>
							<a className="waves-effect waves-light modal-trigger"
							   data-target="modal1">Profile</a>
						</li>
						<li>
							<a className="red-text" onClick={logOut}>Logout</a>
						</li>
					</ul>
				</div>
			</nav>
			
			<ul className="sidenav" id="mobile-nav" ref={sideNavTrigger}>
				<li>
					<div className="ml-2">
						<button className="btn-flat modal-trigger"
						        data-target="modal1">Profile
						</button>
					</div>
					
					<div className="ml-2">
						<button className="btn-flat"
						        onClick={() =>
							        history.push('/events')}>Event Board
						</button>
					</div>
					
					
					<div className="ml-2">
						<button className="btn-flat"
						        onClick={logOut}>Logout
						</button>
					</div>
				</li>
			</ul>
		</div>
	)
}
const mapStateToProps = state => ({
	userData: state.loginReducer
})
export default connect(mapStateToProps, {logoutAction})(NavBarAuth)