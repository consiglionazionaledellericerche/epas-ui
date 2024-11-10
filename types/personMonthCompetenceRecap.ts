import { ContractShow } from "./contractShow"

export type PersonMonthCompetenceRecap = {
    /**
     * 
     * @type {ContractShow}
     * @memberof PersonMonthCompetenceRecap
     */
    contract?: ContractShow;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    year?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    month?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    holidaysAvailability?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    weekDayAvailability?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    daylightWorkingDaysOvertime?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    daylightholidaysOvertime?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    ordinaryShift?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    nightShift?: number;
    /**
     *
     * @type {number}
     * @memberof PersonMonthCompetenceRecap
     */
    progressivoFinalePositivoMese?: number;
}