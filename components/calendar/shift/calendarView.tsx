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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth/next"
import { getSession } from 'next-auth/react';
import ReperibilityWorkers from './reperibilityWorkers';
import RecapCalendar from './recapCalendar';
import DropdownReperibilityType from '../dropdownReperibilityType';
import ButtonRemoveEvent from '../buttonRemoveEvent';
import {useTranslations} from 'next-intl';
import { CustomSession } from "../../../types/customSession";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import DateUtility from "../../../utils/dateUtility";

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
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const calendarRef: React.RefObject<FullCalendar> = React.createRef();

  const renderEventContent = (eventInfo: eventInfoType, editable:boolean) => {
    let classFCEvent = "fc-content";
    if (editable){
      classFCEvent = classFCEvent + "fc-event fc-event-draggable";
    }
    //aggiungo all'evento il pulsante per la rimozione se il calendario è editabile e l'evento cancellabile
    let buttonRemove;
    let apiUrl = '/api/rest/v4?endpoint=reperibilitycalendar%2F'+eventInfo.event.id;

    if (editable && eventInfo.event._def.ui.classNames?.includes("removable")){
        buttonRemove = (
                         <ButtonRemoveEvent event={eventInfo.event} onDelete={removeEventFromCalendar} apiUrl={apiUrl}/>
                       );
    }

    return (
        <>
          <div className={classFCEvent}
          id={eventInfo.event.personReperibilityDayId}
                  key={eventInfo.event.personId}
                          style={{color:eventInfo.event.textColor, backgroundColor: eventInfo.event.borderColor, borderColor:eventInfo.event.borderColor}}
                          color={eventInfo.event.eventColor}>
          <span className="fc-time"></span>
          <span className="fc-title" style={{whiteSpace: "normal"}}>{eventInfo.event.title}</span>
          {buttonRemove}
          </div>
        </>
    )
  }

const removeEventFromCalendar = (eventId) => {
    setCalendarEvents((prevEvents) => {
    const updatedEvents = prevEvents.filter((e) => e.id !== eventId);
    setIsUpdating(false);
    setComponentDidMountExecuted(false);
    setReloadTrigger((prev) => prev + 1);
    return updatedEvents;
  });

};

  useEffect(() => {
    if (startDate && endDate) {
      if (!isUpdating) {
          setIsUpdating(true);

          if (!componentDidMountExecuted) {
            const fetchData = async () => {
              setComponentDidMountExecuted(true);

              await callAPI(startDate, endDate, reperibilityId, setReperibilities, setReperibilityId, setCalendarEvents, setReperibilityWorkers, setRecap);

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
  }, [startDate, endDate, reperibilityId, reloadTrigger]);

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
      const calendarApi = eventDropInfo.view.calendar;

      let personId = eventDropInfo.event.id;
      let start = eventDropInfo.event.startStr;

        const tempEvent = eventDropInfo.event;
        tempEvent.remove();

      const parameters = "reperibility="+reperibilityId+"&date="+start+"&personId="+personId;
      const session = await getSession() as CustomSession;
      let accessToken = session ? session.accessToken : null;

      const url = '/api/rest/v4?endpoint=reperibilitycalendar';

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
        toast.success("Reperibilità salvata con successo!");

        setReloadTrigger((prev) => prev + 1);
        setIsUpdating(false);
        setComponentDidMountExecuted(false);
        if (calendarApi) {
          calendarApi.removeAllEvents();
          calendarApi.refetchEvents();
        }
      } catch (error) {
        console.error("[Reperibilities] Errore nella chiamata API:", url," >>>> ",error);
      }
  };

  const handleEventDrop = async (eventDropInfo:any) => {
      const newStartDate = new Date(eventDropInfo.oldEvent.start);
      newStartDate.setDate(newStartDate.getDate() + eventDropInfo.delta.days);

      let eventId=eventDropInfo.event.id;
      const start = DateUtility.formatDateLocal(newStartDate);
      const parameters = "newDate=" + start;
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
                                         }
                                     });
          if (!response.ok) {
            throw new Error("Errore nel salvataggio dati handleEventNew");
          }
          toast.success("Turno modificato con successo!");
          setIsUpdating(false);
          setComponentDidMountExecuted(false);
          setReloadTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("[Reperibilities] Errore nella chiamata API:", url," >>>> ",error);
      }
  };


  let apiUrl = "/api/rest/v4?endpoint=reperibilitycalendar%2Fshow";

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
                  <DropdownReperibilityType onChange={handleDropdownChange} apiUrl={apiUrl} />
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
                            text: 'Next',
                            click: handleNextButtonClick,
                          },
                          prev: {
                                  text: 'Prev',
                                  click: handlePrevButtonClick,
                                },
                        }}
              initialView='dayGridMonth'
              dayHeaderFormat={{ weekday: 'long' }}
              editable={reperibilities.editable}
              eventStartEditable={reperibilities.editable}
              eventDurationEditable={reperibilities.editable}
              droppable={true}
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
              eventContent={(arg) => renderEventContent(arg, reperibilities.editable)}
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
