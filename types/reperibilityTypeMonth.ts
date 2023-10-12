import { PersonReperibilityTypeTerse } from './personReperibilityTypeTerse';
import { ReperibilityTypeMonthYearMonth } from './reperibilityTypeMonthYearMonth';

export type ReperibilityTypeMonth = {

    /**
     * 
     * @type {ReperibilityTypeMonthYearMonth}
     * @memberof ReperibilityTypeMonth
     */
    yearMonth?: ReperibilityTypeMonthYearMonth;
    /**
     * 
     * @type {PersonReperibilityTypeTerse}
     * @memberof ReperibilityTypeMonth
     */
    personReperibilityType?: PersonReperibilityTypeTerse;
    /**
     * 
     * @type {boolean}
     * @memberof ReperibilityTypeMonth
     */
    approved?: boolean;

}