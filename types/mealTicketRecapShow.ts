import type { MealTicketRecap } from './mealTicketRecap';
import type { PersonShowTerse } from './personShowTerse';

export type MealTicketRecapShow = {
    /**
     * 
     * @type {PersonShowTerse}
     * @memberof MealTicketRecapShow
     */
    person?: PersonShowTerse;
    /**
     * 
     * @type {MealTicketRecap}
     * @memberof MealTicketRecapShow
     */
    recap?: MealTicketRecap;
    /**
     * 
     * @type {MealTicketRecap}
     * @memberof MealTicketRecapShow
     */
    recapPrevious?: MealTicketRecap;
    /**
     * 
     * @type {Date}
     * @memberof MealTicketRecapShow
     */
    deliveryDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof MealTicketRecapShow
     */
    expireDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof MealTicketRecapShow
     */
    today?: Date;
    /**
     * 
     * @type {number}
     * @memberof MealTicketRecapShow
     */
    ticketNumberFrom?: number;
    /**
     * 
     * @type {number}
     * @memberof MealTicketRecapShow
     */
    ticketNumberTo?: number;
}