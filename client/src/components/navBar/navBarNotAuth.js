import React, {useRef} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useSidenavInitCollapse} from "../../hooks/useSidenavInitCollapse";


const NavBarNotAuth = () => {
	const sideNavRef = useRef()
	useSidenavInitCollapse(sideNavRef)
	
	
	const location = useHistory().location.pathname
	const navBarStylesByLocation = () => {
		switch (location) {
			case '/login':
				return '#212121 grey darken-4'
			default:
				return '#212121 grey darken-4'
		}
	}
	
	return (
		<div>
			<nav className={navBarStylesByLocation()}>
				<div className="nav-wrapper #607d8b blue-grey darken-3">
					<Link className="brand-logo center logoStyleNotAuth logoHeader" to="/">
						<div className="logoHeader hide-on-small-only">
							Social City
						</div>
					</Link>
					<div data-target="slide-out" className="sidenav-trigger left hide-on-large-only hide-on-med-only">
						<i className="material-icons" style={{cursor: 'pointer'}}>
							menu
						</i>
					</div>
					<ul className="right">
						<li>
							<Link to="/register">Register</Link>
						</li>
						
						<li>
							<Link to="/login" className="pr-4">Login</Link>
						</li>
					</ul>
				</div>
			</nav>
			
			<ul className="sidenav" id="slide-out" ref={sideNavRef}>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/login" className="pr-4">Login</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavBarNotAuth