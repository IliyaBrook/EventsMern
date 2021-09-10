import React from 'react'
import styled from "styled-components";

const FlexStyled = styled.div`
	display: flex;
  	flex-direction: ${props => props.direction || 'row'};
  	align-items: ${props => props.align || 'row'};
  	justify-content: ${props => props.justify || 'row'};
  	margin: ${({margin}) => margin || '0'};
  	padding: ${({padding}) => padding || '0'};
`
export const Flex = (props) => {
	return <FlexStyled {...props}/>
}