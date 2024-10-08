import { PersonShow } from "./personShow"
import { BadgeReader } from "./badgeReader"
import { BadgeSystem } from "./badgeSystem"
import { Zone } from "./zone"

export type Badge = {
    /**
     *
     * @type {string}
     * @memberof Badge
     */
    code: string;
    /**
     *
     * @type {PersonShow}
     * @memberof Badge
     */
    person: PersonShow;
    /**
     *
     * @type {BadgeReader}
     * @memberof Badge
     */
    badgeReader: BadgeReader;
    /**
     *
     * @type {BadgeSystem}
     * @memberof Badge
     */
    badgeSystems: BadgeSystem;
}
