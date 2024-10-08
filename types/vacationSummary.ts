import { AbsencePeriod } from './absencePeriod';
import { AbsenceShow } from './absenceShow';
import { AbsenceSubPeriod } from './absenceSubPeriod';
import { Contract } from './contract';

export type VacationSummary = {
    /**
     *
     * @type {string}
     * @memberof VacationSummary
     */
    type?: string;
    /**
     *
     * @type {ContractBase}
     * @memberof VacationSummary
     */
    contract?: Contract;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    year?: number;
    /**
     *
     * @type {Date}
     * @memberof VacationSummary
     */
    date?: Date;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    total?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    accrued?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    used?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    usableTotal?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    usable?: number;
    /**
     *
     * @type {Date}
     * @memberof VacationSummary
     */
    upperLimit?: Date;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    sourced?: number;
    /**
     *
     * @type {string}
     * @memberof VacationSummary
     */
    title?: string;
    /**
     *
     * @type {Array<AbsenceShow>}
     * @memberof VacationSummary
     */
    absencesUsed?: Array<AbsenceShow>;
    /**
     *
     * @type {Array<AbsenceShow>}
     * @memberof VacationSummary
     */
    postPartum?: Array<AbsenceShow>;
    /**
     *
     * @type {AbsencePeriod}
     * @memberof VacationSummary
     */
    absencePeriod?: AbsencePeriod;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    postPartumSize?: number;
    /**
     *
     * @type {boolean}
     * @memberof VacationSummary
     */
    postPartumisEmpty?: boolean;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    accruedDay?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSummary
     */
    accruedDayTotal?: number;
    /**
     *
     * @type {Array<AbsenceSubPeriod>}
     * @memberof VacationSummary
     */
    absenceSubPeriods?: Array<AbsenceSubPeriod>;

}