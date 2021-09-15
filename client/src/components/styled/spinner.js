import React from 'react'
import styled from "styled-components"

const StyledSpinner = styled.div`
	display: ${({display}) => display || 'flex'};
  	align-items: ${props => props.align || 'center'};
  	justify-content: ${props => props.justify || 'center'};
  	margin: ${({margin}) => margin || '0'};
   	padding: ${({padding}) => padding || '0'};
  	width: ${({width}) => width || '100%'};
  	height: ${({height}) => height || '100%'};
`
const Spinner = (props) => {
	return (
		<StyledSpinner {...props}>
			<div className="preloader-wrapper big active">
				<div className="spinner-layer spinner-blue-only">
					<div className="circle-clipper left">
						<div className="circle"/>
					</div>
					<div className="gap-patch">
						<div className="circle"/>
					</div>
					<div className="circle-clipper right">
						<div className="circle"/>
					</div>
				</div>
			</div>
		</StyledSpinner>
	)
}

export default Spinner