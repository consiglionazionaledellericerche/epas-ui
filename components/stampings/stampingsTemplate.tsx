import { PersonDayRecap } from "../../types/personDayRecap";
import {v4 as uuidv4} from 'uuid';

interface StampingTemplatesProps {
    personDayRecap: PersonDayRecap;
    setEditModalParam: (id:number) => void;
}

const StampingsTemplate: React.FC<StampingTemplatesProps> = ({
    personDayRecap,
    setEditModalParam
  }) => {

    let colorMap = new Map<string, string>(
        [["in" , "default-left"],
        ["out", "default-right"],
        ["warn" , "warn"]
    ])

    return (
        <>
        {personDayRecap.stampingTemplates.map((stampingTemplate, index) => (
            <td key={uuidv4()} className={`position${stampingTemplate.pairPosition} stamping ${colorMap.get(stampingTemplate.colour)}`}>
            <a id="new-stamping" data-async-modal="#defaultModal" href="javascript:void(0)" onClick={() => setEditModalParam(stampingTemplate.id)}>
               {stampingTemplate.hour}
            </a>
            </td>
        ))}
        </>
    )
}

export default StampingsTemplate