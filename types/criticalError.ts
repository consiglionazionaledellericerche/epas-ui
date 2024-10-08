import { GroupAbsenceType } from "./groupAbsenceType"
import { AbsenceType } from "./absenceType"
import { AbsenceShow } from "./absenceShow"

export type CriticalError = {
    /**
     *
     * @type {string}
     * @memberof CriticalError
     */
    criticalProblem?: string;
    /**
     *
     * @type {Date}
     * @memberof CriticalError
     */
    date?: Date;
    /**
     *
     * @type {GroupAbsenceType}
     * @memberof CriticalError
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     *
     * @type {string}
     * @memberof CriticalError
     */
    justifiedType?: string;
    /**
     *
     * @type {AbsenceType}
     * @memberof CriticalError
     */
    absenceType?: AbsenceType;
    /**
     *
     * @type {AbsenceType}
     * @memberof CriticalError
     */
    conflictingAbsenceType?: AbsenceType;
    /**
     *
     * @type {AbsenceShow}
     * @memberof CriticalError
     */
    absence?: AbsenceShow;

}