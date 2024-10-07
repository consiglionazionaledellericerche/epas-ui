import { VacationSummary } from "./vacationSummary"
import { Contract } from "./contract"

export type VacationSituation = {
    /**
     *
     * @type {number}
     * @memberof VacationSituation
     */
    personId?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSituation
     */
    year?: number;
    /**
     *
     * @type {Date}
     * @memberof VacationSituation
     */
    date?: Date;
    /**
     *
     * @type {ContractShow}
     * @memberof VacationSituation
     */
    contract: Contract;
    /**
     *
     * @type {VacationSummaryTerse}
     * @memberof VacationSituation
     */
    lastYear: VacationSummary;
    /**
     *
     * @type {VacationSummaryTerse}
     * @memberof VacationSituation
     */
    currentYear: VacationSummary;
    /**
     *
     * @type {VacationSummaryTerse}
     * @memberof VacationSituation
     */
    permissions: VacationSummary;}