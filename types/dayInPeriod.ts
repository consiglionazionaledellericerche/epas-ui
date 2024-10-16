import { AbsencePeriod } from "./absencePeriod"
import { TakenAbsence } from "./takenAbsence"
import { AbsenceShowTerse } from "./absenceShowTerse"
import { ComplationAbsence } from "./complationAbsence"
import { TemplateRow } from "./templateRow"
import { AbsenceType } from "./absenceType"

export type DayInPeriod = {

    /**
     * 
     * @type {Date}
     * @memberof DayInPeriod
     */
    date?: Date;
    /**
     * 
     * @type {AbsencePeriod}
     * @memberof DayInPeriod
     */
    absencePeriod?: AbsencePeriod;
    /**
     * 
     * @type {Array<TakenAbsence>}
     * @memberof DayInPeriod
     */
    takenAbsences?: Array<TakenAbsence>;
    /**
     * 
     * @type {Array<AbsenceShowTerse>}
     * @memberof DayInPeriod
     */
    existentComplations?: Array<AbsenceShowTerse>;
    /**
     * 
     * @type {ComplationAbsence}
     * @memberof DayInPeriod
     */
    complationAbsence?: ComplationAbsence;
    /**
     * 
     * @type {Array<TemplateRow>}
     * @memberof DayInPeriod
     */
    allTemplateRows?: Array<TemplateRow>;
    /**
     * 
     * @type {Array<AbsenceShowTerse>}
     * @memberof DayInPeriod
     */
    existentReplacings?: Array<AbsenceShowTerse>;
    /**
     * 
     * @type {AbsenceType}
     * @memberof DayInPeriod
     */
    correctReplacing?: AbsenceType;
}