import { PersonShowTerse } from "./personShowTerse"
import { Zone } from "./zone"

export type StampingForm = {
    /**
     * 
     * @type {PersonShowTerse}
     * @memberof StampingForm
     */
    person: PersonShowTerse;
    /**
     * 
     * @type {Date}
     * @memberof StampingForm
     */
    date: Date;

    /**
     * 
     * @type {Array<string>}
     * @memberof StampingForm
     */
    offsite: Array<string>;

    /**
     *
     * @type {Array<string>}
     * @memberof StampingForm
     */
    stampTypes: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof StampingForm
     */
    insertOffsite: boolean;
    /**
     *
     * @type {boolean}
     * @memberof StampingForm
     */
    insertNormal: boolean;
    /**
     *
     * @type {boolean}
     * @memberof StampingForm
     */
    autocertification: boolean;
    /**
     *
     * @type {Zone}
     * @memberof StampingForm
     */
    zones: Zone;
}
