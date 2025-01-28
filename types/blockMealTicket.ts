
export type BlockMealTicket = {
    /**
     * 
     * @type {string}
     * @memberof BlockMealTicket
     */
    codeBlock?: string;
    /**
     * 
     * @type {string}
     * @memberof BlockMealTicket
     */
    blockType?: string;
    /**
     * 
     * @type {number}
     * @memberof BlockMealTicket
     */
    first?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockMealTicket
     */
    last?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockMealTicket
     */
    getConsumed?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockMealTicket
     */
    getRemaining?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockMealTicket
     */
    getDimBlock?: number;
    /**
     * 
     * @type {boolean}
     * @memberof BlockMealTicket
     */
    returned?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof BlockMealTicket
     */
    getReceivedDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BlockMealTicket
     */
    getExpireDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof BlockMealTicket
     */
    getDate?: Date;
}