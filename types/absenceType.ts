export type AbsenceType = {
    /**
     * Id univoco
     * @type {number}
     * @memberof AbsenceType
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof AbsenceType
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof AbsenceType
     */
    description?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceType
     */
    hasGroups?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbsenceType
     */
    numberOfDays?: number;
}