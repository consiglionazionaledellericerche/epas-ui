import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from 'react-bootstrap';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import itLocale from '@fullcalendar/core/locales/it'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";


class CalendarView extends React.Component {
  state = {
    calendarEvents: [
      {
        title: "Atlanta Monster",
        start: new Date("2019-04-04 00:00"),
        id: "99999998"
      },
      {
        title: "My Favorite Murder",
        start: new Date("2019-04-05 00:00"),
        id: "99999999"
      }
    ],
    events: [
      { title: "Event 1", id: "1" },
      { title: "Event 2", id: "2" },
      { title: "Event 3", id: "3" },
      { title: "Event 4", id: "4" },
      { title: "Event 5", id: "5" }
    ],
  };

  /**
   * adding dragable properties to external events through javascript
   */
  componentDidMount(event) {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { isEditForm, formTitle } = this.state;
    return (
      <div className="animated fadeIn p-4 demo-app">
        <Row>
          <Col lg={3} sm={3} md={3}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "auto",
                maxHeight: "-webkit-fill-available"
              }}
            >
              <p align="center">
                <strong> Events</strong>
              </p>
              {this.state.events.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </Col>

          <Col lg={9} sm={9} md={9}>
            <div className="demo-app-calendar" id="mycalendartest">
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
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              eventClick={this.handleEventClick}
              eventDrop={function(eventBj, date) {
                      console.log('eventDrop function');
                  }}
              eventRemove={function(){}}
              eventReceive={this.handleEventDrop}

              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  handleEventDrop = (eventDropInfo) => {
    // Gestisci il trascinamento dell'evento qui
    console.log('Evento trascinato:', eventDropInfo);
  };

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }
}


export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}

export default CalendarView;