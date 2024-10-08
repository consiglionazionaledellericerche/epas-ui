import { AbsenceShow } from "./absenceShow"

export type AbsenceError = {
    /**
         *
         * @type {AbsenceShow}
         * @memberof AbsenceError
         */
        absence?: AbsenceShow;
        /**
         *
         * @type {string}
         * @memberof AbsenceError
         */
        absenceProblem?: string;
        /**
         *
         * @type {List<AbsenceShow>}
         * @memberof AbsenceError
         */
        conflictingAbsences?: Array<AbsenceShow>;
}
