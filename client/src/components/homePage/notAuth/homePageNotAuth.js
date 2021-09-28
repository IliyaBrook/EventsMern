import React, {useEffect, useState} from 'react'
import Carousel from '../../styled/carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import '../homePage.scss'
import {useDispatch} from 'react-redux'
import {push} from 'react-router-redux'

const HomePageNotAuth = () => {
	
	const [carouselReady, setCarouselReady] = useState(false)
	useEffect(() => {
		setCarouselReady(true)
	}, [])
	
	const dispatch = useDispatch()
	const redirectEvent = (e) => {
		switch (e.target.id) {
			case 'register':
				return dispatch(push('/registration'))
			case 'login':
				return dispatch(push('/login'))
		}
	}
	return (
		<div>
			{carouselReady ? <Carousel/> : <div/>}
			<div className="notAuthBorderWrapper justify-content-center d-flex ">
				<div className="section"/>
				<div className="notAuthBorder rounded">
					<div className="section"/>
					<div className="regHeader">
						<div className="d-flex justify-content-center">
							<div className="text-justify text-center white-text">
								<h5 className="text-nowrap text">REGISTRATION</h5>
							</div>
						</div>
						<div className="regBtn">
							<div className="d-flex align-items-center h-100 justify-content-center">
								<div className="btn-floating pulse ml-5 mb-3">
									<i className="material-icons ml-4" onClick={redirectEvent}
									   id="register">edit</i>
								</div>
							</div>
						</div>
					</div>
					<div className="section"/>
					<div className="divider"/>
					<div className="section"/>
					
					<div className="row">
						<div className="col s1">
							<div className='notRegText white-text'>
								<div className="flow-text text-center">
									<p>You are welcome to take part in any event</p>
									<p>you can find here in our virtual Social City!</p>
									<p className="p-2">See you soon!</p>
									
									<div className="homePageAdminUserProviderWrapper">
										<div className="userWrapper">
											<h6>Admin user:
												<span> admin@gmail.com</span>
											</h6>
										</div>
										<div className="passwordWrapper">
											<h6>Password:
												<span>123456</span>
											</h6>
										</div>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					
					<div className="w-100 d-flex justify-content-center">
						<button className="btn"
						        onClick={redirectEvent}
						        id="login">Login
						</button>
					</div>
					<div className="section"/>
				</div>
			</div>
		</div>
	)
}
export default HomePageNotAuth