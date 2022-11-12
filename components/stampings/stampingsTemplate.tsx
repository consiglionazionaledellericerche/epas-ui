import { PersonDayRecap } from "../../types/personDayRecap";

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
            <td key={personDayRecap.personDay.id.toString() + index} 
                className={`position${stampingTemplate.pairPosition} stamping ${colorMap.get(stampingTemplate.colour)}`}>
                {stampingTemplate.hour}
            </td>
        ))}
        </>
    )
}

export default StampingsTemplate