import { CompetenceCode } from "./competenceCode"
import { Competence } from "./competence"
import { PersonMonthCompetenceRecap } from "./personMonthCompetenceRecap"

export type Competences = {
    /**
     *
     * @type {number}
     * @memberof Competences
     */
    personId?: number;
    /**
     *
     * @type {number}
     * @memberof Competences
     */
    year?: number;
    /**
     *
     * @type {number}
     * @memberof Competences
     */
    month?: number;
    /**
     *
     * @type {Array<CompetenceCode>}
     * @memberof Competences
     */
    competencesCode?: Array<CompetenceCode>;
    /**
     *
     * @type {PersonMonthCompetenceRecap}
     * @memberof Competences
     */
    personMonthCompetenceRecap?: PersonMonthCompetenceRecap;
    /**
     *
     * @type {Array<Competence>}
     * @memberof Competences
     */
    competences?: Array<Competence>;
}
