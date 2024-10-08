export type PersonShowTerse = {
    /**
     * Nome
     * @type {string}
     * @memberof PersonShowTerse
     */
    name: string;
    /**
     * Cognome
     * @type {string}
     * @memberof PersonShowTerse
     */
    surname: string;
    /**
     * Codice fiscale
     * @type {string}
     * @memberof PersonShowTerse
     */
    fiscalCode?: string;
    /**
     * Email
     * @type {string}
     * @memberof PersonShowTerse
     */
    email: string;
    /**
     * Matricola
     * @type {string}
     * @memberof PersonShowTerse
     */
    number?: string;
    /**
     * eppn - indicatore univoco all'interno dell'organizzazione
     * @type {string}
     * @memberof PersonShowTerse
     */
    eppn?: string;
    /**
     * Id della persona
     * @type {number}
     * @memberof PersonShowTerse
     */
    id?: number;
}