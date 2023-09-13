import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import itLocale from '@fullcalendar/core/locales/it'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import PersonItem from './PersonItem';

export default class CalendarView extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div>
        <div>
          <h2>Calendario Reperibilit&agrave;</h2>
        </div>

        <div className="row">
          {this.renderSidebar()}

          <div className='col-md-8'>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              locales={[itLocale]}
              headerToolbar={{
                right: 'today prev,next',
                left: 'title',
              }}
              initialView='dayGridMonth'
              dayHeaderFormat={{ weekday: 'long' }}
              editable={true}
              droppable={true}
              weekends={this.state.weekendsVisible}
              events={[]}
              eventDrop={this.handleEventDrop}
              /* initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
            />
          </div>

          <div className="col-md-2 well well-lg" >pippo</div>

        </div>
      </div>
    )
  }

  renderSidebar() {
  const person = {
      "className" :'removable ui-draggable ui-draggable-handle',
      "personId" :'pippo',
      "toJson" :'',
      "email" :'',
      "mobile" :'',
      "title" :'pippo',
      "eventColor" : {
      "textColor":"rgb(60, 118, 61)",
      "backgroundColor":"rgb(223, 240, 216)",
      "borderColor":"rgb(185, 224, 152)",
      }
    };

    return (
      <>
      <div className='col-md-2 well well-lg'>
        <h4>Reperibili</h4>
              <ul>
                <PersonItem person={person} />
              </ul>
      </div>
      </>
    )
  }

  handleEventDrop = (eventDropInfo) => {
    // Gestisci il trascinamento dell'evento qui
    console.log('Evento trascinato:', eventDropInfo);
  };

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}