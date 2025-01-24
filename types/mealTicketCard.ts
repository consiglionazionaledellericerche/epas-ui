import type { OfficeShowTerse } from './officeShowTerse';
import type { PersonShowTerse } from './personShowTerse';

export type MealTicketCard = {
    /**
     * 
     * @type {string}
     * @memberof MealTicketCard
     */
    number?: string;
    /**
     * 
     * @type {PersonShowTerse}
     * @memberof MealTicketCard
     */
    person?: PersonShowTerse;
    /**
     * 
     * @type {Date}
     * @memberof MealTicketCard
     */
    deliveryDate?: Date;
    /**
     * 
     * @type {OfficeShowTerse}
     * @memberof MealTicketCard
     */
    deliveryOffice?: OfficeShowTerse;
    /**
     * 
     * @type {boolean}
     * @memberof MealTicketCard
     */
    active?: boolean;
}
