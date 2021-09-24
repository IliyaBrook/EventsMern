import './eventCalendar.scss'
import {OverlayTrigger, Popover} from "react-bootstrap"

export const customEvents = (info) => {
	const widthScreen = document.body.clientWidth
	if (widthScreen < 500) {
		return (
			<div className="fc-content cursorPointer" id={info.event.id}>
				<span className="fc-title">{info.event.title}</span>
			</div>
		)
	}
	
	const CustomPopover = (props) => {
		return (
			<Popover id='myTooltip'  {...props}>
				<Popover.Title>{info.event.title}</Popover.Title>
				<Popover.Content>
					{info.event._def.extendedProps.description}
				</Popover.Content>
			</Popover>
		)
	}
	return (
		<OverlayTrigger overlay={CustomPopover} placement="auto">
			<div className="fc-content cursorPointer" id={info.event.id}>
				<span className="fc-title">{info.event.title}</span>
			</div>
		</OverlayTrigger>
	)
}