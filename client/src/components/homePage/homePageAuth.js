import React, {useEffect, useState} from 'react'
import Carousel from "../styled/carousel";


const HomePageAuth = () => {
	const [carouselReady, setCarouselReady] = useState(false)
	useEffect(() => {
		setCarouselReady(true)
	}, [])
	return (
		<>
			{carouselReady ? <Carousel/> : <div/>}
		</>
	)
}

export default HomePageAuth