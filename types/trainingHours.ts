import { PersonShow } from "./personShow"
import { PersonMonthRecap } from "./personMonthRecap"

export type TrainingHours = {
    /**
     * 
     * @type {PersonShow}
     * @memberof PersonMonthRecap
     */
    person?: PersonShow;
    /**
     * 
     * @type {Array<PersonMonthRecap>}
     * @memberof TrainingHours
     */
    personMonthRecaps?: Array<PersonMonthRecap>;
    /**
     * 
     * @type {Date}
     * @memberof TrainingHours
     */
    today?: Date;
}