import { VacationSummary } from './vacationSummary';

export type PersonVacationSummary = {
    /**
     * 
     * @type {number}
     * @memberof PersonVacationSummary
     */
    year?: number;
    /**
     * 
     * @type {number}
     * @memberof PersonVacationSummary
     */
    contractId?: number;
    /**
     * 
     * @type {string}
     * @memberof PersonVacationSummary
     */
    typeSummary?: string;
    /**
     * 
     * @type {VacationSummary}
     * @memberof PersonVacationSummary
     */
    vacationSummary: VacationSummary;
}
