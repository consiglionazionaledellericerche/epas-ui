import { PersonReperibilityTypeTerse } from './personReperibilityTypeTerse';
import { ReperibilityCalculatedCompetences } from './reperibilityCalculatedCompetences';
import { ReperibilityTypeMonth } from './reperibilityTypeMonth';

export type RecapReperibility = {
    /**
     *
     * @type {Date}
     * @memberof RecapReperibility
     */
    start?: Date;
    /**
     *
     * @type {PersonReperibilityTypeTerse}
     * @memberof RecapReperibility
     */
    reperibility?: PersonReperibilityTypeTerse;
    /**
     *
     * @type {ReperibilityTypeMonth}
     * @memberof RecapReperibility
     */
    reperibilityTypeMonth?: ReperibilityTypeMonth;
    /**
     *
     * @type {Array<ReperibilityCalculatedCompetences>}
     * @memberof RecapReperibility
     */
    workDaysReperibilityCalculatedCompetences?: Array<ReperibilityCalculatedCompetences>;
    /**
     *
     * @type {Array<ReperibilityCalculatedCompetences>}
     * @memberof RecapReperibility
     */
    holidaysReperibilityCalculatedCompetences?: Array<ReperibilityCalculatedCompetences>;
}