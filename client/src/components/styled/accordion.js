import React from 'react'
import styled from "styled-components"
import {Accordion, Card} from "react-bootstrap"

const StyledAccordion = styled.div`
  display: ${props => props.display || 'block'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
  padding: ${({padding}) => padding || '0'};
  width: ${({width}) => width || '100%'};
  .el, div:nth-child(1) {
    width: ${({width}) => width || '100%'};
  }
`

export const AccordionDropDown = (props) => {
	return (
		<Accordion defaultActiveKey="0" style={{
			margin: props.wrapMargin || '0',
			padding: props.wrapPadding || '0'
		}}>
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey="1" style={{
					cursor:'pointer',
					height: props.toggleHeight || '100%',
					color: props.headerColor || 'black',
					textAlign:'justify',
					display: 'flex',
					justifyContent:props.headerJustify ||'start',
					alignItems:props.headerAlign || 'center',
					fontSize:props.headerSize || '100%',
				}}>
					{props.header}
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						<StyledAccordion {...props}/>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	)
}