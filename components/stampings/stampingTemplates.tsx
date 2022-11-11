import { PersonDayRecap } from "../../types/personDayRecap";
import { StampingTemplate } from "../../types/stampingTemplate";

interface StampingTemplatesProps {
    personDayRecap: PersonDayRecap
}

const StampingTemplates: React.FC<StampingTemplatesProps> = ({
    personDayRecap
  }) => {
    return (
        <>
        {personDayRecap.stampingTemplates.map((stampingTemplate, index) => (
            <td key={personDayRecap.personDay.id.toString() + index} 
                className="position{stampingTemplate.position}">{stampingTemplate.hour}</td>
        ))}
        </>
    )
}

export default StampingTemplates