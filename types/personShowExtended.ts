import type { UserShowTerse } from './userShowTerse';
import type { PersonShift } from './personShift';
import type { ShiftCategory } from './shiftCategory';
import type { OfficeShowTerse } from './officeShowTerse';
import type { PersonReperibilityType } from './personReperibilityType';

export type PersonShowExtended = {
    /**
     * Nome
     * @type {string}
     * @memberof PersonShowExtended
     */
    name: string;
    /**
     * Cognome
     * @type {string}
     * @memberof PersonShowExtended
     */
    surname: string;
    /**
     * Codice fiscale
     * @type {string}
     * @memberof PersonShowExtended
     */
    fiscalCode?: string;
    /**
     * Email
     * @type {string}
     * @memberof PersonShowExtended
     */
    email: string;
    /**
     * Matricola
     * @type {string}
     * @memberof PersonShowExtended
     */
    number?: string;
    /**
     * eppn - indicatore univoco all'interno dell'organizzazione
     * @type {string}
     * @memberof PersonShowExtended
     */
    eppn?: string;
    /**
     * livello
     * @type {number}
     * @memberof PersonShowExtended
     */
    qualification: number;
    /**
     * Id di collegamento con l'anagrafica CNR
     * @type {number}
     * @memberof PersonShowExtended
     */
    perseoId?: number;
    /**
     * Data di nascita
     * @type {Date}
     * @memberof PersonShowExtended
     */
    birthday?: Date;
    /**
     * Residenza
     * @type {string}
     * @memberof PersonShowExtended
     */
    residence?: string;
    /**
     * Numero del telefono ufficio
     * @type {string}
     * @memberof PersonShowExtended
     */
    telephone?: string;
    /**
     * Numero di fax
     * @type {string}
     * @memberof PersonShowExtended
     */
    fax?: string;
    /**
     * Numero di cellulare
     * @type {string}
     * @memberof PersonShowExtended
     */
    mobile?: string;
    /**
     * Abilitato invio delle email si/no
     * @type {boolean}
     * @memberof PersonShowExtended
     */
    wantEmail?: boolean;
    /**
     * Id della persona
     * @type {number}
     * @memberof PersonShowExtended
     */
    id?: number;
    /**
     * Data inizio validità
     * @type {Date}
     * @memberof PersonShowExtended
     */
    beginDate?: Date;
    /**
     * Data fine validità
     * @type {Date}
     * @memberof PersonShowExtended
     */
    endDate?: Date;
    /**
     * 
     * @type {UserShowTerse}
     * @memberof PersonShowExtended
     */
    user?: UserShowTerse;
    /**
     * 
     * @type {OfficeShowTerse}
     * @memberof PersonShowExtended
     */
    office?: OfficeShowTerse;
    /**
     * Data ultimo aggiornamento
     * @type {Date}
     * @memberof PersonShowExtended
     */
    updatedAt?: Date;
    /**
     * Data di nascita
     * @type {Date}
     * @memberof PersonShowExtended
     */
    birthDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof PersonShowExtended
     */
    available?: boolean;
    /**
     * 
     * @type {Array<ShiftCategory>}
     * @memberof PersonShowExtended
     */
    shiftCategories?: Array<ShiftCategory>;
    /**
     * 
     * @type {Array<PersonReperibilityType>}
     * @memberof PersonShowExtended
     */
    reperibilityTypes?: Array<PersonReperibilityType>;
    /**
     * 
     * @type {Array<ShiftCategory>}
     * @memberof PersonShowExtended
     */
    categories?: Array<ShiftCategory>;
    /**
     * 
     * @type {Array<PersonReperibilityType>}
     * @memberof PersonShowExtended
     */
    reperibilities?: Array<PersonReperibilityType>;
    /**
     * 
     * @type {Array<PersonShift>}
     * @memberof PersonShowExtended
     */
    personShifts?: Array<PersonShift>;
}