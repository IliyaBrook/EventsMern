import React from 'react';
import {Link} from "react-router-dom";
import ProfilePageModal from "../profilePage/profilePageModal";
import {connect} from 'react-redux'
import {logoutAction} from '../../redux/login/loginActions'

const NavBarAuth = ({userData, logoutAction}) => {

	return (
		<div>
			<nav>
				<div className="nav-wrapper #607d8b blue-grey darken-3">
					<ul className="left hide-on-med-and-down">
						<li>
							<button className="btn" onClick={() => history.push('/')}>City Events</button>
						</li>
					</ul>
					<div>
						<Link className="brand-logo center logoNavBar logoHeader" to="/">
							<div className="logoHeader">
								Social City
							</div>
						</Link>
					</div>
					
					<a data-target="mobile-nav" className="sidenav-trigger">
						<i className="material-icons pointer-event" style={{cursor: 'pointer'}}>menu</i>
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
							   data-target="modalAuthNavBar">Profile</a>
						</li>
						<li>
							<a className="red-text" onClick={() => logoutAction()}>Logout</a>
						</li>
					</ul>
				</div>
			</nav>
			
			<ul className="sidenav" id="mobile-nav" ref={sideNavTrigger}>
				<li>
					<div className="ml-2">
						<button className="btn-flat modal-trigger"
						        data-target="modalAuthNavBar">Profile
						</button>
					</div>
					
					<div className="ml-2">
						<button className="btn-flat"
						        onClick={() =>
							        history.push('/')}>Event Board
						</button>
					</div>
					<div className="ml-2">
						<button className="btn-flat" onClick={() => logoutAction()}>Logout</button>
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