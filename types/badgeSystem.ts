
import { Badge } from "./badge"
import { BadgeReader } from "./badgeReader"
import { OfficeShowTerse } from "./officeShowTerse"

export type BadgeSystem = {

    /**
     *
     * @type {string}
     * @memberof BadgeSystem
     */
    name: string;

    /**
     *
     * @type {string}
     * @memberof BadgeSystem
     */
    description: string;

    /**
     *
     * @type {List<Badge>}
     * @memberof BadgeSystem
     */
    badges: Array<Badge>;
    /**
     *
     * @type {List<BadgeReader>}
     * @memberof BadgeSystem
     */
    badgeReaders: Array<BadgeReader>;
    /**
         *
         * @type {OfficeShowTerse}
         * @memberof BadgeSystem
         */
     office?: OfficeShowTerse;
    /**
     *
     * @type {boolean}
     * @memberof BadgeSystem
     */
    enabled: boolean;
}
