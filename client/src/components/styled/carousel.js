import React from 'react'
import {Carousel as CarouselSettings} from "react-responsive-carousel"
import {useSelector} from "react-redux";


const Carousel = (props) => {
	
	const widthState = useSelector(state => state.windowSizeReducer.width)
	
	const imageRender = (path, numbersOfImages) => {
		return Array(numbersOfImages).fill('').map((_, index) => {
			return (
				<div key={index}>
					<img alt={`Image number ${index}`} src={`${path}/${index + 1}.jpg`}/>
				</div>
			)
		})
	}
	
	const renderImgByWidth = () => {
		switch (true) {
			case widthState < 1155 && widthState > 600:
				return imageRender('./img/medium', 5)
			case widthState < 600:
				return imageRender('./img/small', 6)
			default:
				return imageRender('./img/large', 4)
		}
	}
	return (
		<CarouselSettings showThumbs={false}
		                  showIndicators={false}
		                  showStatus={false}
		                  showArrows={false}
		                  autoPlay={true}
		                  interval={7000}
		                  infiniteLoop={true}
		                  {...props}
		>
			{renderImgByWidth()}
		</CarouselSettings>
	)
}

export default Carousel