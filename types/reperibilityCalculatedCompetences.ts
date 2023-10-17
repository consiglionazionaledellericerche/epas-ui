import { MonthlyCompetenceType } from './monthlyCompetenceType';

export type ReperibilityCalculatedCompetences = {
    /**
     * Nome della persona
     * @type {string}
     * @memberof ReperibilityCalculatedCompetencesDto
     */
    fullname?: string;
    /**
     * Conteggio delle reperibilità
     * @type {number}
     * @memberof ReperibilityCalculatedCompetencesDto
     */
    count?: number;
}