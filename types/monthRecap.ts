import { PersonDayRecap } from "./personDayRecap"

export type MonthRecap = {
    personId: number
    year: number
    month: number
    currentMonth: boolean
    canEditStampings: boolean
    numberOfCompensatoryRestUntilToday: number
    basedWorkingDays: number
    totalWorkingTime: number
    positiveResidualInMonth: number
    daysRecap: PersonDayRecap[]
    //tipo da creare
    stampModificationTypeSet: object[]
    //tipo da creare
    stampTypeSet: object[]
    //tipo da creare
    absenceCodeMap: object
    //tipo da creare
    absenceList: object[]
    absenceToRecoverYet: boolean
    //tipo da creare
    absencesToRecoverList: object[]
    numberOfInOut: number
}