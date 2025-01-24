
export type ContractShowTerse = {
    /**
     * Data di inizio del contratto
     * @type {Date}
     * @memberof ContractShowTerse
     */
    beginDate?: Date;
    /**
     * Data di scadenza del contratto
     * @type {Date}
     * @memberof ContractShowTerse
     */
    endDate?: Date;
    /**
     * Data in cui è terminato il contratto, può essere diversa dalla scadenza
     * @type {Date}
     * @memberof ContractShowTerse
     */
    endContract?: Date;
    /**
     * Id esterno utilizzato per la sincronizzazione con l'anagrafica CNR
     * @type {string}
     * @memberof ContractShowTerse
     */
    perseoId?: string;
    /**
     * Id esterno utilizzato per la sincronizzazione con altre anagrafiche
     * @type {string}
     * @memberof ContractShowTerse
     */
    externalId?: string;
    /**
     * Contratto con gestione delle busta paga (ex. true per i dipendenti CNR
     * @type {boolean}
     * @memberof ContractShowTerse
     */
    onCertificate?: boolean;
    /**
     * Id del contratto
     * @type {number}
     * @memberof ContractShowTerse
     */
    id?: number;
    /**
     * Id della persona associata al contratto
     * @type {number}
     * @memberof ContractShowTerse
     */
    personId?: number;
}