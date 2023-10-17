
export type ContractBase = {
/**
     * Data di inizio del contratto
     * @type {Date}
     * @memberof ContractBaseDto
     */
    beginDate?: Date;
    /**
     * Data di scadenza del contratto
     * @type {Date}
     * @memberof ContractBaseDto
     */
    endDate?: Date;
    /**
     * Data in cui è terminato il contratto, può essere diversa dalla scadenza
     * @type {Date}
     * @memberof ContractBaseDto
     */
    endContract?: Date;
    /**
     * Id esterno utilizzato per la sincronizzazione con l'anagrafica CNR
     * @type {string}
     * @memberof ContractBaseDto
     */
    perseoId?: string;
    /**
     * Id esterno utilizzato per la sincronizzazione con altre anagrafiche
     * @type {string}
     * @memberof ContractBaseDto
     */
    externalId?: string;
    /**
     * Contratto con gestione delle busta paga (ex. true per i dipendenti CNR
     * @type {boolean}
     * @memberof ContractBaseDto
     */
    onCertificate?: boolean;
}