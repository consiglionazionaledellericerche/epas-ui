import { AbsenceShow } from "./absenceShow"

export type AbsenceError = {
    /**
         *
         * @type {AbsenceShowDto}
         * @memberof AbsenceErrorDto
         */
        absence?: AbsenceShow;
        /**
         *
         * @type {string}
         * @memberof AbsenceErrorDto
         */
        absenceProblem?: string;
        /**
         *
         * @type {List<AbsenceShowDto>}
         * @memberof AbsenceErrorDto
         */
        conflictingAbsences?: Array<AbsenceShow>;
}
