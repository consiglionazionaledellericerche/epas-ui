export type VacationPeriod = {
    /**
     * Id univoco
     * @type {number}
     * @memberof VacationPeriodDto
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof VacationPeriodDto
     */
    vacationCode?: string;
    /**
     *
     * @type {Date}
     * @memberof VacationPeriodDto
     */
    beginDate?: Date;
    /**
     *
     * @type {Date}
     * @memberof VacationPeriodDto
     */
    endDate?: Date;

}