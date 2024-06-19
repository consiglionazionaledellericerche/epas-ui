import { PersonShowTerse } from "./personShowTerse"
import { AbsenceType } from "./absenceType"
import { GroupAbsenceType } from "./groupAbsenceType"
import { CategoryTab } from "./categoryTab"

export type AbsenceForm = {
    /**
     * 
     * @type {PersonShowTerse}
     * @memberof AbsenceForm
     */
    person?: PersonShowTerse;
    /**
     * 
     * @type {Date}
     * @memberof AbsenceForm
     */
    from?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AbsenceForm
     */
    to?: Date;
    /**
     * 
     * @type {Array<GroupAbsenceType>}
     * @memberof AbsenceForm
     */
    groupsPermitted?: Array<GroupAbsenceType>;
    /**
     * 
     * @type {{ [key: string]: CategoryTab; }}
     * @memberof AbsenceForm
     */
    tabsVisibile?: { [key: string]: CategoryTab; };
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    permissionDenied?: boolean;
    /**
     * 
     * @type {CategoryTab}
     * @memberof AbsenceForm
     */
    categoryTabSelected?: CategoryTab;
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    hasGroupChoice?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    hasAbsenceTypeChoice?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    hasJustifiedTypeChoice?: boolean;
    /**
     * 
     * @type {number}
     * @memberof AbsenceForm
     */
    theOnlyAbsenceType?: number;
    /**
     * 
     * @type {GroupAbsenceType}
     * @memberof AbsenceForm
     */
    groupSelected?: GroupAbsenceType;
    /**
     * 
     * @type {Array<GroupAbsenceType>}
     * @memberof AbsenceForm
     */
    groups?: Array<GroupAbsenceType>;
    /**
     * 
     * @type {{ [key: string]: Array<GroupAbsenceType>; }}
     * @memberof AbsenceForm
     */
    groupsByCategory?: { [key: string]: Array<GroupAbsenceType>; };
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    hasHourMinutesChoice?: boolean;
    /**
     * 
     * @type {Array<number>}
     * @memberof AbsenceForm
     */
    selectableHours?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof AbsenceForm
     */
    selectableMinutes?: Array<number>;
    /**
     * 
     * @type {Date}
     * @memberof AbsenceForm
     */
    recoveryDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    automaticChoiceExists?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AbsenceForm
     */
    automaticChoiceSelected?: boolean;
    /**
     * 
     * @type {Array<AbsenceType>}
     * @memberof AbsenceForm
     */
    absenceTypes?: Array<AbsenceType>;
    /**
     * 
     * @type {AbsenceType}
     * @memberof AbsenceForm
     */
    absenceTypeSelected?: AbsenceType;
    /**
     * 
     * @type {Array<string>}
     * @memberof AbsenceForm
     */
    justifiedTypes?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AbsenceForm
     */
    justifiedTypeSelected?: string;
    /**
     * 
     * @type {number}
     * @memberof AbsenceForm
     */
    minutes?: number;
    /**
     * 
     * @type {number}
     * @memberof AbsenceForm
     */
    hours?: number;
}
