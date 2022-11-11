import { LocalTimeInterval } from "./localTimeInterval"
import { PersonDay } from "./personDay"
import { StampingTemplate } from "./stampingTemplate"
import { WorkingTimeTypeDay } from "./workingTimeTypeDay"

export type PersonDayRecap = {
    exitingNowCode: string
    firstDay: boolean
    id: number
    ignoreDay: boolean
    lunchInterval: LocalTimeInterval
    mealTicket: string
    note: string[]
    personDay: PersonDay
    personalWorkInterval: LocalTimeInterval
    stampingTemplates: StampingTemplate[]
    workInterval: LocalTimeInterval
    wttd: WorkingTimeTypeDay
}