import React, {useMemo} from "react"
import FullCalendar from "@fullcalendar/react"
import EventProvider from "./EventProvider"
import CustomEvents from "./customEvents"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"

const RenderCalendar = ({calendarRef, eventClick, events}) => {
	
	const providePlugins = useMemo(() => {
		return [dayGridPlugin, interactionPlugin]
	}, [events, dayGridPlugin, interactionPlugin])
	
	return (
		<div>
			<FullCalendar
				ref={calendarRef}
				plugins={providePlugins}
				initialView="dayGridMonth"
				events={EventProvider()}
				height={600}
				eventDisplay={'block'}
				eventContent={CustomEvents}
				eventClick={eventClick}
				displayEventEnd={false}
				displayEventTime={true}
			/>
		</div>
	)
}

export default React.memo(RenderCalendar)
