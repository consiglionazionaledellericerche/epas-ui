export type OfficeShowTerse = {
    /**
         * Nome dell'ufficio
         * @type {string}
         * @memberof OfficeShowTerse
         */
        name: string;
        /**
         * Codice della sede
         * @type {string}
         * @memberof OfficeShowTerse
         */
        code?: string;
        /**
         * sedeId della sede, al CNR serve per l'invio degli attestati
         * @type {string}
         * @memberof OfficeShowTerse
         */
        codeId: string;
        /**
         * Id dell'ufficio
         * @type {number}
         * @memberof OfficeShowTerse
         */
        id?: number;
}