import { OfficeShowTerseDto } from "./officeShowTerseDto"

export type PersonShow = {
    /**
     * Nome
     * @type {string}
     * @memberof PersonShowDto
     */
    name: string;
    /**
     * Cognome
     * @type {string}
     * @memberof PersonShowDto
     */
    surname: string;
    /**
     * Codice fiscale
     * @type {string}
     * @memberof PersonShowDto
     */
    fiscalCode?: string;
    /**
     * Email
     * @type {string}
     * @memberof PersonShowDto
     */
    email: string;
    /**
     * Matricola
     * @type {string}
     * @memberof PersonShowDto
     */
    number?: string;
    /**
     * eppn - indicatore univoco all'interno dell'organizzazione
     * @type {string}
     * @memberof PersonShowDto
     */
    eppn?: string;
    /**
     * livello
     * @type {number}
     * @memberof PersonShowDto
     */
    qualification: number;
    /**
     * Id di collegamento con l'anagrafica CNR
     * @type {number}
     * @memberof PersonShowDto
     */
    perseoId?: number;
    /**
     * Data di nascita
     * @type {Date}
     * @memberof PersonShowDto
     */
    birthday?: Date;
    /**
     * Residenza
     * @type {string}
     * @memberof PersonShowDto
     */
    residence?: string;
    /**
     * Numero del telefono ufficio
     * @type {string}
     * @memberof PersonShowDto
     */
    telephone?: string;
    /**
     * Numero di fax
     * @type {string}
     * @memberof PersonShowDto
     */
    fax?: string;
    /**
     * Numero di cellulare
     * @type {string}
     * @memberof PersonShowDto
     */
    mobile?: string;
    /**
     * Abilitato invio delle email si/no
     * @type {boolean}
     * @memberof PersonShowDto
     */
    wantEmail?: boolean;
    /**
     * Id della persona
     * @type {number}
     * @memberof PersonShowDto
     */
    id?: number;
    /**
     * Data inizio validità
     * @type {Date}
     * @memberof PersonShowDto
     */
    beginDate?: Date;
    /**
     * Data fine validità
     * @type {Date}
     * @memberof PersonShowDto
     */
    endDate?: Date;
    /**
     *
     * @type {UserShowTerseDto}
     * @memberof PersonShowDto
     */
    user?: UserShowTerseDto;
    /**
     *
     * @type {OfficeShowTerseDto}
     * @memberof PersonShowDto
     */
    office?: OfficeShowTerseDto;
    /**
     * Data ultimo aggiornamento
     * @type {Date}
     * @memberof PersonShowDto
     */
    updatedAt?: Date;
    /**
     * Data di nascita
     * @type {Date}
     * @memberof PersonShowDto
     */
    birthDate?: Date;
}