import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from 'react-bootstrap';
import FullCalendar from "@fullcalendar/react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import itLocale from '@fullcalendar/core/locales/it'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { getServerSession } from "next-auth/next"
import { getSession } from 'next-auth/react';
import ReperibilityWorkers from './reperibilityWorkers';
import RecapCalendar from './recapCalendar';
import DropdownReperibilityType from './dropdownReperibilityType';
import {useTranslations} from 'next-intl';
import { CustomSession } from "../../types/customSession";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../pages/api/auth/[...nextauth]';


interface eventElem {
  title: string,
  personReperibilityDayId: string,
  textColor: string,
  borderColor: string,
  eventColor: string,
  personId: number,
}
interface eventInfoType {
  event : eventElem
}

interface CalendarViewProps {
  reperibilityID: number
}
interface CalendarViewState { calendarEvents: any
                               reperibilityWorkers: any,
                               recap: any,
                               componentDidMountExecuted: boolean,
                               isUpdating: boolean,
                               reperibilities: any,
                               startDate: string,
                               endDate: string,
                               isReload:boolean,
                               reperibilityId:number,
                              }
function renderEventContent(eventInfo: eventInfoType) {
//console.log('renderEventContent', eventInfo.event);
  //*********** 2023-09-12
  //togliere il commento quando si vuole aprire anche in modifica, adesso calendario in sola lettura
  //*************************
  let classFCEvent = "" //"fc-event fc-event-draggable"
        //groupid={eventInfo.event.personId}

  return (
    <>
      <span  className={classFCEvent}
        title={eventInfo.event.title}
        id={eventInfo.event.personReperibilityDayId}
        key={eventInfo.event.personId}
        style={{color:eventInfo.event.textColor, backgroundColor: eventInfo.event.borderColor, borderColor:eventInfo.event.borderColor}}
        color={eventInfo.event.eventColor}
         >
      {eventInfo.event.title}
      </span>
    </>
  )
}

class CalendarView extends Component<CalendarViewProps, CalendarViewState> {

  calendarRef: React.RefObject<FullCalendar> = React.createRef();

