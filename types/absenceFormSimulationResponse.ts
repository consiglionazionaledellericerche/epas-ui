import { AbsenceShow } from "./absenceShow"
import { CriticalError } from "./criticalError"
import { TemplateRow } from "./templateRow"

export type AbsenceFormSimulationResponse = {
    /**
     * 
     * @type {Array<CriticalErrorDto>}
     * @memberof AbsenceFormSimulationResponseDto
     */
    criticalErrors?: Array<CriticalError>;
    /**
     *
     * @type {Array<TemplateRowDto>}
     * @memberof AbsenceFormSimulationResponseDto
     */
    insertTemplateRows?: Array<TemplateRow>;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceFormSimulationResponseDto
     */
    usableColumn?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceFormSimulationResponseDto
     */
    complationColumn?: boolean;
    /**
     *
     * @type {Array<AbsenceShowDto>}
     * @memberof AbsenceFormSimulationResponseDto
     */
    absencesToPersist?: Array<AbsenceShow>;
    /**
     *
     * @type {Array<string>}
     * @memberof AbsenceFormSimulationResponseDto
     */
    warningsPreviousVersion?: Array<string>;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponseDto
     */
    howManyWarning?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponseDto
     */
    howManyError?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponseDto
     */
    howManySuccess?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponseDto
     */
    howManyReplacing?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponseDto
     */
    howManyIgnored?: number;
}
