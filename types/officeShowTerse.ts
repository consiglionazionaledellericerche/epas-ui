export type OfficeShowTerse = {
    /**
         * Nome dell'ufficio
         * @type {string}
         * @memberof OfficeShowTerseDto
         */
        name: string;
        /**
         * Codice della sede
         * @type {string}
         * @memberof OfficeShowTerseDto
         */
        code?: string;
        /**
         * sedeId della sede, al CNR serve per l'invio degli attestati
         * @type {string}
         * @memberof OfficeShowTerseDto
         */
        codeId: string;
        /**
         * Id dell'ufficio
         * @type {number}
         * @memberof OfficeShowTerseDto
         */
        id?: number;
}