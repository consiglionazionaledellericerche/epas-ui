import {VacationPeriod} from "./vacationPeriod"

export type Contract = {
    id : number
    perseoId : string
    externalId : string
  
    /**
     * Patch per gestire i contratti con dati mancanti da dcp. E' true unicamente per segnalare tempo
     * determinato senza data fine specificata.
     */
    isTemporaryMissing : boolean
  
    /*
     * Quando viene valorizzata la sourceDateResidual, deve essere valorizzata
     * anche la sourceDateMealTicket
     */
    sourceDateResidual : Date
    sourceDateVacation : Date
    sourceDateMealTicket : Date
    sourceDateRecoveryDay : Date
    sourceByAdmin : boolean
  
    sourceVacationLastYearUsed : number
    sourceVacationCurrentYearUsed : number
  
    sourcePermissionUsed : number
  
    // Valore puramente indicativo per impedire che vengano inseriti i riposi compensativi in minuti
    sourceRecoveryDayUsed : number
    sourceRemainingMinutesLastYear : number
    sourceRemainingMinutesCurrentYear : number
    sourceRemainingMealTicket : number
  
    //data di termine contratto in casi di licenziamento, pensione, morte, ecc ecc...
    endContract : Date

    vacationPeriods: VacationPeriod[]
}