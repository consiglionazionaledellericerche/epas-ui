import React, {useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MonthRecap } from "../../types/monthRecap";
import AbsencesShow from "./absencesShow";
import AbsenceModal from "./modal/absence/absenceModal";
import StampingModal from "./modal/stamping/stampingModal";
import StampingsTemplate from "./stampingsTemplate";
import TimeAtWorkDifferenceProgressive from "./timeAtWorkDifferenceProgressive";
import MealTicketShow from "./mealTicketShow";
import DateUtility from "../../utils/dateUtility";
import { fetchData } from './modal/apiUtils';
import Alert from '../miscellanous/alert';
import { secureCheck } from '../../utils/secureCheck';

const defaultMonthRecap: MonthRecap = {};

interface StampingsTableProps {
    monthRecap: MonthRecap;
    year: number;
    month: number;
}

const StampingsTable: React.FC<StampingsTableProps> = ({
    monthRecap,
    year,
    month
  }) => {
    const [titleAbsenceModal, setAbsenceTitleModal] = useState("");
    const [showAbsenceModal, setShowAbsenceModal] = useState(false);
    const [showInsertStamping, setShowInsertStamping] = useState(false);
    const [showEditStamping, setShowEditStamping] = useState<boolean>(monthRecap.canEditStampings ?? false);
    const [parametersAbsence, setAbsenceParameters] = useState({});
    const [monthRecapData, setMonthRecapData] = useState(monthRecap);
    const [titleStampingModal, setStampingTitleModal] = useState("");
    const [showStampingModal, setShowStampingModal] = useState(false);
    const [refreshStampingModal, setRefreshStampingTable] = useState(false);
    const [parametersStamping, setStampingParameters] = useState({});

    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('SUCCESS');
    const [alertMessage, setAlertMessage] = useState('');

    const showError = (message:string) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTypeAlert("ERROR");
        setTimeout(() => setShowAlert(false), 5000); // nascondo dopo 5 secondi
      };

    const personId = monthRecap.personId;

    useEffect(() => {
    setMonthRecapData(monthRecap);
    }, [monthRecap]);

    useEffect(() => {
        let isMounted = true;  // Flag per sapere se il componente è ancora montato
        if (personId){
          async function checkSecure() {
            let paramsSC = {'method':'GET',
                          'path':'/rest/v4/stampings/insert',
                          'entityType':'Person',
                          'id':personId};
            var canInsertStampingResult = await secureCheck(paramsSC);

            paramsSC = {'method':'GET',
                          'path':'/rest/v4/stampings/edit',
                          'entityType':'Person',
                          'id':personId};
            var canEditStampings = await secureCheck(paramsSC);
            setShowEditStamping(canEditStampings);

            paramsSC = {'method':'POST',
                          'path':'/rest/v4/stampings',
                          'entityType':'Person',
                          'id':personId};
            var canSaveStampingResult = await secureCheck(paramsSC);

            paramsSC = {'method':'POST',
                      'path':'/rest/v4/stampings/saveOffSite',
                      'entityType':'Person',
                      'id':personId};
            var canInsertOffSiteTabResult = await secureCheck(paramsSC);
            var showInsertStampingResult = canInsertStampingResult && (canSaveStampingResult || canInsertOffSiteTabResult);

            if (isMounted && showInsertStampingResult !== showInsertStamping) {  // Assicura che il componente sia ancora montato
              setShowInsertStamping(showInsertStampingResult);
            }
          }
          checkSecure();
        }
        return () => {
                isMounted = false;  // Imposta a false quando il componente viene smontato
            };
    }, [personId,showInsertStamping]);

    function setModalParam(modalType:string, pdr:any){
      let day = DateUtility.formatDateDay(pdr.personDay.date);
      let date = DateUtility.textToDate(parseInt(day),month-1,year);
      let personId = pdr.personDay.personId;
      if (modalType == 'Absence'){
        setShowStampingModal(false);
        setShowAbsenceModal(true);
        setAbsenceParameters({'id':personId, 'from':date});
        setAbsenceTitleModal("");
      }
      else if (modalType == 'Stamping'){
        setShowAbsenceModal(false);
        setShowStampingModal(showInsertStamping);
        setStampingParameters({'personId':personId, 'date':date, 'mode':'insert'});
        setStampingTitleModal("");
      }
    }

    function setEditModalParam(stampId:number){
       setStampingParameters({'personId':personId, 'stampingId':stampId, 'mode':'edit'});
       setShowAbsenceModal(false);
       setShowStampingModal(showEditStamping);
       setStampingTitleModal("");
    }

    const closeModalStamping= () => {
      setShowStampingModal(false);
      setRefreshStampingTable(true);
    }

    useEffect(() => {
        if (refreshStampingModal){
            const parameters = personId ? `personId=${personId}&year=${year}&month=${month}` : `year=${year}&month=${month}`
            setMonthRecapData(defaultMonthRecap);
            setRefreshStampingTable(false)
            const url = `/api/rest/v4?endpoint=monthrecaps&${parameters}`;
            async function getData() {
              var res = await fetchData(url, "", null);
              setMonthRecapData(res.data);
            }
            getData();
        }
      }, [refreshStampingModal, personId, year, month]);
    return (<>
           <AbsenceModal
                       title={titleAbsenceModal}
                       tmpshow={showAbsenceModal}
                       close={() => setShowAbsenceModal(false)}
                       parameters={parametersAbsence} />
           <StampingModal
                       title={titleStampingModal}
                       tmpshow={showStampingModal}
                       close={() => closeModalStamping()}
                       parameters={parametersStamping} />
            <Table id="tabellonetimbrature" bordered hover>
            <caption className="sr-only">Riepilogo mensile </caption>
            <thead>
            <tr>
                <th className="group-single">Giorno</th>
                <th className="group-single">Buono <br/>Pasto</th>
                <th className="invisible"></th>
                <th className="group-single">Codice <br/>assenza</th>
                {
                [...Array(monthRecapData.numberOfInOut),].map((value: undefined, index: number) => (
                    <React.Fragment key={`stampings-${index+1}`}>
                    <th className="group-left">{index+1}<sup>a</sup> <br/>entrata</th>
                    <th className="group-right">{index+1}<sup>a</sup> <br/>uscita</th>
                    </React.Fragment>
                    ))
                }
                {showInsertStamping ? <th className="group-single">Inserisci<br/>timbratura</th>: <th className="invisible"></th>}
                <th className="invisible"></th>
                <th className="group-single">Tempo<br />lavoro</th>
                <th className="group-single">Diffe-<br />renza</th>
                <th className="group-single">Progres-<br />sivo</th>
                <th className="group-single">Tipo<br />Orario</th>
            </tr>
            </thead>
            <tbody>
            {monthRecapData.daysRecap?.map((pdr) => (
                    <tr key={`tr-${pdr.personDay.date}`} className={pdr.ignoreDay ? 'ignoreDay' : ''}>
                        <td className={pdr.personDay.holiday ? 'festivi' : 'capitalized'}>
                            {DateUtility.formatDateShort(pdr.personDay.date)}
                        </td>

                        <MealTicketShow personDayRecap={pdr} />

                        <th className="invisible"></th>

                        <td className="assenza default-single">
                        {
                         pdr.personDay.absences.length != 0 ?
                        (
                          <>
                          <AbsencesShow absences={pdr.personDay.absences}
                          year={year}
                          month={month}
                          day={DateUtility.formatDateDay(pdr.personDay.date)}/>
                          </>
                        ):
                        (
                        <>
                          <a id="new-abscence-code" data-async-modal="#defaultModal" href="#" onClick={() => setModalParam('Absence',pdr)}>
                            __
                          </a>
                          </>
                        )}
                        </td>

                        <StampingsTemplate personDayRecap={pdr}
                        setEditModalParam={setEditModalParam}
                        canEditStampings={showEditStamping} />
                        <td>
                        {
                          showInsertStamping && !pdr.personDay.future ?
                          (
                          <a id="new-stamping" data-async-modal="#defaultModal" href="#" onClick={() => setModalParam('Stamping',pdr)}>
                          +++
                          </a>):''
                          }
                        </td>
                        <td className="invisible"></td>
                        <TimeAtWorkDifferenceProgressive personDayRecap={pdr} />
                        <td>{pdr.wttd?.workingTimeType?.description}</td>
                    </tr>
                    )
                )
            }
            </tbody>
        </Table>
        </>
    );
}

export default StampingsTable