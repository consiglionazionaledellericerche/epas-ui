import { MonthlyCompetenceType } from './monthlyCompetenceType';

export type ReperibilityCalculatedCompetences = {
    /**
     * Nome della persona
     * @type {string}
     * @memberof ReperibilityCalculatedCompetences
     */
    fullname?: string;
    /**
     * Conteggio delle reperibilità
     * @type {number}
     * @memberof ReperibilityCalculatedCompetences
     */
    count?: number;
}