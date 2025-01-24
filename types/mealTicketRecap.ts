import type { BlockMealTicket } from './blockMealTicket';
import type { ContractShowTerse } from './contractShowTerse';
import type { DateInterval } from './dateInterval';
import type { MealTicket } from './mealTicket';
import type { PersonDay } from './personDay';

export type MealTicketRecap = {
    /**
     * 
     * @type {ContractShowTerse}
     * @memberof MealTicketRecap
     */
    contract?: ContractShowTerse;
    /**
     * 
     * @type {Date}
     * @memberof MealTicketRecap
     */
    dateExpire?: Date;
    /**
     * 
     * @type {Date}
     * @memberof MealTicketRecap
     */
    dateRunOut?: Date;
    /**
     * 
     * @type {Array<PersonDay>}
     * @memberof MealTicketRecap
     */
    personDaysMealTickets?: Array<PersonDay>;
    /**
     * 
     * @type {Array<MealTicket>}
     * @memberof MealTicketRecap
     */
    mealTicketReturnedDeliveryOrderDesc?: Array<MealTicket>;
    /**
     * 
     * @type {Array<MealTicket>}
     * @memberof MealTicketRecap
     */
    mealTicketsReceivedExpireOrderedAsc?: Array<MealTicket>;
    /**
     * 
     * @type {Array<MealTicket>}
     * @memberof MealTicketRecap
     */
    mealTicketsReceivedExpireOrderedAscPostInit?: Array<MealTicket>;
    /**
     * 
     * @type {Array<MealTicket>}
     * @memberof MealTicketRecap
     */
    mealTicketsReceivedDeliveryOrderedDesc?: Array<MealTicket>;
    /**
     * 
     * @type {Array<BlockMealTicket>}
     * @memberof MealTicketRecap
     */
    blockMealTicketReceivedDeliveryDesc?: Array<BlockMealTicket>;
    /**
     * 
     * @type {number}
     * @memberof MealTicketRecap
     */
    remaining?: number;
    /**
     * 
     * @type {number}
     * @memberof MealTicketRecap
     */
    sourcedInInterval?: number;
    /**
     * 
     * @type {DateInterval}
     * @memberof MealTicketRecap
     */
    mealTicketInterval?: DateInterval;
}