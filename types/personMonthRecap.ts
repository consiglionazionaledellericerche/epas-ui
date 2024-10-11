import { PersonShow } from "./personShow"

export type PersonMonthRecap = {
    /**
     * 
     * @type {PersonShow}
     * @memberof PersonMonthRecap
     */
    person?: PersonShow;
    /**
     *
     * @type {number}
     * @memberof PersonMonthRecap
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof PersonMonthRecap
     */
    year?: number;
    /**
     * 
     * @type {number}
     * @memberof PersonMonthRecap
     */
    month?: number;
    /**
     * 
     * @type {Date}
     * @memberof PersonMonthRecap
     */
    fromDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PersonMonthRecap
     */
    toDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof PersonMonthRecap
     */
    trainingHours?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PersonMonthRecap
     */
    hoursApproved?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof PersonMonthRecap
     */
    editable?: boolean;
}