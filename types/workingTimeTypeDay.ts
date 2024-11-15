import { WorkingTimeType } from "./workingTimeType"

export type WorkingTimeTypeDay = {
    dayOfWeek: number
    workingTime: number
    holiday: boolean
    mealTicketTime: number
    breakTicketTime: number
    ticketAfternoonThreshold: number
    ticketAfternoonWorkingTime: number
    workingTimeType: WorkingTimeType
}