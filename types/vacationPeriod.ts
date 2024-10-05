export type VacationPeriod = {
    /**
     * Id univoco
     * @type {number}
     * @memberof VacationPeriod
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof VacationPeriod
     */
    vacationCode?: string;
    /**
     *
     * @type {Date}
     * @memberof VacationPeriod
     */
    beginDate?: Date;
    /**
     *
     * @type {Date}
     * @memberof VacationPeriod
     */
    endDate?: Date;

}