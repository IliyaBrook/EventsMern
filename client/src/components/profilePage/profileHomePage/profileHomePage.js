import React, {useMemo} from 'react'
import './profileHomePage.scss'
import {useSelector} from "react-redux"
import {Button, Card} from "react-bootstrap"


const ProfileHomePage = () => {
	
	const {eventReducer: {events}, loginReducer: {email}} = useSelector(state => state)
	
	const userEvents = useMemo(() => {
		return events.filter(event => {
			return event.subscriptions.find(elem => elem.email === email)
		})
	}, [events])
	
	
	
	const renderEvent = () => {
		return (
			<div className="profileHomeWrapper">
				<div className="profileHomeHeaderWrapper">
					<p>Your event subscriptions:</p>
				</div>
				{
					userEvents.map((event, index) => {
						return (
							<div className="profileHomeContentWrapper" key={index}>
								<div className="profileHomeEventsWrapper">
									<Card>
										<Card.Header as="h5">{`Event Name: `}</Card.Header>
										<Card.Body>
											<Card.Title>Special title treatment</Card.Title>
											<Card.Text>
												With supporting text below as a natural lead-in to additional content.
											</Card.Text>
											<Button>Delete subscription</Button>
										</Card.Body>
									</Card>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
	
	
	return (
		<>
			{renderEvent()}
		</>
	)
}

export default ProfileHomePage