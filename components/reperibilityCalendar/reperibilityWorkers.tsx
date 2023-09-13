import React from "react";
import { Col, Row } from 'react-bootstrap';
import messages from '../../public/data/messages.json';

interface ReperibilityWorkersProps {
    reperibilityWorkers;
}

const ReperibilityWorkers: React.FC<ReperibilityWorkersProps> = ({
    reperibilityWorkers
  }) => {
    return(
    <>
      <Col md={2}>
        <div id="external-events" style={{
                                             padding: "10px",
                                             width: "80%",
                                             height: "auto",
                                             maxHeight: "-webkit-fill-available"
                                           }}
                                         >
        <h4> Reperibili</h4>
        <ul className="list-group">
          {reperibilityWorkers.map(event => (
            <li
              className={event.className}
              title={event.title}
              id={event.personId}
              personreperibilitydayid={event.personReperibilityDayId}
              personid={event.personId}
              key={event.personId}
              style={{color:event.textColor, backgroundColor: event.color, borderColor:event.borderColor}}
              color={event.eventColor}
            >
              {event.title}
            </li>
          ))}
        </ul>
        </div>
      </Col>
     </>
    );
    }

export default ReperibilityWorkers