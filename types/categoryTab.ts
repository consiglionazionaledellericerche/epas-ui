export type CategoryTab = {
    /**
     * Nome della tab.
     * @type {string}
     * @memberof CategoryTabDto
     */
    name?: string;
    /**
     * Descrizione della tab.
     * @type {string}
     * @memberof CategoryTabDto
     */
    description?: string;
    /**
     * Priorità della tab.
     * @type {number}
     * @memberof CategoryTabDto
     */
    priority?: number;
    /**
     *
     * @type {boolean}
     * @memberof CategoryTabDto
     */
    _default?: boolean;
}