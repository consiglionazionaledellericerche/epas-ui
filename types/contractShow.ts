import {VacationPeriod} from "./vacationPeriod"

export type ContractShow = {
    /**
     * Data di inizio del contratto
     * @type {Date}
     * @memberof ContractShow
     */
    beginDate?: Date;
    /**
     * Data di scadenza del contratto
     * @type {Date}
     * @memberof ContractShow
     */
    endDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContractShow
     */
    endContract?: Date;
    /**
     * Id esterno utilizzato per la sincronizzazione con l'anagrafica CNR
     * @type {string}
     * @memberof ContractShow
     */
    perseoId?: string;
    /**
     * Id esterno utilizzato per la sincronizzazione con altre anagrafiche
     * @type {string}
     * @memberof ContractShow
     */
    externalId?: string;
    /**
     * Contratto con gestione delle busta paga (ex. true per i dipendenti CNR
     * @type {boolean}
     * @memberof ContractShow
     */
    onCertificate?: boolean;
    /**
     * Id del contratto
     * @type {number}
     * @memberof ContractShow
     */
    id?: number;
    /**
     * Id della persona associata al contratto
     * @type {number}
     * @memberof ContractShow
     */
    personId?: number;
    /**
     * 
     * @type {Date}
     * @memberof ContractShow
     */
    sourceDateResidual?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContractShow
     */
    sourceDateVacation?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContractShow
     */
    sourceDateMealTicket?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContractShow
     */
    sourceDateRecoveryDay?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof ContractShow
     */
    sourceByAdmin?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourceVacationLastYearUsed?: number;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourceVacationCurrentYearUsed?: number;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourcePermissionUsed?: number;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourceRecoveryDayUsed?: number;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourceRemainingMinutesLastYear?: number;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourceRemainingMinutesCurrentYear?: number;
    /**
     * 
     * @type {number}
     * @memberof ContractShow
     */
    sourceRemainingMealTicket?: number;
    /**
     * 
     * @type {Array<VacationPeriod>}
     * @memberof ContractShow
     */
    vacationPeriods?: Array<VacationPeriod>;
    /**
     * 
     * @type {boolean}
     * @memberof ContractShow
     */
    temporaryMissing?: boolean;

}