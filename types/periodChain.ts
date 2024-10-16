import { GroupAbsenceType } from "./groupAbsenceType"
import { AbsencePeriodTerse } from "./absencePeriodTerse"

export type PeriodChain = {
    /**
     * 
     * @type {GroupAbsenceType}
     * @memberof PeriodChain
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     * 
     * @type {Date}
     * @memberof PeriodChain
     */
    date?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PeriodChain
     */
    from?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PeriodChain
     */
    to?: Date;
    /**
     * 
     * @type {Array<AbsencePeriodTerse>}
     * @memberof PeriodChain
     */
    periods?: Array<AbsencePeriodTerse>;
}