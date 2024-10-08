import { ContractMonth } from "./contractMonth"

export type PersonMonth = {
    /**
     *
     * @type {ContractMonthRecap}
     * @memberof PersonMonths
     */
    value?: ContractMonth;
    /**
     *
     * @type {ContractMonthRecap}
     * @memberof PersonMonths
     */
    previousRecap?: ContractMonth;
    /**
     *
     * @type {ContractMonthRecap}
     * @memberof PersonMonths
     */
    previousRecapInYear?: ContractMonth;
    /**
     *
     * @type {boolean}
     * @memberof PersonMonths
     */
    hasResidualInitInYearMonth?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof PersonMonths
     */
    hasResidualLastYear?: boolean;
    /**
     *
     * @type {number}
     * @memberof PersonMonths
     */
    getResidualLastYearInit?: number;
}