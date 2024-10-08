import { UserShowTerse } from "./userShowTerse"
import { Badge } from "./badge"
import { BadgeSystem } from "./badgeSystem"
import { Zone } from "./zone"

export type BadgeReader = {

    /**
     *
     * @type {string}
     * @memberof BadgeReader
     */
    code: string;

    /**
     *
     * @type {string}
     * @memberof BadgeReader
     */
    description: string;
    /**
     *
     * @type {string}
     * @memberof BadgeReader
     */
    location: string;

    /**
     *
     * @type {UserShowTerse}
     * @memberof BadgeReader
     */
    user: UserShowTerse;

    /**
     *
     * @type {List<Badge>}
     * @memberof BadgeReader
     */
    badges: Array<Badge>;
    /**
     *
     * @type {List<BadgeSystem>}
     * @memberof BadgeReader
     */
    badgeSystems: Array<BadgeSystem>;
    /**
      *
      * @type {List<Zone>}
      * @memberof BadgeReader
      */
     zones: Array<Zone>;
    /**
     *
     * @type {boolean}
     * @memberof BadgeReader
     */
    enabled: boolean;
}
