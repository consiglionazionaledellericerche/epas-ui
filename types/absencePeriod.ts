import { GroupAbsenceType } from "./groupAbsenceType"
import { AbsenceSubPeriod } from "./absenceSubPeriod"
import { VacationCode } from "./vacationCode"

export type AbsencePeriod = {
    /**
     * 
     * @type {Date}
     * @memberof AbsencePeriod
     */
    from?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbsencePeriod
     */
    to?: Date;
    /**
     * 
     * @type {VacationCode}
     * @memberof AbsencePeriod
     */
    vacationCode?: VacationCode;
    /**
     * 
     * @type {string}
     * @memberof AbsencePeriod
     */
    takeAmountType?: string;
    /**
     * 
     * @type {GroupAbsenceType}
     * @memberof AbsencePeriod
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     * 
     * @type {boolean}
     * @memberof AbsencePeriod
     */
    takableWithLimit?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbsencePeriod
     */
    periodTakableAmount?: number;
    /**
     * 
     * @type {number}
     * @memberof AbsencePeriod
     */
    remainingAmount?: number;
    /**
     * 
     * @type {Array<AbsenceSubPeriod>}
     * @memberof AbsencePeriod
     */
    subPeriods?: Array<AbsenceSubPeriod>;
}