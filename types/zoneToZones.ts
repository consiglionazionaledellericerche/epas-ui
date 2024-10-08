import { Zone } from "./zone"

export type ZoneToZones = {
    /**
     *
     * @type {Zone}
     * @memberof Zone
     */
    zoneBase: Zone;

    /**
     *
     * @type {Zone}
     * @memberof Zone
     */
    zoneLinked: Zone;

    /**
     *
     * @type {number}
     * @memberof Zone
     */
    delay: number;
}
