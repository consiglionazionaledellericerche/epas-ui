import { ZoneToZones } from "./zoneToZones"
import { BadgeReader } from "./badgeReader"

export type Zone = {

    /**
     *
     * @type {string}
     * @memberof Zone
     */
    name: string;

    /**
     *
     * @type {string}
     * @memberof Zone
     */
    description: string;

    /**
     *
     * @type {BadgeReader}
     * @memberof Zone
     */
    badgeReader: BadgeReader;
    /**
     *
     * @type {List<ZoneToZones>}
     * @memberof Zone
     */
    zoneLinkedAsMaster?: Array<ZoneToZones>;
    /**
     *
     * @type {List<ZoneToZones>}
     * @memberof Zone
     */
    zoneLinkedAsSlave?: Array<ZoneToZones>;
}
