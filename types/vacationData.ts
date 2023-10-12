import { VacationSituation } from "./vacationSituation"
import { PeriodChain } from "./periodChain"
import {Contract} from "./contract"

export type VacationData = {
    personId: number
    topQualification: boolean
    year: number
    month: number
    vacationSituations: VacationSituation[]
    // tipo da creare
    contracts: Contract[]
    // tipo da creare
    periodChain: PeriodChain
}