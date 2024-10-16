import { AbsenceShow } from "./absenceShow"

export type AbsenceTypeJustifiedBehaviour = {
    /**
     * 
     * @type {string}
     * @memberof AbsenceTypeJustifiedBehaviour
     */
    justifiedBehaviour?: string;
    /**
     * 
     * @type {number}
     * @memberof AbsenceTypeJustifiedBehaviour
     */
    data?: number;
    /**
     * 
     * @type {string}
     * @memberof AbsenceTypeJustifiedBehaviour
     */
    printData?: string;
    /**
     * 
     * @type {Set<AbsenceShow>}
     * @memberof AbsenceTypeJustifiedBehaviour
     */
    conflictingAbsences?: Set<AbsenceShow>;
}
