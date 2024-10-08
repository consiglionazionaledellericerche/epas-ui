import { AbsenceShow } from "./absenceShow"
import { AbsenceError } from "./absenceError"
import { GroupAbsenceType } from "./groupAbsenceType"

export type TemplateRow = {
    /**
     *
     * @type {Date}
     * @memberof TemplateRow
     */
    date?: Date;
    /**
     *
     * @type {Array<AbsenceError>}
     * @memberof TemplateRow
     */
    absenceErrors?: Array<AbsenceError>;
    /**
     *
     * @type {Array<AbsenceError>}
     * @memberof TemplateRow
     */
    absenceWarnings?: Array<AbsenceError>;
    /**
     *
     * @type {AbsenceShow}
     * @memberof TemplateRow
     */
    absence?: AbsenceShow;
    /**
     *
     * @type {GroupAbsenceType}
     * @memberof TemplateRow
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRow
     */
    beforeInitialization?: boolean;
   /**
    *
    * @type {boolean}
    * @memberof TemplateRow
    */
    onlyNotOnHoliday?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRow
     */
    usableColumn?: boolean;
    /**
     *
     * @type {string}
     * @memberof TemplateRow
     */
    usableLimit?: string;
    /**
     *
     * @type {string}
     * @memberof TemplateRow
     */
    usableTaken?: string;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRow
     */
    complationColumn?: boolean;
    /**
     *
     * @type {string}
     * @memberof TemplateRow
     */
    consumedComplationBefore?: string;
    /**
     *
     * @type {string}
     * @memberof TemplateRow
     */
    consumedComplationAbsence?: string;
    /**
     *
     * @type {string}
     * @memberof TemplateRow
     */
    consumedComplationNext?: string;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRow
     */
    replacingRow?: boolean;
}