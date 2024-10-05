import { AbsenceShow } from "./absenceShow"
import { CriticalError } from "./criticalError"
import { TemplateRow } from "./templateRow"

export type AbsenceFormSimulationResponse = {
    /**
     * 
     * @type {Array<CriticalError>}
     * @memberof AbsenceFormSimulationResponse
     */
    criticalErrors?: Array<CriticalError>;
    /**
     *
     * @type {Array<TemplateRow>}
     * @memberof AbsenceFormSimulationResponse
     */
    insertTemplateRows?: Array<TemplateRow>;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceFormSimulationResponse
     */
    usableColumn?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof AbsenceFormSimulationResponse
     */
    complationColumn?: boolean;
    /**
     *
     * @type {Array<AbsenceShow>}
     * @memberof AbsenceFormSimulationResponse
     */
    absencesToPersist?: Array<AbsenceShow>;
    /**
     *
     * @type {Array<string>}
     * @memberof AbsenceFormSimulationResponse
     */
    warningsPreviousVersion?: Array<string>;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponse
     */
    howManyWarning?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponse
     */
    howManyError?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponse
     */
    howManySuccess?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponse
     */
    howManyReplacing?: number;
    /**
     *
     * @type {number}
     * @memberof AbsenceFormSimulationResponse
     */
    howManyIgnored?: number;
}
