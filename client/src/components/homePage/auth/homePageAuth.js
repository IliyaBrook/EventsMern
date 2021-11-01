import React, {useEffect} from 'react'
import './homePageAuth.scss'
import {Button} from "react-bootstrap"
import {useDispatch} from "react-redux"
import {HOME_PAGE_LETS_START} from "../../../redux/componentLoading/homePageReducerTypes"

const HomePageAuth = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		setCarouselReady(true)
	}, [])
	return (
		<>
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