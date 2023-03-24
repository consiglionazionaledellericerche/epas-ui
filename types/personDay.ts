import { Absence } from "./absence"

export type PersonDay = {
    absences: Absence[]
    approvedOnHoliday: number
    approvedOutOpening: number
    consideredExitingNow: boolean
    date: Date
    decurtedMeal: number
    difference: number
    holiday: boolean
    future: boolean
    id: number
    justifiedTimeBetweenZones: number
    justifiedTimeMeal: number
    justifiedTimeNoMeal: number
    onHoliday: number
    outOpening: number
    personId: number
    progressive: number
    stampingTime: number
    ticketAvailable: boolean
    ticketForcedByAdmin: boolean
    timeAtWork: number
    workingInAnotherPlace: boolean
    workingTimeInMission: number

}