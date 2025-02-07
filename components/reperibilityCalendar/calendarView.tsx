import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row } from 'react-bootstrap';
import FullCalendar from "@fullcalendar/react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
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

function renderEventContent(eventInfo: eventInfoType) {
console.log('renderEventContent', eventInfo);
  //*********** 2023-09-12
  //togliere il commento quando si vuole aprire anche in modifica, adesso calendario in sola lettura
  //*************************
  //dipende se ha i permessi per aggiungere o meno
  let classFCEvent = "fc-event fc-event-draggable";
  //groupid={eventInfo.event.personId};

  return (
      <>
        <div className="fc-content"
        id={eventInfo.event.personReperibilityDayId}
                key={eventInfo.event.personId}
                        style={{color:eventInfo.event.textColor, backgroundColor: eventInfo.event.borderColor, borderColor:eventInfo.event.borderColor}}
                        color={eventInfo.event.eventColor}>
        <span className="fc-time"></span>
        <span className="fc-title" style={{whiteSpace: "normal"}}>{eventInfo.event.title}</span>
        </div>
      </>
    )
}

const callAPI = async (startDate, endDate, reperibilityId, setReperibilities, setReperibilityId, setCalendarEvents, setReperibilityWorkers, setRecap) => {
    const session = await getSession() as CustomSession;
    let accessToken = session ? session.accessToken : null;

    let parameters = "start="+startDate+"&end="+endDate;

    let url = '/api/rest/v4?endpoint=reperibilitycalendar%2Fshow&'+parameters;
    try {
      const response = await fetch(url, {
                                     method: 'GET',
                                     headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                         Authorization: 'Bearer '+accessToken
                                     }
                                 });
      if (!response.ok) {
        throw new Error("Errore nel recupero dati Reperibilities");
      }
      const data = await response.json();
      setReperibilities(data);
      setReperibilityId(data.reperibilitySelected.id);
    } catch (error) {
      console.error("[Reperibilities] Errore nella chiamata API:", url," >>>> ",error);
    }

    parameters = "reperibility="+reperibilityId+"&start="+startDate+"&end="+endDate;
    url = '/api/rest/v4?endpoint=reperibilitycalendar%2Fevents&'+parameters;
    try {
      const response = await fetch(url, {
                                     method: 'GET',
                                     headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                         Authorization: 'Bearer '+accessToken
                                     }
                                 });
      if (!response.ok) {
        throw new Error("Errore nel recupero dati CalendarEvents");
      }
      const data = await response.json();
      setCalendarEvents(data);
    } catch (error) {
      console.error("[CalendarEvents] Errore nella chiamata API:", url," >>>> ",error);
    }

    url = '/api/rest/v4?endpoint=reperibilitycalendar%2FreperibilityPeople&'+parameters;
    try {
     const response = await fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer '+accessToken
                                    }
                                });
     if (!response.ok) {
       throw new Error("Errore nel recupero dati ReperibilityWorkers");
     }
     const data = await response.json();
     setReperibilityWorkers(data);
   } catch (error) {
     console.error("[ReperibilityWorkers] Errore nella chiamata API:", url," >>>> ",error);
   }

    url = '/api/rest/v4?endpoint=reperibilitycalendar%2Frecap&'+parameters;
    try {
         const response = await fetch(url, {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            Authorization: 'Bearer '+accessToken
                                        }
                                    });
         if (!response.ok) {
           throw new Error("Errore nel recupero dati Recap");
         }
         const data = await response.json();
         setRecap(data);
       } catch (error) {
         console.error("[Recap] Errore nella chiamata API:", url," >>>> ",error);
    }
}

interface CalendarViewProps {
    reperibilityID: number;
}

