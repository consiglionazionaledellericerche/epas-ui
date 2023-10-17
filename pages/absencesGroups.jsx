import { useRequest } from "../request/useRequest"
import { useRouter } from 'next/router'

import React, { useContext, useState, useEffect } from 'react'

import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'

import { Spinner } from 'react-bootstrap'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import AbsencesYearlyRecapView from '../components/absences/absencesYearlyRecapView'
import AbsencePopOver from "../components/absences/absencePopOver";
import DateUtility from "../utils/dateUtility";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

function AbsencesGroups() {
  const router = useRouter()

// Accesso ai parametri dalla query
  let from = router.query.from;
  let groupAbsenceTypeId = router.query.groupAbsenceTypeId;
  let personId = router.query.personId;
  const currentDate = useContext(CurrentDateContext)

  const { data: session, status } = useSession()

  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);

  const handleChange = (event) => {
    let groupAbsenceTypeId = event.target.value;
    let parameters1 = personId ? `id=${personId}&from=${from}&groupAbsenceTypeId=${groupAbsenceTypeId}` : `from=${from}&groupAbsenceTypeId=${groupAbsenceTypeId}`
    router.push(`/absencesGroups?${parameters1}`);
  };

  const handleButtonClick = () => {
    let year = DateUtility.formatDateYear(from);
    let month = DateUtility.formatDateMonth(from);
    let parameters2 = personId ? `id=${personId}&year=${year}&month=${month}` : `year=${year}&month=${month}`
    router.push(`/stampings?${parameters2}`);
  };

  const parameters = personId ? `id=${personId}&from=${from}&groupAbsenceTypeId=${groupAbsenceTypeId}` : `from=${from}&groupAbsenceTypeId=${groupAbsenceTypeId}`

  const {data, error} = useRequest('/absencesGroups/groupStatus', parameters);

  if (error) return (<div>Impossibile caricare la situazione delle assenze</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

 let content =  data.periodChain?.periods.map((absencePeriod) => {
                        let listOne
                        let listTwo
                          listOne = <>
                          <li className="list-group-item list-group-item-info">
                            <p>
                              <strong>{absencePeriod.groupAbsenceType.description}</strong>
                            </p>
                          </li>
                          </>

                          let elemTwo;
                          let elemThree;
                          let elemFour;
                          let thElem;


                        absencePeriod.takableWithLimit ? elemTwo = <>
                                                                     <strong>Tipo periodo</strong> {absencePeriod.groupAbsenceType.periodType}<br/>
                                                                     <strong>Validità periodo</strong> {DateUtility.formatDate(absencePeriod.from)} - {DateUtility.formatDate(absencePeriod.to)}<br/>
                                                                     <strong>Totale utilizzabile </strong>
                                                                     {DateUtility.formatAmount(absencePeriod.periodTakableAmount, absencePeriod.takeAmountType)}
                                                                     </> : ""

                       absencePeriod.takableWithLimit ? elemThree = <>
                                 <i class="fa fa-exclamation-circle" aria-hidden="true"></i> Rimangono
                                 <strong> <span className="text-success">{DateUtility.formatAmount(absencePeriod.remainingAmount, absencePeriod.takeAmountType)}</span> </strong>
                                 da utilizzare entro il <strong className="text-success">{DateUtility.formatDate(absencePeriod.to)}</strong>
                                 </> : ""

                          absencePeriod.takableWithLimit ?
                                           thElem = <>
                                           <th>Limite<br/>Utilizzabile</th>
                                           <th>Limite<br/>Consumato</th>
                                         </> : ""

                           !absencePeriod.daysInPeriod ?
                               elemFour = <><p><em>Non ci sono assenze utilizzate per questo gruppo nel periodo selezionato.</em></p></> :
                          elemFour = <>
                           <Tooltip id="tooltip-absencecode" className="tooltip-white webui-popover" isOpen={showTooltip} effect="solid" clickable={true}>
                             {tooltipContent}
                           </Tooltip>
                           <table className="table table-condensed table-bordered">
                           <thead>
                            <tr className="bg-warning">
                              <th>Data</th>
                              <th>Assenza</th>
                              {thElem}
                              <th>Completamento<br/>Precedente<br/></th>
                              <th>Completamento<br/>Assenza</th>
                              <th>Completamento<br/>Residuo<br/></th>
                            </tr>
                            </thead>
                              <tbody>
                                {Object.entries(absencePeriod.daysInPeriod).map(([date, dp]) => (
                                  <React.Fragment key={dp.day}>
                                      {dp.rowRecap.map((rowRecap) => (
                                      <tr key={rowRecap.id} className={rowRecap.beforeInitialization ? "bg-grey" : ""}>
                                        <td>{rowRecap.date ? DateUtility.formatDate(rowRecap.date) : ""}</td>
                                        <td>
                                        <a href="#" onClick={(e) => e.preventDefault()}>
                                        <AbsencePopOver showGroup={false} key={rowRecap.id}
                                                              absencesRecap={rowRecap.absence}
                                                              year={DateUtility.formatDateYear(rowRecap.date)}
                                                              month={DateUtility.formatDateMonth(rowRecap.date)}
                                                              day={DateUtility.formatDateDay(rowRecap.date)}
                                                              setTooltipContent={setTooltipContent}
                                                              setShowTooltip={setShowTooltip}/>
                                        </a>
                                        </td>
                                        {absencePeriod.takableWithLimit ? <td>{rowRecap.usableLimit}</td>: ""}
                                        {absencePeriod.takableWithLimit ? <td>{rowRecap.usableTaken}</td>: ""}
                                        <td>{rowRecap.consumedComplationBefore}</td>
                                        <td>{rowRecap.consumedComplationAbsence}</td>
                                        <td>{rowRecap.consumedComplationNext}</td>
                                      </tr>
                                  ))}

                                  </React.Fragment>
                                ))}
                              </tbody>
                            </table>
                           </>

                         listTwo = <>
                          <li className="list-group-item">
                           <p>
                             {elemTwo}
                           </p>
                           <p>
                              {elemThree}
                           </p>
                              {elemFour}
                           </li>
                           </>

                     return <>
                            {listOne}
                            {listTwo}
                            </>
  })

  let groupOption = <>
  {data.groups.map((g) => <option key={g.id} value={g.id}>{g.description}</option>)}
  </>

  return (<>
  <h2>{data.periodChain.periods[0].person.name} {data.periodChain.periods[0].person.surname} - Controllo assenze con limiti e completamenti</h2>
  <br/>
  <div className="container">
  <div>
  <label>Tipologia Assenza&nbsp;&nbsp;</label>
    <select value={groupAbsenceTypeId} onChange={handleChange}>
      {groupOption}
    </select>
  </div>
  <br/>

    <ul className="list-group">
    {content}
    </ul>

    <button onClick={handleButtonClick}>Vai alle timbrature del mese</button>

  </div>

  </>
  )

}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default AbsencesGroups