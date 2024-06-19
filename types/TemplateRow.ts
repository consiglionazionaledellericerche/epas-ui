import { AbsenceShowTerse } from "./absenceShowTerse"
import { GroupAbsenceType } from "./groupAbsenceType"

export type TemplateRow = {
    /**
     *
     * @type {Date}
     * @memberof TemplateRowDto
     */
    date?: Date;
    /**
     *
     * @type {AbsenceShowTerseDto}
     * @memberof TemplateRowDto
     */
    absence?: AbsenceShowTerse;
    /**
     *
     * @type {GroupAbsenceTypeDto}
     * @memberof TemplateRowDto
     */
    groupAbsenceType?: GroupAbsenceType;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRowDto
     */
    beforeInitialization?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRowDto
     */
    usableColumn?: boolean;
    /**
     *
     * @type {string}
     * @memberof TemplateRowDto
     */
    usableLimit?: string;
    /**
     *
     * @type {string}
     * @memberof TemplateRowDto
     */
    usableTaken?: string;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRowDto
     */
    complationColumn?: boolean;
    /**
     *
     * @type {string}
     * @memberof TemplateRowDto
     */
    consumedComplationBefore?: string;
    /**
     *
     * @type {string}
     * @memberof TemplateRowDto
     */
    consumedComplationAbsence?: string;
    /**
     *
     * @type {string}
     * @memberof TemplateRowDto
     */
    consumedComplationNext?: string;
    /**
     *
     * @type {boolean}
     * @memberof TemplateRowDto
     */
    replacingRow?: boolean;
}