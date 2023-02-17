import { GroupAbsenceType } from "./groupAbsenceType"
import { AbsencePeriod } from "./absencePeriod"

export type PeriodChain = {
    date: Date
    from: Date
    to: Date
    groupAbsenceType: GroupAbsenceType
    periods: AbsencePeriod[]
}