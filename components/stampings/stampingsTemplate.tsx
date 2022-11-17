import { PersonDayRecap } from "../../types/personDayRecap";
import {v4 as uuidv4} from 'uuid';

interface StampingTemplatesProps {
    personDayRecap: PersonDayRecap
}

const StampingsTemplate: React.FC<StampingTemplatesProps> = ({
    personDayRecap
  }) => {

    let colorMap = new Map<string, string>(
        [["in" , "default-left"],
        ["out", "default-right"],
        ["warn" , "warn"]
    ])

    return (
        <>
        {personDayRecap.stampingTemplates.map((stampingTemplate, index) => (
            <td key={uuidv4()} 
                className={`position${stampingTemplate.pairPosition} stamping ${colorMap.get(stampingTemplate.colour)}`}>
                {stampingTemplate.hour}
            </td>
        ))}
        </>
    )
}

export default StampingsTemplate