const CalendarView: React.FC<CalendarViewProps> = ({reperibilityID}) => {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reperibilityId, setReperibilityId] = useState(reperibilityID);
  const [reperibilities, setReperibilities] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [reperibilityWorkers, setReperibilityWorkers] = useState([]);
  const [recap, setRecap] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [componentDidMountExecuted, setComponentDidMountExecuted] = useState(false);

  const calendarRef: React.RefObject<FullCalendar> = React.createRef();

  useEffect(() => {
    if (startDate && endDate) {
      if (!isUpdating) {
          setIsUpdating(true);

          if (!componentDidMountExecuted) {
            const fetchData = async () => {
              await callAPI(startDate, endDate, reperibilityId, setReperibilities, setReperibilityId, setCalendarEvents, setReperibilityWorkers, setRecap);

              setComponentDidMountExecuted(true);

              let draggableEl = document.getElementById("external-events");
              if (draggableEl) {
                new Draggable(draggableEl, {
                  itemSelector: ".fc-event",
                  eventData: (eventEl) => {
                    let title = eventEl.getAttribute("title");
                    let id = eventEl.getAttribute("id");
                    let groupId = eventEl.getAttribute("groupId");
                    let color = eventEl.getAttribute("color");

                    return { title, id, groupId, color };
                  }
                });
              }
            };
            fetchData();
          }
      }
      else {
            const fetchData = async () => {
              await callAPI(startDate, endDate, reperibilityId, setReperibilities, setReperibilityId, setCalendarEvents, setReperibilityWorkers, setRecap);
              };
              console.log("chiamo fetch data");
            fetchData();
            console.log("ho chiamato fetch data");
          }
    }
  }, [startDate, endDate, reperibilityId]);

  const handleDropdownChange = (selectedOption) => {
    setComponentDidMountExecuted(false);
    setReperibilityId(selectedOption.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextButtonClick = () => {
    setIsUpdating(false);
    setIsReload(false);
    setComponentDidMountExecuted(false);

    if (calendarRef.current) {
      calendarRef.current.getApi().next();
    }
  };

  const handlePrevButtonClick = () => {
    setIsUpdating(false);
    setIsReload(false);
    setComponentDidMountExecuted(false);

    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
    }
  };

  const handleEventNew = async (eventDropInfo:any) => {
    // Get the dropped event's information
      const { event } = eventDropInfo;
      // Update the event's start time to match the new dropped time
      event.setStart(eventDropInfo.start);
      // Update the state with the modified calendarEvents array
      setCalendarEvents((prevEvents) =>
        prevEvents.map((calEvent: any) =>
          calEvent.id === event.id ? event : calEvent
        )
      );

      let personId = eventDropInfo.event.id;
      let start = eventDropInfo.event.startStr;
      let reperibilityId = 14;

      const parameters = "reperibility=14&date="+start+"&personId="+personId;
      const session = await getSession() as CustomSession;
      let accessToken = session ? session.accessToken : null;

      const url = '/api/rest/v4?endpoint=reperibilitycalendar%2F';

      try {
        const response = await fetch(url, {
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
                                   });
        if (!response.ok) {
          throw new Error("Errore nel salvataggio dati handleEventNew");
        }
        window.location.reload();
      } catch (error) {
        console.error("[Reperibilities] Errore nella chiamata API:", url," >>>> ",error);
      }
  };

  const handleEventDrop = async (eventDropInfo:any) => {
    // Get the dropped event's information
      const { event } = eventDropInfo;
      // Update the event's start time to match the new dropped time
      event.setStart(eventDropInfo.start);
      // Update the state with the modified calendarEvents array
      setCalendarEvents((prevEvents) =>
        prevEvents.map((calEvent: any) =>
          calEvent.id === event.id ? event : calEvent
        )
      );

      // You can also add any additional logic you need here
      let eventId=eventDropInfo.event.id;
      let start=eventDropInfo.event.startStr;
      const date = new Date(start);
      const parameters = "newDate="+start;
      const session = await getSession() as CustomSession;
      let accessToken = session ? session.accessToken : null;

      const url = '/api/rest/v4?endpoint=reperibilitycalendar%2Fpatch%2F'+eventId+'&'+parameters;
      try {
          const response = await fetch(url, {
                                         method: 'PATCH',
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
                                     });
          if (!response.ok) {
            throw new Error("Errore nel salvataggio dati handleEventNew");
          }
          window.location.reload();
      } catch (error) {
        console.error("[Reperibilities] Errore nella chiamata API:", url," >>>> ",error);
      }
  };

  const handleEventClick = (eventClick) => {
    Alert.fire({
          title: eventClick.event.title,
          html:
            `<div className="table-responsive">
          <table className="table">
          <tbody>
          <tr >
          <td>Title</td>
          <td><strong>` +
            eventClick.event.title +
            `</strong></td>
          </tr>
          <tr >
          <td>Start Time</td>
          <td><strong>
          ` +
            eventClick.event.start +
            `
          </strong></td>
          </tr>
          </tbody>
          </table>
          </div>`,

          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Remove Event",
          cancelButtonText: "Close"
        }).then(result => {
          if (result.value) {
            eventClick.event.remove(); // It will remove event from the calendar
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
          }
        });
  }


  return (
    <>
      <Container fluid>
      <div className="page-header">
      	  <h2>Calendario Reperibilità</h2>
      	  <br/>
      </div>
        <Row>

            <div className="col-sm-6 col-sm-offset-3">
              {/* Colonna per il titolo */}
              <div className="form-group ">
                <label htmlFor="reperibility" className="control-label col-sm-3">
                		Servizio di reperibilità
                		</label>
                {/* Colonna per DropdownReperibilityType */}
                <div className="col-sm-6">
                  <DropdownReperibilityType onChange={handleDropdownChange} />
                </div>
              </div>
            </div>

        </Row>

        <Row>
          <Col md={2} className="well well-lg">
            <ReperibilityWorkers reperibilityWorkers={reperibilityWorkers} />
          </Col>
          <Col md={8}>
            <div id="reperibilityCalendar">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
              ref={calendarRef}
              locales={[itLocale]}
              locale="it"
              headerToolbar={{
                right: 'today prev,next',
                left: 'title',
              }}
              customButtons={{
                          next: {
                            text: 'Next', // Testo del pulsante "Next"
                            click: handleNextButtonClick, // Gestore personalizzato al clic
                          },
                          prev: {
                                  text: 'Prev', // Testo del pulsante "Next"
                                  click: handlePrevButtonClick, // Gestore personalizzato al clic
                                },
                        }}
              initialView='dayGridMonth'
              dayHeaderFormat={{ weekday: 'long' }}
              editable={false}
              droppable={false}
              weekends={true}
              eventsSet={(events) => {
                console.log("Eventi caricati nel calendario:", events);
              }}
              eventSources={[
                {
                  events: calendarEvents, // I tuoi eventi principali
                  className: "custom-event",
                },
                {
                          googleCalendarApiKey: "AIzaSyDxn95GcuRQ8VqsDiu72LlebkplabI1ppM", // API Key Google Calendar
                          googleCalendarId: "it.italian#holiday@group.v.calendar.google.com", // ID del calendario delle festività italiane
                          display: "background", // Mostra le festività come sfondo
                          className: "holiday", // Classe CSS personalizzata
                        }
              ]}
              datesSet={(arg) => {
                let dateStart = new Date(arg.start);
                let year = dateStart.getFullYear();
                let month = (dateStart.getMonth() + 1).toString().padStart(2, '0'); // Aggiunge lo zero iniziale se necessario
                let day = dateStart.getDate().toString().padStart(2, '0'); // Aggiunge lo zero iniziale se necessario
                let startDate = `${year}-${month}-${day}`;
                let dateEnd = new Date(arg.end);
                let endDate = dateEnd.toISOString().substring(0, 10);
                setStartDate(startDate);
                setEndDate(endDate);
              }}

              eventClick={function(){}}
              eventDrop={handleEventDrop}
              eventRemove={function(){}}
              eventReceive={handleEventNew}
              eventDidMount={(arg) => {
                  const eventElementArg = arg.el;
                  // Rimuovi l'elemento <a> attorno all'evento
                  const anchorElement = eventElementArg.tagName.toLowerCase();

                  if (anchorElement) {
                    eventElementArg.removeAttribute('href');
                    //per aggiungere a tag a gli stessi stili del div per renderlo uguale al vecchio epas
                    const observer = new MutationObserver(() => {
                      const divElement = eventElementArg.querySelector('div.fc-content');
                      if (divElement) {
                        eventElementArg.style.color = divElement.style.color;
                        eventElementArg.style.backgroundColor = divElement.style.backgroundColor;
                        eventElementArg.style.borderColor = divElement.style.borderColor;
                        observer.disconnect(); // Ferma l'osservazione
                      }
                    });

                    observer.observe(eventElementArg, { childList: true, subtree: true });
                  }
                }}
              eventContent={renderEventContent}
              showNonCurrentDates={false}
            />
          </div>
          </Col>
          <Col md={2} className="well well-lg">
            <RecapCalendar recapData={recap} />
          </Col>
        </Row>
        </Container>
      </>
  );
};

export default CalendarView;
