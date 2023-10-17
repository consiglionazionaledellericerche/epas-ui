import { GroupAbsenceType } from "./groupAbsenceType"
import { PersonShowTerse } from './personShowTerse';
import { VacationCode } from './vacationCode';

export type AbsenceSubPeriod = {
    /**
     *
     * @type {PersonShowTerse}
     * @memberof AbsenceSubPeriod
     */
    person?: PersonShowTerse;
    /**
     *
     * @type {Date}
     * @memberof AbsenceSubPeriod
     */
    from?: Date;
    /**
     *
     * @type {Date}
     * @memberof AbsenceSubPeriod
     */
    to?: Date;
    /**
     *
     * @type {VacationCode}
     * @memberof AbsenceSubPeriod
     */
    vacationCode: VacationCode;
    /**
     *
     * @type {string}
     * @memberof AbsenceSubPeriod
     */
    takeAmountType?: string;
    /**
     *
     * @type {GroupAbsenceType}
     * @memberof AbsenceSubPeriod
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceSubPeriod
     */
    takableWithLimit?: boolean;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    periodTakableAmount?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    remainingAmount?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subAmount?: number;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceSubPeriod
     */
    subFixedPostPartum?: boolean;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subAmountBeforeFixedPostPartum?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subTotalAmount?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subDayProgression?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subDayPostPartum?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subDayPostPartumProgression?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    subDayToFixPostPartum?: number;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceSubPeriod
     */
    subAccrued?: boolean;
    /**
     *
     * @type {Date}
     * @memberof AbsenceSubPeriod
     */
    contractEndFirstYearInPeriod?: Date;
    /**
     *
     * @type {number}
     * @memberof AbsenceSubPeriod
     */
    dayInInterval?: number;
}