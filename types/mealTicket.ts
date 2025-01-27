import type { ContractShowTerse } from './contractShowTerse';
import type { MealTicketCard } from './mealTicketCard';
import type { OfficeShowTerse } from './officeShowTerse';
import type { PersonShowTerse } from './personShowTerse';

export type MealTicket = {
    /**
     * 
     * @type {ContractShowTerse}
     * @memberof MealTicket
     */
    contract?: ContractShowTerse;
    /**
     * 
     * @type {number}
     * @memberof MealTicket
     */
    year?: number;
    /**
     * 
     * @type {Date}
     * @memberof MealTicket
     */
    date?: Date;
    /**
     * 
     * @type {string}
     * @memberof MealTicket
     */
    block?: string;
    /**
     * 
     * @type {string}
     * @memberof MealTicket
     */
    blockType?: string;
    /**
     * 
     * @type {number}
     * @memberof MealTicket
     */
    number?: number;
    /**
     * 
     * @type {string}
     * @memberof MealTicket
     */
    code?: string;
    /**
     * 
     * @type {PersonShowTerse}
     * @memberof MealTicket
     */
    admin?: PersonShowTerse;
    /**
     * 
     * @type {Date}
     * @memberof MealTicket
     */
    expireDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof MealTicket
     */
    returned?: boolean;
    /**
     * 
     * @type {OfficeShowTerse}
     * @memberof MealTicket
     */
    office?: OfficeShowTerse;
    /**
     * 
     * @type {MealTicketCard}
     * @memberof MealTicket
     */
    mealTicketCard?: MealTicketCard;
    /**
     * 
     * @type {boolean}
     * @memberof MealTicket
     */
    used?: boolean;
}
