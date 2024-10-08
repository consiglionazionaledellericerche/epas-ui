import {Stamping} from "./stamping"
import {StampModificationType} from "./stampModificationType"

export type StampingTemplate = {
    /**
         * Id univoco
         * @type {number}
         * @memberof StampingTemplate
         */
        id: number;
        /**
         *
         * @type {string}
         * @memberof StampingTemplate
         */
        colour?: string;
        /**
         *
         * @type {number}
         * @memberof StampingTemplate
         */
        pairId?: number;
        /**
         *
         * @type {string}
         * @memberof StampingTemplate
         */
        pairPosition?: string;
        /**
         *
         * @type {Date}
         * @memberof StampingTemplate
         */
        date?: Date;
        /**
         *
         * @type {string}
         * @memberof StampingTemplate
         */
        way?: string;
        /**
         *
         * @type {string}
         * @memberof StampingTemplate
         */
        hour?: string;
        /**
         *
         * @type {Array<StampModificationType>}
         * @memberof StampingTemplate
         */
        stampModificationTypes?: StampModificationType[]
    /**
         * 
         * @type {boolean}
         * @memberof StampingTemplate
         */
        valid?: boolean;
        /**
         * 
         * @type {boolean}
         * @memberof StampingTemplate
         */
        showPopover?: boolean;
        /**
         * 
         * @type {Stamping}
         * @memberof StampingTemplate
         */
        stamping?: Stamping;
}