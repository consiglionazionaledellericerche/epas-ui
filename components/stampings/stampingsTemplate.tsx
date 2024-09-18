import { PersonDayRecap } from "../../types/personDayRecap";
import {v4 as uuidv4} from 'uuid';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface StampingTemplatesProps {
    personDayRecap: PersonDayRecap;
    setEditModalParam: (id:number) => void;
    canEditStampings: boolean;
}

const StampingsTemplate: React.FC<StampingTemplatesProps> = ({
    personDayRecap,
    setEditModalParam,
    canEditStampings
  }) => {


  const renderPopover = (props, stampingTemplate) => (
      <Popover id="popover-basic" {...props}>
        <Popover.Body>
          {stampingTemplate.stamping?.stampType && (
            <p><strong>{stampingTemplate.stamping.stampType.identifier} </strong>{stampingTemplate.stamping.stampType.description}</p>
          )}
          <ul>
            {stampingTemplate.stampModificationTypes.map((smt) =>
              smt.code ? <li key={uuidv4()}>{smt.code}</li> : null
            )}
          </ul>
          {stampingTemplate.stamping.place && (
                    <p><strong>Luogo:</strong> <em>{stampingTemplate.stamping.place}</em></p>
                  )}
          {stampingTemplate.stamping.reason && (
                    <p><strong>Motivazione:</strong> <em>{stampingTemplate.stamping.reason}</em></p>
                  )}
          {stampingTemplate.stamping.note && (
                    <p><strong>note:</strong> <em>{stampingTemplate.stamping.note}</em></p>
                  )}
        </Popover.Body>
      </Popover>
    );

    let colorMap = new Map<string, string>(
        [["in" , "default-left"],
        ["out", "default-right"],
        ["warn" , "warn"]
    ])
    return (
      <>
        {personDayRecap.stampingTemplates.map((stampingTemplate, index) => (
          stampingTemplate.showPopover ? (
            <OverlayTrigger
              key={uuidv4()}
              trigger={['hover', 'focus']}
              placement="top"
              overlay={(props) => renderPopover(props, stampingTemplate)}
            >
              <td
                className={`position${stampingTemplate.pairPosition} stamping ${colorMap.get(stampingTemplate.colour)}`}
              >
                {canEditStampings ? (<a
                                     id="new-stamping"
                                     data-async-modal="#defaultModal"
                                     href="#"
                                     onClick={() => setEditModalParam(stampingTemplate.id)}>
                                     {stampingTemplate.hour}
                                   </a>): stampingTemplate.hour
                }
                {stampingTemplate.stamping?.stampType ? (
                  <strong>&nbsp;{stampingTemplate.stamping.stampType.identifier}</strong>
                ) : null}&nbsp;
                {stampingTemplate.stampModificationTypes.map((smt) => (
                  smt.code ? <strong key={uuidv4()}>{smt.code}</strong> : ''
                ))}
              </td>
            </OverlayTrigger>
          ) : (
            <td
              key={uuidv4()}
              className={`position${stampingTemplate.pairPosition} stamping ${colorMap.get(stampingTemplate.colour)}`}
            >
                {canEditStampings ? (<a
                                     id="new-stamping"
                                     data-async-modal="#defaultModal"
                                     href="#"
                                     onClick={() => setEditModalParam(stampingTemplate.id)}>
                                     {stampingTemplate.hour}
                                   </a>): stampingTemplate.hour
                }
                {stampingTemplate.stamping?.stampType ? (
                  <strong>&nbsp;{stampingTemplate.stamping.stampType.identifier}</strong>
                ) : null}
                {stampingTemplate.stampModificationTypes.map((smt) => (
                  smt.code ? <strong key={uuidv4()}>{smt.code}</strong> : ''
                ))}
            </td>
          )
        ))}
      </>
    );

}

export default StampingsTemplate