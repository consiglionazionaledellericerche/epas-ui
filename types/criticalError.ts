import { GroupAbsenceType } from "./groupAbsenceType"
import { AbsenceType } from "./absenceType"
import { AbsenceShow } from "./absenceShow"

export type CriticalError = {
    /**
     *
     * @type {string}
     * @memberof CriticalErrorDto
     */
    criticalProblem?: string;
    /**
     *
     * @type {Date}
     * @memberof CriticalErrorDto
     */
    date?: Date;
    /**
     *
     * @type {GroupAbsenceTypeDto}
     * @memberof CriticalErrorDto
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     *
     * @type {string}
     * @memberof CriticalErrorDto
     */
    justifiedType?: string;
    /**
     *
     * @type {AbsenceTypeDto}
     * @memberof CriticalErrorDto
     */
    absenceType?: AbsenceType;
    /**
     *
     * @type {AbsenceTypeDto}
     * @memberof CriticalErrorDto
     */
    conflictingAbsenceType?: AbsenceType;
    /**
     *
     * @type {AbsenceShowDto}
     * @memberof CriticalErrorDto
     */
    absence?: AbsenceShow;

}