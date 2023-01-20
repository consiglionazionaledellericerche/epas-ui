import { VacationSummary } from "./vacationSummary"

export type VacationSummary = {
    type: string
    year: number
    date: Date
    total: number
    accrued: number
    used: number
    usableTotal: number
    usable: number}