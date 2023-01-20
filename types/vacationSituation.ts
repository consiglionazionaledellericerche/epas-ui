import { VacationSummary } from "./vacationSummary"

export type VacationSituation = {
    personId: number
    year: number
    date: Date
    lastYear: VacationSummary
    currentYear: VacationSummary
    permissions: VacationSummary
}