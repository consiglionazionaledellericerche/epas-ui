import React from "react";
import { Spinner } from 'react-bootstrap'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRequest } from "../../request/useRequest";
import messages from '../../public/data/messages.json';
import DateUtility from "../../utils/dateUtility";

library.add(faPaperPlane);

interface AbsenceRecapRowProps {
    absencesRecap: Absence[];
    year: integer;
    month: string;
    day: integer;
}

const AbsenceRecapRow: React.FC<CalcAccRowProps> = ({
    absencesRecap,
    year,
    month,
    day
  }) => {

    let dday = day < 10 ? `0${day}` : day;
    const item = absencesRecap.find(item => item.date === `${year}-${month}-${dday}`);
    let absenceCode;
    let absencejustifiedTime;
    let absenceDescription;
    let absenceData;
    let absenceNoteElem;
    let absenceJustifiedType;
    let absenceJustifiedTimeElem;
    let nothingJustifiedElem;

    let hasGroupsElem;

    if (item) {
      absenceCode = item.code;
      absencejustifiedTime = item.justifiedTime;
      const {data, error} = useRequest(`/absences/${item.id}`);
      if (error) return (<div>Impossibile caricare la situazione annuale</div>);
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

      if (data.absenceType.hasGroups) {
        let groupVerified = false
        let description = ''
        let groupVerifiedLink = ''
        let rowRes = data.replacingAbsencesGroup?.map((replacingGroup) => {
                                          groupVerified = true;
                                          description = <>
                                                        <span>{replacingGroup.description}</span>
                                                        <a href="@{AbsenceGroups.groupStatus('groupAbsenceTypeId':group.id, 'personId':_person.id, 'from':_absence.getAbsenceDate().format())}"> Riepilogo <i class="fa fa-external-link" aria-hidden="true"></i></a><br/>
                                                        </>
                        {/* 	            #{secure.check 'AbsenceGroups.edit'} */}
                        {/* 	            <span class="fa-stack fa-lg"><i class="fa fa-paper-plane-o fa-stack-1x"></i></span> */}
                        {/* 	            <strong class="text-success">In questa data il codice di completamento ${replacing.absenceType.certificateCode} verrà inviato ad attestati.</strong> */}
                        {/* 	            #{/secure.check} */}
                                        !groupVerified ?
                                          groupVerifiedLink = <>
                                                              <a href="@{AbsenceGroups.groupStatus('groupAbsenceTypeId':group.id, 'personId':_person.id, 'from':_absence.getAbsenceDate().format())}"> Riepilogo <i class="fa fa-external-link" aria-hidden="true"></i></a>
                                                              </>
                                         : groupVerifiedLink = ""

                                        return (  <>
                                                  {description}
                                                  {groupVerifiedLink}
                                                  </>
                                        )
                        })
        hasGroupsElem = <>
                          <li key={`group-${item.code}`} className="list-group-item">
                            <strong>Gruppo</strong><br/>
                            {rowRes}
                          </li>
                        </>
      }
    }

    return(<>
            <td key={`td-${month}-${dday}`}>
            <div key={`div-${month}-${dday}`} data-tooltip-id={`tip-${month}-${dday}`} data-for={`tip-${month}-${dday}`}>
            {absenceCode}

            </div>
             <Tooltip id={`tip-${month}-${dday}`} className="tooltip-white">
                 	<p>
                     <span className="tooltip-icon-black"><FontAwesomeIcon icon={faPaperPlane}/></span>
                     <strong className="text-success"> Il codice {absenceCode} verrà inviato ad attestati.</strong>
                  </p>
                  <ul className="list-group">
                   	<li key={`list-group-${absenceCode}`} className="list-group-item">
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
             </Tooltip>
            </td>
            </>
    );
}

export default AbsenceRecapRow