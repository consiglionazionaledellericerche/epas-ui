import { PersonShow } from "./personShow"
import { Zone } from "./zone"
import {StampType} from "./stampType"
import {HistoryValue} from "./historyValue"

export type StampingEditForm = {
    /**
     *
     * @type {number}
     * @memberof StampingEditForm
     */
    personId?: number;
    /**
     *
     * @type {number}
     * @memberof StampingEditForm
     */
    stampingId?: number;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    stampType?: string;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    way?: string;
    /**
     *
     * @type {Date}
     * @memberof StampingEditForm
     */
    date?: Date;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    note?: string;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    time?: string;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    zone?: string;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    place?: string;
    /**
     *
     * @type {string}
     * @memberof StampingEditForm
     */
    reason?: string;
    /**
     *
     * @type {boolean}
     * @memberof StampingEditForm
     */
    offsite?: boolean;
    /**
     *
     * @type {PersonShow}
     * @memberof StampingEditForm
     */
    person?: PersonShow;
    /**
     *
     * @type {boolean}
     * @memberof StampingEditForm
     */
    ownStamping?: boolean;
    /**
     *
     * @type {Array<Zone>}
     * @memberof StampingEditForm
     */
    zones?: Array<Zone>;
    /**
     *
     * @type {StampType}
     * @memberof StampingEditForm
     */
    stampTypeOpt?: StampType;
    /**
     *
     * @type {boolean}
     * @memberof StampingEditForm
     */
    serviceReasons?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof StampingEditForm
     */
    offSiteWork?: boolean;
    /**
     *
     * @type {Array<HistoryValue>}
     * @memberof StampingEditForm
     */
    historyStamping?: Array<HistoryValue>;
    /**
     *
     * @type {Array<StampType>}
     * @memberof StampingEditForm
     */
    stampTypes?: Array<StampType>;
}
