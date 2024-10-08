
export type ContractBase = {
/**
     * Data di inizio del contratto
     * @type {Date}
     * @memberof ContractBase
     */
    beginDate?: Date;
    /**
     * Data di scadenza del contratto
     * @type {Date}
     * @memberof ContractBase
     */
    endDate?: Date;
    /**
     * Data in cui è terminato il contratto, può essere diversa dalla scadenza
     * @type {Date}
     * @memberof ContractBase
     */
    endContract?: Date;
    /**
     * Id esterno utilizzato per la sincronizzazione con l'anagrafica CNR
     * @type {string}
     * @memberof ContractBase
     */
    perseoId?: string;
    /**
     * Id esterno utilizzato per la sincronizzazione con altre anagrafiche
     * @type {string}
     * @memberof ContractBase
     */
    externalId?: string;
    /**
     * Contratto con gestione delle busta paga (ex. true per i dipendenti CNR
     * @type {boolean}
     * @memberof ContractBase
     */
    onCertificate?: boolean;
}