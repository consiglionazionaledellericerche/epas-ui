import { OfficeShowTerse } from "./officeShowTerse"
import { UserShowTerse } from "./userShowTerse"

export type PersonShow = {
    /**
     * Nome
     * @type {string}
     * @memberof PersonShow
     */
    name: string;
    /**
     * Cognome
     * @type {string}
     * @memberof PersonShow
     */
    surname: string;
    /**
     * Codice fiscale
     * @type {string}
     * @memberof PersonShow
     */
    fiscalCode?: string;
    /**
     * Email
     * @type {string}
     * @memberof PersonShow
     */
    email: string;
    /**
     * Matricola
     * @type {string}
     * @memberof PersonShow
     */
    number?: string;
    /**
     * eppn - indicatore univoco all'interno dell'organizzazione
     * @type {string}
     * @memberof PersonShow
     */
    eppn?: string;
    /**
     * livello
     * @type {number}
     * @memberof PersonShow
     */
    qualification: number;
    /**
     * Id di collegamento con l'anagrafica CNR
     * @type {number}
     * @memberof PersonShow
     */
    perseoId?: number;
    /**
     * Data di nascita
     * @type {Date}
     * @memberof PersonShow
     */
    birthday?: Date;
    /**
     * Residenza
     * @type {string}
     * @memberof PersonShow
     */
    residence?: string;
    /**
     * Numero del telefono ufficio
     * @type {string}
     * @memberof PersonShow
     */
    telephone?: string;
    /**
     * Numero di fax
     * @type {string}
     * @memberof PersonShow
     */
    fax?: string;
    /**
     * Numero di cellulare
     * @type {string}
     * @memberof PersonShow
     */
    mobile?: string;
    /**
     * Abilitato invio delle email si/no
     * @type {boolean}
     * @memberof PersonShow
     */
    wantEmail?: boolean;
    /**
     * Id della persona
     * @type {number}
     * @memberof PersonShow
     */
    id?: number;
    /**
     * Data inizio validità
     * @type {Date}
     * @memberof PersonShow
     */
    beginDate?: Date;
    /**
     * Data fine validità
     * @type {Date}
     * @memberof PersonShow
     */
    endDate?: Date;
    /**
     *
     * @type {UserShowTerse}
     * @memberof PersonShow
     */
    user?: UserShowTerse;
    /**
     *
     * @type {OfficeShowTerse}
     * @memberof PersonShow
     */
    office?: OfficeShowTerse;
    /**
     * Data ultimo aggiornamento
     * @type {Date}
     * @memberof PersonShow
     */
    updatedAt?: Date;
    /**
     * Data di nascita
     * @type {Date}
     * @memberof PersonShow
     */
    birthDate?: Date;
}