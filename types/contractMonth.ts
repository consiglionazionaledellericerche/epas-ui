import { Contract } from "./contract"

export type ContractMonth = {
    contract: Contract

    year: number
    month: number
  
    //***************************************************************************/
    // MODULO RECAP ASSENZE
    // **************************************************************************/
    recoveryDayUsed: number        //numeroRiposiCompensativi
  
    //***************************************************************************/
    // * FONTI DELL'ALGORITMO RESIDUI
    // **************************************************************************/
    buoniPastoDaInizializzazione: number
    buoniPastoDalMesePrecedente: number
    buoniPastoConsegnatiNelMese: number
    buoniPastoUsatiNelMese: number
    initResiduoAnnoCorrenteNelMese: number    //per il template (se sourceContract è del mese)
    initMonteOreAnnoPassato: number        //dal precedente recap ma è utile salvarlo
    initMonteOreAnnoCorrente: number    //dal precedente recap ma è utile salvarlo
    progressivoFinaleMese: number            //person day
  
    /**
     * Questo campo ha due scopi: <br> 1) Il progressivo finale positivo da visualizzare nel template.
     * <br> 2) Il tempo disponibile per straordinari. <br> TODO: Siccome i due valori potrebbero
     * differire (esempio turnisti), decidere se splittarli in due campi distinti.
     */
    progressivoFinalePositivoMese: number
    possibileUtilizzareResiduoAnnoPrecedente: boolean
    straordinariMinutiS1Print: number    //per il template
    straordinariMinutiS2Print: number    //per il template
    straordinariMinutiS3Print: number    //per il template
    riposiCompensativiMinutiPrint: number    //per il template
    riposiCompensativiChiusuraEnteMinutiPrint: number    //per il template
    oreLavorate: number                // riepilogo per il template

    //***************************************************************************/
    // DECISIONI DELL'ALGORITMO
    // **************************************************************************/
    progressivoFinaleNegativoMeseImputatoAnnoPassato: number
    progressivoFinaleNegativoMeseImputatoAnnoCorrente: number
    progressivoFinaleNegativoMeseImputatoProgressivoFinalePositivoMese: number
    riposiCompensativiMinutiImputatoAnnoPassato: number
    riposiCompensativiMinutiImputatoAnnoCorrente: number
    riposiCompensativiMinutiImputatoProgressivoFinalePositivoMese: number
    riposiCompensativiChiusuraEnteMinutiImputatoAnnoPassato: number
    riposiCompensativiChiusuraEnteMinutiImputatoAnnoCorrente: number
    riposiCompensativiChiusuraEnteMinutiImputatoProgressivoFinalePositivoMese: number

    remainingMinutesLastYear: number
    remainingMinutesCurrentYear: number
    remainingMealTickets: number //buoniPastoResidui

    qualifica: number 
    straordinarioMinuti: number
    positiveResidualInMonth: number
    hasResidualLastYear: boolean
    residualLastYearInit: number
    hasResidualInitInYearMonth: boolean

    /**
     * Verifica se è l'ultimo mese prima della scadenza del contratto.
     */
    expireInMonth: boolean

    previousRecapInYearPresent : boolean
    previousRecapInYearRemainingMinutesCurrentYear : number

    //Dal contrato
    contractDescription : string
    sourceDateResidual : Date
    sourceDateVacation : Date
    sourceDateMealTicket : Date
    sourceDateRecoveryDay : Date
}