import { MonthlyCompetenceType } from './monthlyCompetenceType';

export type PersonReperibilityTypeTerse = {
    /**
     * Id univoco
     * @type {number}
     * @memberof PersonReperibilityTypeTerse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof PersonReperibilityTypeTerse
     */
    description?: string;
    /**
     * 
     * @type {MonthlyCompetenceType}
     * @memberof PersonReperibilityTypeTerse
     */
    monthlyCompetenceType?: MonthlyCompetenceType;

}