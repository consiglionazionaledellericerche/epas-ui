import { VacationCode } from "./vacationCode"
import { GroupAbsenceType } from "./groupAbsenceType"
import { DayInPeriod } from "./dayInPeriod"
import { PersonShowTerse } from "./personShowTerse"

export type AbsencePeriodTerse = {
   /**
     * 
     * @type {PersonShowTerse}
     * @memberof AbsencePeriodTerse
     */
    person?: PersonShowTerse;
    /**
     * 
     * @type {Date}
     * @memberof AbsencePeriodTerse
     */
    from?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbsencePeriodTerse
     */
    to?: Date;
    /**
     * 
     * @type {VacationCode}
     * @memberof AbsencePeriodTerse
     */
    vacationCode?: VacationCode;
    /**
     * 
     * @type {string}
     * @memberof AbsencePeriodTerse
     */
    takeAmountType?: string;
    /**
     * 
     * @type {GroupAbsenceType}
     * @memberof AbsencePeriodTerse
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     * 
     * @type {boolean}
     * @memberof AbsencePeriodTerse
     */
    takableWithLimit?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbsencePeriodTerse
     */
    periodTakableAmount?: number;
    /**
     * 
     * @type {number}
     * @memberof AbsencePeriodTerse
     */
    remainingAmount?: number;
    /**
     * 
     * @type {{ [key: string]: DayInPeriod; }}
     * @memberof AbsencePeriodTerse
     */
    daysInPeriod?: { [key: string]: DayInPeriod; };
}