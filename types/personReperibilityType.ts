import type { MonthlyCompetenceType } from './monthlyCompetenceType';

/**
 * Tipologia di reperibilità
 * @export
 * @interface PersonReperibilityType
 */
export type PersonReperibilityType = {
    /**
     * Id univoco
     * @type {number}
     * @memberof PersonReperibilityType
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof PersonReperibilityType
     */
    description?: string;
    /**
     * 
     * @type {MonthlyCompetenceType}
     * @memberof PersonReperibilityType
     */
    monthlyCompetenceType?: MonthlyCompetenceType;
}