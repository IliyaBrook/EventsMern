import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {useSidenavInitCollapse} from "../../hooks/useSidenavInitCollapse";
import {useSelector} from "react-redux"


const NavBarNotAuth = () => {
	const sideNavRef = useRef()
	useSidenavInitCollapse(sideNavRef)
	
	const isLoading = useSelector(state => state.loginReducer.isAuth)
	return (
		<div>
			<nav>
				<div className="nav-wrapper #607d8b blue-grey darken-3">
					<Link className="brand-logo center logoNavBar logoHeader" to="/">
						<div className="logoHeader">
							Social City
						</div>
					</Link>
					{
						isLoading && <div data-target="slide-out"
						                  className="sidenav-trigger left hide-on-large-only hide-on-med-only">
							<i className="material-icons" style={{cursor: 'pointer'}}>
								menu
							</i>
						</div>
					}
					{
						isLoading &&
						<ul className="right">
							<li>
								<Link to="/registration">Register</Link>
							</li>
							
							<li>
								<Link to="/login" className="pr-4">Login</Link>
							</li>
						</ul>
					}
				</div>
			</nav>
			
			<ul className="sidenav" id="slide-out" ref={sideNavRef}>
				<li>
					<Link to="/registration">Register</Link>
				</li>
				<li>
					<Link to="/login" className="pr-4">Login</Link>
				</li>
			</ul>
		</div>
	);
};

export default NavBarNotAuth