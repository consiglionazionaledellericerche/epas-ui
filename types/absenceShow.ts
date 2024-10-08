import { PersonDay } from "./personDay"
import { AbsenceType } from "./absenceType"

export type AbsenceShow = {
    /**
     * Id univoco
     * @type {number}
     * @memberof AbsenceShow
     */
    id: number;
    /**
     *
     * @type {Date}
     * @memberof AbsenceShow
     */
    date?: Date;
    /**
     *
     * @type {string}
     * @memberof AbsenceShow
     */
    code?: string;
    /**
     *
     * @type {number}
     * @memberof AbsenceShow
     */
    justifiedTime?: number;
    /**
     *
     * @type {string}
     * @memberof AbsenceShow
     */
    justifiedType?: string;
    /**
     *
     * @type {string}
     * @memberof AbsenceShow
     */
    note?: string;
    /**
     *
     * @type {string}
     * @memberof AbsenceShow
     */
    externalId?: string;
    /**
     *
     * @type {Date}
     * @memberof AbsenceShow
     */
    updatedAt?: Date;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceShow
     */
    nothingJustified?: boolean;
    /**
     *
     * @type {PersonDayTerse}
     * @memberof AbsenceShow
     */
    personDay: PersonDay;
    /**
     *
     * @type {AbsenceType}
     * @memberof AbsenceShow
     */
    absenceType: AbsenceType;
    /**
     *
     * @type {Array<object>}
     * @memberof AbsenceShow
     */
    replacingAbsencesGroup?: Array<object>;
}
