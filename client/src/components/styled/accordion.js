import React from 'react'
import styled from "styled-components";
import {Accordion, ListGroup} from "react-bootstrap";

const StyledAccordion = styled.div`
  display: ${props => props.display || 'block'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
  padding: ${({padding}) => padding || '0'};
  width: ${({width}) => width || '100%'};
  .el, div:nth-child(1){
  	  width: ${({width}) => width || '100%'};
  }
`
export const AccordionDropDown = (props) => {
	
	return (
		<Accordion style={{margin:props.wrapMargin,padding:props.wrapPadding}}>
			<Accordion.Item eventKey="0">
				<Accordion.Header>{props.header}</Accordion.Header>
				<Accordion.Body>
					<ListGroup>
						<StyledAccordion {...props}/>
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	)
}