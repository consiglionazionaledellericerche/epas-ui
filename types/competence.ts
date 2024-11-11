import { CompetenceCode } from "./competenceCode"

export type Competence = {
    /**
     * 
     * @type {number}
     * @memberof Competence
     */
    personId?: number;
    /**
     * 
     * @type {CompetenceCode}
     * @memberof Competence
     */
    competenceCode?: CompetenceCode;
    /**
     * 
     * @type {number}
     * @memberof Competence
     */
    year?: number;
    /**
     * 
     * @type {number}
     * @memberof Competence
     */
    month?: number;
    /**
     * 
     * @type {number}
     * @memberof Competence
     */
    valueRequested?: number;
    /**
     * 
     * @type {number}
     * @memberof Competence
     */
    exceededMins?: number;
    /**
     * 
     * @type {number}
     * @memberof Competence
     */
    valueApproved?: number;
    /**
     * 
     * @type {string}
     * @memberof Competence
     */
    reason?: string;
}
