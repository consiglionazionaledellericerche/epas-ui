import React from "react";
import { Col, Row } from 'react-bootstrap';
import { ReperibilityEvent } from "../../types/reperibilityEvent";

interface ReperibilityWorkersProps {
    reperibilityWorkers: ReperibilityEvent[];
}
//              personreperibilitydayid={event.personReperibilityDayId}
//              personid={event.personId}

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
              id={event.personId?.toString()}
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