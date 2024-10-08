import { CompetenceCode } from './competenceCode';
import { PersonReperibilityTypeTerse } from './personReperibilityTypeTerse';

export type MonthlyCompetenceType = {
    /**
     * 
     * @type {string}
     * @memberof MonthlyCompetenceType
     */
    name?: string;
    /**
     * 
     * @type {Array<PersonReperibilityTypeTerse>}
     * @memberof MonthlyCompetenceType
     */
    personReperibilityTypes?: Array<PersonReperibilityTypeTerse>;
    /**
     * 
     * @type {CompetenceCode}
     * @memberof MonthlyCompetenceType
     */
    workdaysCode?: CompetenceCode;
    /**
     * 
     * @type {CompetenceCode}
     * @memberof MonthlyCompetenceType
     */
    holidaysCode?: CompetenceCode;

}