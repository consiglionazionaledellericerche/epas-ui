import { LocalTimeInterval } from "./localTimeInterval"
import { PersonDay } from "./personDay"
import { StampingTemplate } from "./stampingTemplate"
import { WorkingTimeTypeDay } from "./workingTimeTypeDay"

export type PersonDayRecap = {
    personDay: PersonDay
    wttd: WorkingTimeTypeDay
    lunchInterval: LocalTimeInterval
    workInterval: LocalTimeInterval
    personalWorkInterval: LocalTimeInterval
    ignoreDay: boolean
    firstDay: boolean
    stampingTemplates: StampingTemplate[]
    mealTicket: string
    exitingNowCode: string
    note: string[]
}