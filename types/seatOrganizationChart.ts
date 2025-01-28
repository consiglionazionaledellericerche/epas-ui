
import type { PersonShow } from './personShow';
import type { UserShow } from './userShow';

export type SeatOrganizationChart = {
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    seatSupervisors?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    personnelAdmins?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    technicalAdmins?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    registryManagers?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    mealTicketsManagers?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    personnelAdminsMini?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    shiftManagers?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {{ [key: string]: Array<UserShow>; }}
     * @memberof SeatOrganizationChart
     */
    reperibilityManagers?: { [key: string]: Array<UserShow>; };
    /**
     * 
     * @type {PersonShow}
     * @memberof SeatOrganizationChart
     */
    currentPerson?: PersonShow;
    /**
     * 
     * @type {Array<string>}
     * @memberof SeatOrganizationChart
     */
    roles?: Array<string>;
}