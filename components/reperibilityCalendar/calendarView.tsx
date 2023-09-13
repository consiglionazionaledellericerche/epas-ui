import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from 'react-bootstrap';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import itLocale from '@fullcalendar/core/locales/it'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { useRequest } from "../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { getSession } from 'next-auth/react';
import messages from '../../public/data/messages.json';
import ReperibilityWorkers from './reperibilityWorkers';
import RecapCalendar from './recapCalendar';
import DropdownReperibilityType from './dropdownReperibilityType';

function renderEventContent(eventInfo) {
//console.log('renderEventContent', eventInfo.event);
  //*********** 2023-09-12
  //togliere il commento quando si vuole aprire anche in modifica, adesso calendario in sola lettura
  //*************************
  let classFCEvent = "" //"fc-event fc-event-draggable"

  return (
    <>
      <span  className={classFCEvent}
        title={eventInfo.event.title}
        id={eventInfo.event.personReperibilityDayId}
        groupid={eventInfo.event.personId}
        key={eventInfo.event.personId}
        style={{color:eventInfo.event.textColor, backgroundColor: eventInfo.event.borderColor, borderColor:eventInfo.event.borderColor}}
        color={eventInfo.event.eventColor}
         >
      {eventInfo.event.title}
      </span>
    </>
  )
}

class CalendarView extends React.Component {

  calendarRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = { calendarEvents: [],
                   reperibilityWorkers: [],
                   recap: [],
                   componentDidMountExecuted: false,
                   isUpdating: false,
                   reperibilities: {},
                   startDate: null,
                   endDate: null,
                   isReload:false,
                   reperibilityId:props.reperibilityID,
                  };
  }
  /**
   * adding dragable properties to external events through javascript
   */
  async componentDidUpdate(prevProps, prevState) {
  //console.log("componentDidUpdate prevState.componentDidMountExecuted>>> ", prevState.componentDidMountExecuted);

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

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

handleDropdownChange = async (selectedOption) => {
    //console.log('Opzione selezionata:', selectedOption);
    this.setState({ reperibilityId: selectedOption.value });
    await this.callAPI();
  };

async callAPI() {
    const session = await getSession();
    //console.log("callAPI this.state",this.state);
    const accessToken = session.accessToken;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let parameters = "start="+startDate+"&end="+endDate;
    let reperibilityId = this.state.reperibilityId;

    let url = '/api/rest/v4/reperibilitycalendar/show?'+parameters;
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

    //let reperibilityId = this.state.reperibilityId;
    //console.log("reperibilityId",reperibilityId);

    parameters = "reperibility="+reperibilityId+"&start="+startDate+"&end="+endDate;

    url = '/api/rest/v4/reperibilitycalendar/events?'+parameters;
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

    url = '/api/rest/v4/reperibilitycalendar/reperibilityPeople?'+parameters;
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

    url = '/api/rest/v4/reperibilitycalendar/recap?'+parameters;
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
            //console.log("<<<<<reperibilitycalendar recap>>>>", this.state);
        });

        //console.log("this.state.recap", this.state.recap);

};

  handleNextButtonClick = () => {
    // Personalizza l'azione del pulsante "Next" qui
    //console.log('Hai cliccato su "Next"!');
    // Esegui l'azione predefinita per avanzare al mese successivo
    this.setState({ isUpdating:false, isReload:false });
    this.calendarRef.current.getApi().next();
  };
  handlePrevButtonClick = () => {
      // Personalizza l'azione del pulsante "Next" qui
      //console.log('Hai cliccato su "Prev"!');
      // Esegui l'azione predefinita per avanzare al mese successivo
      this.setState({ isUpdating:false, isReload:false });
      this.calendarRef.current.getApi().prev();
    };

  render() {
    const { isEditForm, formTitle } = this.state;
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
                              //console.log('datesSet', this.state,"THIS STATE", `    ${arg.start}  ${arg.end}`); // ending visible date

                                let dateStart = new Date(arg.start);
                                let year = dateStart.getFullYear();
                                let month = (dateStart.getMonth() + 1).toString().padStart(2, '0'); // Aggiunge lo zero iniziale se necessario
                                let day = dateStart.getDate().toString().padStart(2, '0'); // Aggiunge lo zero iniziale se necessario
                                let startDate = `${year}-${month}-${day}`;

                                let dateEnd = new Date(arg.end);
                                let endDate = dateEnd.toISOString().substring(0, 10);
                                //console.log('startDate', startDate);
                                //console.log('endDate', endDate);
                                if (!this.state.isUpdating && this.state.startDate !== startDate) {
                                    this.setState({ startDate: startDate, endDate: endDate });
                                    //console.log('this.state', this.state);
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

  handleEventNew = async (eventDropInfo) => {
    // Get the dropped event's information
      const { event } = eventDropInfo;

      // Update the event's start time to match the new dropped time
      event.setStart(eventDropInfo.start);

      // Update the state with the modified calendarEvents array
      this.setState((prevState) => {
        const updatedEvents = prevState.calendarEvents.map((calEvent) =>
          calEvent.id === event.id ? event : calEvent
        );

        return { calendarEvents: updatedEvents };
      });

      // You can also add any additional logic you need here
      //console.log('Evento handleEventNew:', eventDropInfo.event);
      //let personId = eventDropInfo.event._def.sourceId;
      let personId=eventDropInfo.event.id;
      let start=eventDropInfo.event.startStr;
      let reperibilityId = 14;

      const parameters = "reperibility=14&date="+start+"&personId="+personId;
      //console.log('parameters:', parameters);
      const session = await getSession();
      const accessToken = session.accessToken

      const url = '/api/rest/v4/reperibilitycalendar/';
      //console.log('url:', url);

          fetch(url, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer '+accessToken
              },
              data: {
                      "personId": personId,
                      "reperibilityId": reperibilityId,
                      "date": start
                    }
          }).then(response => response.json())
            .catch(error => console.error("unable to achive this", error))
              .then(data => {
              //console.log("handleEventNew reperibilityWorkers data >>> ", data);
                  this.setState({isUpdating: false, componentDidMountExecuted: true})
                  window.location.reload();
              });

  };

  handleEventDrop = async (eventDropInfo) => {
    // Get the dropped event's information
      const { event } = eventDropInfo;

      // Update the event's start time to match the new dropped time
      event.setStart(eventDropInfo.start);

      // Update the state with the modified calendarEvents array
      this.setState((prevState) => {
        const updatedEvents = prevState.calendarEvents.map((calEvent) =>
          calEvent.id === event.id ? event : calEvent
        );

        return { calendarEvents: updatedEvents };
      });

      // You can also add any additional logic you need here
      //console.log('Evento spostato:', eventDropInfo.event);
      //let personId = eventDropInfo.event._def.sourceId;
      let eventId=eventDropInfo.event.id;
      let start=eventDropInfo.event.startStr;
      const date = new Date(start);
      //console.log(start, `    ${date.toLocaleDateString()}`);

      const parameters = "newDate="+start;
      //console.log('parameters:', parameters);
      const session = await getSession();
      const accessToken = session.accessToken

      const url = '/api/rest/v4/reperibilitycalendar/patch/'+eventId+'?'+parameters;
      //console.log('url:', url);

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
              //console.log("handleEventDrop reperibilityWorkers data >>> ", data);
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


export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}

export default CalendarView;