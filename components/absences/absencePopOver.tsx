import React from "react";
import { Spinner } from 'react-bootstrap'
import { Tooltip } from 'react-tooltip'
import Link from 'next/link';
import 'react-tooltip/dist/react-tooltip.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRequest } from "../../request/useRequest";
import messages from '../../public/data/messages.json';
import DateUtility from "../../utils/dateUtility";
import { useState } from 'react';

library.add(faPaperPlane);


interface AbsencePopOverProps {
    absencesRecap;
    day: number;
    showGroup: boolean;
    setShowTooltip;
    setTooltipContent;
    item;
}

const AbsencePopOver: React.FC<AbsencePopOverProps> = ({
    absencesRecap,
    day,
    showGroup,
    setShowTooltip,
    setTooltipContent,
    item
  }) => {

  const [isOpen, setIsOpen] = useState(false)


    let absenceCode;
    let absencejustifiedTime;
    let absenceDescription;
    let absenceData;
    let absenceNoteElem;
    let absenceJustifiedType;
    let absenceJustifiedTimeElem;
    let nothingJustifiedElem;

    let hasGroupsElem;

    absenceCode = item.code;
    absencejustifiedTime = item.justifiedTime;
    const {data, error} = useRequest(`/absences/${item.id}`);
    if (error) return (<div>Errore!</div>);
    if (!data) return <React.Suspense fallback={<Spinner />} />

    absenceDescription = data.absenceType.description;
    absenceData = DateUtility.formatDate(data.date);
    absenceJustifiedType = messages[data.justifiedType];

    if (data.justifiedTime) {
      absenceJustifiedTimeElem = <>
                                <strong>Tipo Giustificazione</strong> {DateUtility.fromMinuteToHourMinute(data.justifiedTime)} <br/>
                                </>
    }

    if (data.nothingJustified) {
      nothingJustifiedElem = <>
                             <strong>Tempo Giustificato</strong> Questo codice non giustifica alcun orario.<br/>
                             </>
    }

    if (data.note) {
      absenceNoteElem = <>
                        <strong>Note</strong> {data.note}<br/>
                        </>
    }

    if (data.absenceType.hasGroups && showGroup) {
      let groupVerified = false
      let description = ''
      let groupVerifiedLink = ''
      let rowRes = data.replacingAbsencesGroup?.map((replacingGroup) => {
                                        let query = {
                                                      pathname: '/absencesGroups',
                                                      query: { groupAbsenceTypeId: replacingGroup.id, personId: data.personDay.personId, from:DateUtility.formatDateLocal(data.date) }
                                                    };
                                        groupVerified = true;
                                        description = <>
                                                      <span>{replacingGroup.description}</span>
                                                        <Link href={query}  passHref={true} legacyBehavior={true}>
                                                          <a> Riepilogo <i className="fa fa-external-link" aria-hidden="true"></i></a>
                                                        </Link>
                                                      </>

                                      !groupVerified ?
                                        groupVerifiedLink = <>
                                                              <Link href={query}  passHref={true} legacyBehavior={true}>
                                                                <a> Riepilogo <i className="fa fa-external-link" aria-hidden="true"></i></a>
                                                              </Link>
                                                            </>
                                       : groupVerifiedLink = ""

                                      return (  <span key="{`$row-res-${dday.id}`}">
                                                {description}
                                                {groupVerifiedLink}
                                                </span>
                                      )
                      })
      hasGroupsElem = <>
                        <li key={`group-${item.code}-${day}`} className="list-group-item">
                          <strong>Gruppo</strong><br/>
                          {rowRes}
                        </li>
                      </>
    }


    let contentTooltip = <>
                        <p>
                         <span className="tooltip-icon-black"><FontAwesomeIcon icon={faPaperPlane}/></span>
                         <strong className="text-success"> Il codice {absenceCode} verrà inviato ad attestati.</strong>
                      </p>
                      <ul className="list-group">
                        <li key={`list-group-${absenceCode}-${day}`} className="list-group-item">
                          <strong>Codice</strong> <strong>{absenceCode}</strong><br/>
                          <strong>Descrizione</strong> {absenceDescription}<br/>
                          <strong>Data</strong> {absenceData}<br/>
                          <strong>Tipo Giustificazione</strong> {absenceJustifiedType} <br/>
                          {nothingJustifiedElem}
                          {absenceJustifiedTimeElem}
                          {absenceNoteElem}
                        </li>
                        {hasGroupsElem}
                      </ul>
                      </>

    if (!absenceCode)
    { return (<></>)}

       return(<>
             <div data-tooltip-id="tooltip-absencecode" onMouseEnter={() => {
                                                                        setTooltipContent(contentTooltip);
                                                                        setShowTooltip(true);
                                                                      }}
                                                                      onClick={() => { setShowTooltip(false);}}>
           {absenceCode}
            </div>
            </>
    );
}

export default AbsencePopOver