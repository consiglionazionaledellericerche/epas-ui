import React, { useEffect, useState } from "react";
import { getSession } from 'next-auth/react';
import { CustomSession } from '../../types/customSession';
import { Spinner } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Link from 'next/link';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateUtility from "../../utils/dateUtility";
import { AbsenceShow } from "../../types/absenceShow";
import { useTranslations } from 'next-intl';

library.add(faPaperPlane);

interface AbsencePopOverProps {
  day: number | string;
  absElem: any;
  showGroup: boolean;
}

interface PopoverProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

const renderPopover = (
  props: PopoverProps,
  absElem: any,
  data: AbsenceShow,
  translation: any,
  showGroup: boolean
) => {

  const groupList = data.replacingAbsencesGroup?.map((group: any) => (
  <>
    <span key={group.id}>
      <span>{group.description}</span>
      <Link
        href={{
          pathname: '/absencesGroups',
          query: {
            groupAbsenceTypeId: group.id,
            personId: data.personDay.personId,
            from: DateUtility.formatDateLocal(data.date),
          },
        }}
        passHref
      >
        &nbsp;&nbsp;Riepilogo <i className="fa fa-external-link" aria-hidden="true"></i>
      </Link>
    </span>
    </>
  ));

  let justifiedTimeContent = null;

  if (data.justifiedTime && data.justifiedTime > 0) {
    justifiedTimeContent = (
      <>
        <strong>Tempo Specificato:</strong> {DateUtility.fromMinuteToHourMinute(data.justifiedTime)}
        <br />
      </>
    );
  }

  let justifiedBehaviours = null;
  if (data.absenceType?.justifiedBehaviours) {
    justifiedBehaviours = (
      <>
        <br/><strong>Comportamenti speciali:</strong><br/>
        {data.absenceType.justifiedBehaviours.map((justifiedBehaviour: any, index: number) => (
          <span key={index}>
            {translation(justifiedBehaviour.justifiedBehaviour)} - {justifiedBehaviour.printData || ""}
          </span>
        ))}
        <br/>
      </>
    );
  }

  let nothingJustified = null;
  if (data.nothingJustified) {
    nothingJustified = (
      <>
        <strong>Tempo Giustificato:</strong> Questo codice non giustifica alcun orario.
        <br />
      </>
    );
  }

  let note = null;
  if (data.note) {
    note = (
      <>
        <strong>Note:</strong> {data.note}
        <br />
      </>
    );
  }

  return (
    <Popover id="popover-absencecode" {...props}>
      <Popover.Body>
        <p>
          <span className="tooltip-icon-black">
            <FontAwesomeIcon icon={faPaperPlane}/>
          </span>
          <strong className="text-success">
            &nbsp;&nbsp;Il codice {absElem.code} verrà inviato ad attestati.
          </strong>
        </p>
        <ul className="list-group">
          <li key={uuidv4()} className="list-group-item">
            <strong>Codice:</strong> {absElem.code}
            <br />
            <strong>Descrizione:</strong> {data.absenceType?.description}
            <br />
            <strong>Data:</strong> {DateUtility.formatDate(data.date)}
            <br />
            <strong>Tipo Giustificazione:</strong> {translation(data.justifiedType)}
            <br />
            {nothingJustified}
            {justifiedBehaviours}
            {justifiedTimeContent}
            {note}
          </li>
          {showGroup && groupList && (
            <li key={uuidv4()} className="list-group-item">
              <strong>Gruppo:</strong>
              <br />
              {groupList}
            </li>
          )}
        </ul>
      </Popover.Body>
    </Popover>
  );
};

const AbsencePopOver: React.FC<AbsencePopOverProps> = ({
  day,
  absElem,
  showGroup
}) => {
  const [data, setData] = useState<AbsenceShow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations('Message');

  const [showPopover, setShowPopover] = useState(false);

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setShowPopover(false), 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (absElem && 'absenceType' in absElem) {
        setData(absElem);
        setIsLoading(false);
      } else {
        const session = await getSession() as CustomSession;
        let accessToken = session ? session.accessToken : null;

        try {
          const idItem = absElem.id;
//           const response = await fetch(`/api/rest/v4/absences/${idItem}`, {
//             method: 'GET',
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
          const response = await fetch(`/api/rest/v4?endpoint=absences%2F${idItem}`,
            { method: 'GET' });
//             .then(response => response.json())
//             .then(data => console.log(data))
//             .catch(error => console.error(error));

          if (!response.ok) {
            throw new Error('Errore durante la richiesta API');
          }

          const data: AbsenceShow = await response.json();
          setData(data);
        } catch (error) {
          setError(error as Error);
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [absElem]);

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error || !data) {
    return <div>Errore!</div>;
  }

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="top"
      show={showPopover}
      overlay={(props) => renderPopover(props, absElem, data, t, showGroup)}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {absElem.code}
      </div>
    </OverlayTrigger>
  );
};

export default AbsencePopOver;
