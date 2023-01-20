import { VacationSituations } from "./vacationSituations"
import { PeriodChain } from "./periodChain"
import {Contract} from "./contract"

export type VacationData = {
    personId: number
    topQualification: boolean
    year: number
    month: number
    vacationSituations: VacationSituations
    // tipo da creare
    contracts: Contract[]
    // tipo da creare
    periodChain: PeriodChain
}