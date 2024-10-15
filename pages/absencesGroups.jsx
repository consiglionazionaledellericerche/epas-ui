import { useRequest } from "../request/useRequest"
import { useRouter } from 'next/router'
import React, { useContext, useState, useEffect } from 'react'
import { CurrentDateContext, CurrentDateProvider } from '../contexts/currentDateContext'
import { Spinner } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]';
import AbsencesYearlyRecapView from '../components/absences/absencesYearlyRecapView'
import AbsencePopOver from "../components/absences/absencePopOver";
import DateUtility from "../utils/dateUtility";
import { useTranslations } from 'next-intl';

function AbsencesGroups() {
  const router = useRouter();

// Accesso ai parametri dalla query
  let from = router.query.from;
  let groupAbsenceTypeId = router.query.groupAbsenceTypeId;
  let personId = router.query.personId;
  const currentDate = useContext(CurrentDateContext);

  const { data: session, status } = useSession();

  const [tooltipContent, setTooltipContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);

  const t = useTranslations('Message');

  const handleChange = (event) => {
    let groupAbsenceTypeId = event.target.value;
    let parameters1 = personId ? `id=${personId}&from=${from}&groupAbsenceTypeId=${groupAbsenceTypeId}` : `from=${from}&groupAbsenceTypeId=${groupAbsenceTypeId}`
    router.push(`/absencesGroups?${parameters1}`);
  };

    const handleChangeDate = (event) => {
      let from = event.target.value;
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

  console.log("absencegroup params", parameters);
  const {data, error} = useRequest('/absencesGroups/groupStatus', parameters);

  if (error) return (<div>Impossibile caricare la situazione delle assenze</div>);
  if (!data) return <React.Suspense fallback={<Spinner />} />

console.log('data groupStatus --- ',data);
 let content = data.periodChain.periods.map((absencePeriod, index) => {
                         let listOne
                         let listTwo
                           listOne = <>
                           <li key={uuidv4()} className="list-group-item list-group-item-info">
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
                                                                      <strong>Tipo periodo</strong> {t(absencePeriod.groupAbsenceType.periodType)}<br/>
                                                                      <strong>Validità periodo</strong> {DateUtility.formatDate(absencePeriod.from)} - {DateUtility.formatDate(absencePeriod.to)}<br/>
                                                                      <strong>Totale utilizzabile </strong>
                                                                      {DateUtility.formatAmount(absencePeriod.periodTakableAmount, absencePeriod.takeAmountType)}
                                                                      </> : ""

                        absencePeriod.takableWithLimit ? elemThree = <>
                                  <i className="fa fa-exclamation-circle" aria-hidden="true"></i> Rimangono
                                  <strong> <span className="text-success">{DateUtility.formatAmount(absencePeriod.remainingAmount, absencePeriod.takeAmountType)}</span> </strong>
                                  da utilizzare entro il <strong className="text-success">{DateUtility.formatDate(absencePeriod.to)}</strong>
                                  </> : ""

                           absencePeriod.takableWithLimit ?
                                            thElem = <>
                                            <th>Limite<br/>Utilizzabile</th>
                                            <th>Limite<br/>Consumato</th>
                                          </> : ""

                            Object.keys(absencePeriod.daysInPeriod).length === 0 ?
                                elemFour = <><p><em>Non ci sono assenze utilizzate per questo gruppo nel periodo selezionato.</em></p></> :
                           elemFour = <>
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
                                 {Object.entries(absencePeriod.daysInPeriod).map(([date, dp], index) => (
                                   <React.Fragment key={`${dp.day}-${index}`}>
                                       {dp.allTemplateRows.map((rowRecap, idx) => (
                                       <tr key={`${rowRecap.id}-${idx}`} className={rowRecap.beforeInitialization ? "bg-grey" : ""}>
                                         <td>{rowRecap.date ? DateUtility.formatDate(rowRecap.date) : ""}</td>
                                         <td>
                                         <a href="#" onClick={(e) => e.preventDefault()}>
                                         <AbsencePopOver showGroup={false}
                                                         key={rowRecap.id}
                                                         absElem={rowRecap.absence}
                                                         day={DateUtility.formatDateDay(rowRecap.date)} />
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
                           <li key={uuidv4()} className="list-group-item">
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
  {data.groups?.map((g, index) => <option key={`${g.id}-${index}`} value={g.id}>{g.description}</option>)}
  </>

  let periodInfo;
  if (!data || !data.periodChain || !data.periodChain.periods) {
    periodInfo = "";
  }
  else {
    periodInfo = <h2>
    {data.periodChain.periods[0].person.name} {data.periodChain.periods[0].person.surname}
    - Controllo assenze con limiti e completamenti</h2>
  }
  //setValueDate(data.from);
//se l'utente è admin e c'è categoryswitcher
  let dataChange = data.admin && data.categorySwitcher ?
                  <div className="form-group">
                  <label className="col-sm-3 control-label">date</label>
                  <div className="col-sm-6">
                  <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={from}
                  onChange={handleChangeDate}/>
                  </div>
                  </div>
                  : '';

  return (<>
  {periodInfo}
  <br/>
  <div className="container">

    {dataChange}
    <div className="form-group">
      <label className="col-sm-3 control-label">Tipologia Assenza&nbsp;&nbsp;</label>
      <div className="col-sm-6">
        <select className="form-control" value={groupAbsenceTypeId} onChange={handleChange}>
          {groupOption}
        </select>
      </div>
  </div>
  <br/>

    <ul key={uuidv4()} className="list-group">
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