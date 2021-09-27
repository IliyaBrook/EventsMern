import React, {useEffect, useState} from 'react'
import Carousel from "../../styled/carousel";
import './homePageAuth.scss'
import {Button} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {HOME_PAGE_LETS_START} from "../../../redux/homePage/homePageReducerTypes"

const HomePageAuth = () => {
	const dispatch = useDispatch()
	const [carouselReady, setCarouselReady] = useState(false)
	useEffect(() => {
		setCarouselReady(true)
	}, [])
	return (
		<>
			{carouselReady ? <Carousel/> : <div/>}
			<div className="borderAuthHomeWrapper">
				<div className="borderAuthFlexWrapper">
					<div className="borderContent1">
						<p> Enjoy the variety of possibilities to have fun!</p>
					</div>
					<div className="borderContent2">
						<Button onClick={() => dispatch({type:HOME_PAGE_LETS_START})}>Let`s start!</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default HomePageAuth