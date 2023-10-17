import { VacationSummary } from "./vacationSummary"
import { Contract } from "./contract"

export type VacationSituation = {
    /**
     *
     * @type {number}
     * @memberof VacationSituationDto
     */
    personId?: number;
    /**
     *
     * @type {number}
     * @memberof VacationSituationDto
     */
    year?: number;
    /**
     *
     * @type {Date}
     * @memberof VacationSituationDto
     */
    date?: Date;
    /**
     *
     * @type {ContractShowDto}
     * @memberof VacationSituationDto
     */
    contract: Contract;
    /**
     *
     * @type {VacationSummaryTerseDto}
     * @memberof VacationSituationDto
     */
    lastYear: VacationSummary;
    /**
     *
     * @type {VacationSummaryTerseDto}
     * @memberof VacationSituationDto
     */
    currentYear: VacationSummary;
    /**
     *
     * @type {VacationSummaryTerseDto}
     * @memberof VacationSituationDto
     */
    permissions: VacationSummary;}