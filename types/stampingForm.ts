import { PersonShow } from "./personShow"
import { Zone } from "./zone"
import {StampType} from "./stampType"

export type StampingForm = {
    /**
         *
         * @type {PersonShow}
         * @memberof StampingForm
         */
        person?: PersonShow;
        /**
         *
         * @type {Date}
         * @memberof StampingForm
         */
        date?: Date;
        /**
         *
         * @type {Array<StampType>}
         * @memberof StampingForm
         */
        offsite?: Array<StampType>;
        /**
         *
         * @type {boolean}
         * @memberof StampingForm
         */
        insertOffsite?: boolean;
        /**
         *
         * @type {boolean}
         * @memberof StampingForm
         */
        insertNormal?: boolean;
        /**
         *
         * @type {boolean}
         * @memberof StampingForm
         */
        autocertification?: boolean;
        /**
         *
         * @type {Array<Zone>}
         * @memberof StampingForm
         */
        zones?: Array<Zone>;
        /**
         *
         * @type {Array<StampType>}
         * @memberof StampingForm
         */
        stampTypes?: Array<StampType>;
}