  constructor(props:CalendarViewProps) {
    super(props);
    this.state = { calendarEvents: [],
                   reperibilityWorkers: [],
                   recap: [],
                   componentDidMountExecuted: false,
                   isUpdating: false,
                   reperibilities: {},
                   startDate: "",
                   endDate: "",
                   isReload:false,
                   reperibilityId:props.reperibilityID,
                  };
  }
  /**
   * adding dragable properties to external events through javascript
   */
  async componentDidUpdate(prevProps:CalendarViewProps, prevState:CalendarViewState) {
    if (!this.state.isUpdating) {
      this.setState({ isUpdating: true });

      if (!prevState.componentDidMountExecuted) {

        await this.callAPI();

          let draggableEl = document.getElementById("external-events");
          //*********** 2023-09-12
          //togliere il commento quando si vuole aprire anche in modifica, adesso calendario in sola lettura
          //*************************
//           new Draggable(draggableEl, {
//             itemSelector: ".fc-event",
//             eventData: function(eventEl) {
//             console.log("Draggable eventData eventEl ", eventEl);
//               let title = eventEl.getAttribute("title");
//               let id = eventEl.getAttribute("id");
//               let groupId = eventEl.getAttribute("groupId");
//               let color = eventEl.getAttribute("color");
//               console.log("Draggable eventData eventEl ", title, id, groupId, color);
//               return {
//                 title: title,
//                 color: color,
//                 id:id,
//                 groupId:groupId
//               };
//             }
//           });
      }
    }
  }

handleChange = (name: string, value: string) => {
  this.setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

handleDropdownChange = async (selectedOption: {label:string, value:number}) => {
    this.setState({ reperibilityId: selectedOption.value });
    await this.callAPI();
  };

async callAPI() {
    const session = await getSession() as CustomSession;
    let accessToken = null;
    if (session) {
      accessToken = session.accessToken;
    }
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let parameters = "start="+startDate+"&end="+endDate;
    let reperibilityId = this.state.reperibilityId;

    let url = '/api/rest/v4?endpoint=reperibilitycalendar%2Fshow&'+parameters;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+accessToken
        }
    }).then(response => response.json())
      .catch(error => console.error("unable to achive this", error))
        .then(data => {
            this.setState({'reperibilities': data, reperibilityId: data.reperibilitySelected.id});

        });

    parameters = "reperibility="+reperibilityId+"&start="+startDate+"&end="+endDate;

    url = '/api/rest/v4?endpoint=reperibilitycalendar%2Fevents&'+parameters;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+accessToken
        }
    }).then(response => response.json())
      .catch(error => console.error("unable to achive this", error))
        .then(data => {
            this.setState({'calendarEvents': data})
        });

    url = '/api/rest/v4?endpoint=reperibilitycalendar%2FreperibilityPeople&'+parameters;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+accessToken
        }
    }).then(response => response.json())
      .catch(error => console.error("unable to achive this", error))
        .then(data => {
            this.setState({'reperibilityWorkers': data, componentDidMountExecuted: true})
        });

    url = '/api/rest/v4?endpoint=reperibilitycalendar%2Frecap&'+parameters;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+accessToken
        }
    }).then(response => response.json())
      .catch(error => console.error("unable to achive this", error))
        .then(data => {
            this.setState({'recap': data, componentDidMountExecuted: true})
        });
};

  handleNextButtonClick: () => void = () => {
    this.setState({ isUpdating:false, isReload:false });
    if (this.calendarRef.current && this.calendarRef.current.getApi) {
        this.calendarRef.current.getApi().next();
    }
  };
  handlePrevButtonClick: () => void = () => {
      this.setState({ isUpdating:false, isReload:false });
      if (this.calendarRef.current && this.calendarRef.current.getApi) {
          this.calendarRef.current.getApi().prev();
      }
  };

  render() {
    return (
    <>
      <Container fluid>
      <h1>Calendario reperibilità</h1>
        <Row>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              {/* Colonna per il titolo */}
              <div className="col-5"></div>
              <div className="col-1">
                Servizio di reperibilità
              </div>
              {/* Colonna per DropdownReperibilityType */}
              <div className="col-1">
                <DropdownReperibilityType onChange={this.handleDropdownChange} />
              </div>
              <div className="col-5"></div>
            </div>
          </div>
        </Row>
        <Row>
          <ReperibilityWorkers reperibilityWorkers={this.state.reperibilityWorkers} />
          <Col md={8}>
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar
              ref={this.calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              locales={[itLocale]}
              headerToolbar={{
                right: 'today prev,next',
                left: 'title',
              }}
              customButtons={{
                          next: {
                            text: 'Next', // Testo del pulsante "Next"
                            click: this.handleNextButtonClick, // Gestore personalizzato al clic
                          },
                          prev: {
                                  text: 'Prev', // Testo del pulsante "Next"
                                  click: this.handlePrevButtonClick, // Gestore personalizzato al clic
                                },
                        }}
              initialView='dayGridMonth'
              dayHeaderFormat={{ weekday: 'long' }}
              editable={false}
              droppable={false}
              weekends={true}
              events={this.state.calendarEvents}
              eventClick={function(){}}
              eventDrop={this.handleEventDrop}
              eventRemove={function(){}}
              eventReceive={this.handleEventNew}
              eventDidMount={(arg) => {
                  const eventElementArg = arg.el;
                  // Rimuovi l'elemento <a> attorno all'evento
                  const anchorElement = eventElementArg.tagName.toLowerCase();
                  if (anchorElement) {
                    eventElementArg.removeAttribute('href');
                  }
                }}
              eventContent={renderEventContent}
              showNonCurrentDates={false}
              datesSet={(arg) => {
                                let dateStart = new Date(arg.start);
                                let year = dateStart.getFullYear();
                                let month = (dateStart.getMonth() + 1).toString().padStart(2, '0'); // Aggiunge lo zero iniziale se necessario
                                let day = dateStart.getDate().toString().padStart(2, '0'); // Aggiunge lo zero iniziale se necessario
                                let startDate = `${year}-${month}-${day}`;
                                let dateEnd = new Date(arg.end);
                                let endDate = dateEnd.toISOString().substring(0, 10);
                                if (!this.state.isUpdating && this.state.startDate !== startDate) {
                                    this.setState({ startDate: startDate, endDate: endDate });
                                }
                                if (!this.state.isReload){
                                  this.setState({ isReload:true, startDate:startDate, endDate: endDate });
                                  this.callAPI();
                                }
                         }}
              />
            </div>
          </Col>
          <RecapCalendar recapData={this.state.recap} />
        </Row>
        </Container>
      </>
    );
  }

  handleEventNew = async (eventDropInfo:any) => {
    // Get the dropped event's information
      const { event } = eventDropInfo;
      // Update the event's start time to match the new dropped time
      event.setStart(eventDropInfo.start);
      // Update the state with the modified calendarEvents array
      this.setState((prevState) => {
        const updatedEvents = prevState.calendarEvents.map((calEvent:any) =>
          calEvent.id === event.id ? event : calEvent
        );
        return { calendarEvents: updatedEvents };
      });

      let personId=eventDropInfo.event.id;
      let start=eventDropInfo.event.startStr;
      let reperibilityId = 14;

      const parameters = "reperibility=14&date="+start+"&personId="+personId;
      const session = await getSession() as CustomSession;
      let accessToken = null;
      if (session) {
        accessToken = session.accessToken;
      }
      const url = '/api/rest/v4?endpoint=reperibilitycalendar%2F';
      fetch(url, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+accessToken
          },
          body: JSON.stringify({
                  "personId": personId,
                  "reperibilityId": reperibilityId,
                  "date": start
                })
      }).then(response => response.json())
        .catch(error => console.error("unable to achive this", error))
        .then(data => {
            this.setState({isUpdating: false, componentDidMountExecuted: true})
            window.location.reload();
        });
  };

  handleEventDrop = async (eventDropInfo:any) => {
    // Get the dropped event's information
      const { event } = eventDropInfo;
      // Update the event's start time to match the new dropped time
      event.setStart(eventDropInfo.start);
      // Update the state with the modified calendarEvents array
      this.setState((prevState) => {
        const updatedEvents = prevState.calendarEvents.map((calEvent:any) =>
          calEvent.id === event.id ? event : calEvent
        );
        return { calendarEvents: updatedEvents };
      });
      // You can also add any additional logic you need here
      let eventId=eventDropInfo.event.id;
      let start=eventDropInfo.event.startStr;
      const date = new Date(start);
      const parameters = "newDate="+start;
      const session = await getSession() as CustomSession;
      let accessToken = null;
      if (session) {
        accessToken = session.accessToken;
      }
      const url = '/api/rest/v4?endpoint=reperibilitycalendar%2Fpatch%2F'+eventId+'&'+parameters;
      fetch(url, {
          method: 'PATCH',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+accessToken
          }
      }).then(response => response.json())
        .catch(error => console.error("unable to achive this", error))
        .then(data => {
            this.setState({isUpdating: false, componentDidMountExecuted: true})
        });
  };

//   handleEventClick = (eventClick) => {
//     Alert.fire({
//           title: eventClick.event.title,
//           html:
//             `<div className="table-responsive">
//           <table className="table">
//           <tbody>
//           <tr >
//           <td>Title</td>
//           <td><strong>` +
//             eventClick.event.title +
//             `</strong></td>
//           </tr>
//           <tr >
//           <td>Start Time</td>
//           <td><strong>
//           ` +
//             eventClick.event.start +
//             `
//           </strong></td>
//           </tr>
//           </tbody>
//           </table>
//           </div>`,
//
//           showCancelButton: true,
//           confirmButtonColor: "#d33",
//           cancelButtonColor: "#3085d6",
//           confirmButtonText: "Remove Event",
//           cancelButtonText: "Close"
//         }).then(result => {
//           if (result.value) {
//             eventClick.event.remove(); // It will remove event from the calendar
//             Alert.fire("Deleted!", "Your Event has been deleted.", "success");
//           }
//         });
//   }
}

export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    },
  };
}

export default CalendarView;