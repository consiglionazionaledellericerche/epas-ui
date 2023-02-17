import { GroupAbsenceType } from "./groupAbsenceType"

export type AbsencePeriod = {
    personId: number
    from: Date
    to: Date
    takeAmountType: string
    groupAbsenceType: GroupAbsenceType
    containsCriticalErrors: boolean
    takableWithLimit: boolean
    periodTakableAmount: number
    remainingAmount: number
}