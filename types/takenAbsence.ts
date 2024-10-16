import { AbsenceShowTerse } from "./absenceShowTerse"

export interface TakenAbsence {
    /**
     *
     * @type {AbsenceShowTerse}
     * @memberof TakenAbsence
     */
    absence?: AbsenceShowTerse;
    /**
     *
     * @type {string}
     * @memberof TakenAbsence
     */
    amountType?: string;
    /**
     *
     * @type {number}
     * @memberof TakenAbsence
     */
    periodTakableTotal?: number;
    /**
     *
     * @type {number}
     * @memberof TakenAbsence
     */
    periodTakenBefore?: number;
    /**
     *
     * @type {number}
     * @memberof TakenAbsence
     */
    takenAmount?: number;
    /**
     *
     * @type {boolean}
     * @memberof TakenAbsence
     */
    beforeInitialization?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof TakenAbsence
     */
    toInsert?: boolean;
}
