import {StampType} from "./stampType"
import {StampModificationType} from "./stampModificationType"

export type Stamping = {
/**
     * 
     * @type {number}
     * @memberof Stamping
     */
    personDayId?: number;
    /**
     * 
     * @type {StampType}
     * @memberof Stamping
     */
    stampType?: StampType;
    /**
     * 
     * @type {StampModificationType}
     * @memberof Stamping
     */
    stampModificationTypes?: StampModificationType;
    /**
     * 
     * @type {Date}
     * @memberof Stamping
     */
    date?: Date;
    /**
     * 
     * @type {string}
     * @memberof Stamping
     */
    way?: string;
    /**
     * 
     * @type {string}
     * @memberof Stamping
     */
    note?: string;
    /**
     * 
     * @type {string}
     * @memberof Stamping
     */
    place?: string;
    /**
     * 
     * @type {string}
     * @memberof Stamping
     */
    reason?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Stamping
     */
    markedByAdmin?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Stamping
     */
    markedByEmployee?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Stamping
     */
    markedByTelework?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Stamping
     */
    stampingZone?: string;
}
