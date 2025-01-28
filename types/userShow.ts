export type UserShow = {
    /**
     * Id univoco
     * @type {number}
     * @memberof UserShowDto
     */
    id: number;
    /**
     * username
     * @type {string}
     * @memberof UserShowDto
     */
    username?: string;
    /**
     * Id dell'ufficio a cui appartiene questo utente (se non è una persona)
     * @type {number}
     * @memberof UserShowDto
     */
    ownerId?: number;
    /**
     * id della persona collegata all'utente
     * @type {number}
     * @memberof UserShowDto
     */
    personId?: number;
    /**
     * nome completo della persona collegata all'utente
     * @type {string}
     * @memberof UserShowDto
     */
    fullname?: string;
    /**
     * Ruoli di sistema attribuiti all'utente
     * @type {Set<string>}
     * @memberof UserShowDto
     */
    roles?: Set<UserShowDtoRolesEnum>;
    /**
     * abilitato si/no
     * @type {boolean}
     * @memberof UserShowDto
     */
    disabled?: boolean;
}


/**
 * @export
 */
export const UserShowDtoRolesEnum = {
    Developer: 'DEVELOPER',
    Admin: 'ADMIN',
    MissionsManager: 'MISSIONS_MANAGER',
    ContractualManager: 'CONTRACTUAL_MANAGER',
    RoAdmin: 'RO_ADMIN',
    AbsencesManager: 'ABSENCES_MANAGER',
    PersonDaysReader: 'PERSON_DAYS_READER',
    RegistryManager: 'REGISTRY_MANAGER'
} as const;
export type UserShowDtoRolesEnum = typeof UserShowDtoRolesEnum[keyof typeof UserShowDtoRolesEnum];
