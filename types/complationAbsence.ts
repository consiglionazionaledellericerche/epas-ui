import { AbsenceShowTerse } from "./absenceShowTerse"

export interface ComplationAbsence {
    /**
     * 
     * @type {AbsenceShowTerse}
     * @memberof ComplationAbsence
     */
    absence?: AbsenceShowTerse;
    /**
     * 
     * @type {string}
     * @memberof ComplationAbsence
     */
    amountType?: string;
    /**
     * 
     * @type {number}
     * @memberof ComplationAbsence
     */
    residualComplationBefore?: number;
    /**
     * 
     * @type {number}
     * @memberof ComplationAbsence
     */
    consumedComplation?: number;
    /**
     * 
     * @type {number}
     * @memberof ComplationAbsence
     */
    residualComplationAfter?: number;
}