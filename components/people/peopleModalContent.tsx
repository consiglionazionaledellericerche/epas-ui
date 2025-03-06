import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { CustomSession } from "../../../types/customSession";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import DateUtility from "../../utils/dateUtility";

library.add(faCheck, faTrash);

interface PeopleModalContentProps {
  personId: number;
  modalType: string;
  handleClose: () => void;
}

const PeopleModalContent: React.FC<PeopleModalContentProps> = ({
  personId,
  modalType,
  handleClose
}) => {
  const [data, setData] = useState<any>(null);
  const translation = useTranslations('Message');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession() as CustomSession;
        const accessToken = session?.accessToken ?? '';

        const parameters = `personId=${personId}`;
        const endpoint = modalType === "WT" ? 'showCurrentContractWorkingTimeType' : 'showCurrentVacation';
        const url = `/api/rest/v4?endpoint=people%2F${endpoint}&${parameters}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.error("[OtherModalContent] Errore nella chiamata API:", response);
        if (!response.ok) {
          throw new Error("Errore nel recupero dati OtherModalContent---");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("[OtherModalContent] Errore nella chiamata API:", error);
      }
    };

    fetchData();
  }, [personId]);

  if (!data) return <p>Caricamento...</p>;

  if (modalType === "WT"){
    const wtt = data.workingTimeType ?? {};
    const cwtt = data.contractWorkingTimeType ?? {};

    return (
      <>
        <div className="alert alert-success">
          Validità orario attuale:&nbsp;
          <strong>Dal</strong> {DateUtility.formatDate(cwtt.beginDate)}
          {cwtt.endDate && <> <strong>Al:</strong> {DateUtility.formatDate(cwtt.endDate)}</>}
        </div>

        <table className="table table-condensed table-bordered text-center">
          <thead>
            <tr>
              <th className="center" ><h4><span className="label label-primary">{wtt.description}</span></h4></th>
              <th className="center" >Lun</th>
              <th className="center" >Mar</th>
              <th className="center" >Mer</th>
              <th className="center" >Gio</th>
              <th className="center" >Ven</th>
              <th className="center" >Sab</th>
              <th className="center" >Dom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="center">Tempo lavoro</td>
              {wtt.workingTimeTypeDays?.map((e: any, index: number) => (
                <td key={`working-${index}`} className="first-line">
                  {DateUtility.fromMinuteToHourMinute(e.workingTime) ?? '-'}
                </td>
              ))}
            </tr>

            <tr>
              <td className="center">Tempo minimo per intervallo pranzo</td>
              {wtt.workingTimeTypeDays?.map((e: any, index: number) => (
                <td key={`meal-${index}`} className="first-line">{DateUtility.fromMinuteToHourMinute(e.mealTicketTime) ?? '-'}</td>
              ))}
            </tr>

            <tr>
              <td className="center">Intervallo pranzo</td>
              {wtt.workingTimeTypeDays?.map((e: any, index: number) => (
                <td key={`break-${index}`} className="first-line">{DateUtility.fromMinuteToHourMinute(e.breakTicketTime) ?? '-'}</td>
              ))}
            </tr>

            <tr>
              <td className="center">Giorno festivo</td>
              {wtt.workingTimeTypeDays?.map((e: any, index: number) => (
                <td key={`holiday-${index}`} className="first-line">
                  {e.holiday ? <FontAwesomeIcon icon={faCheck} /> : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
      const vp = data ?? {};
      return (
            <>
            <div className="alert alert-success">Validità piano ferie attuale:
              <strong>Dal </strong>{DateUtility.formatDate(vp.beginDate)}
              {vp.endDate && <> <strong>Al</strong> {DateUtility.formatDate(vp.endDate)}</>}
            </div>

            <table className="table table-condensed table-bordered text-center">
            <thead>
              <tr>
                <th className="center">Nome</th>
                <th className="center">Giorni ferie</th>
                <th className="center">Giorni permesso</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{vp.label}</td>
                <td>{vp.vacationCodeEnum.vacations}</td>
                <td>{vp.vacationCodeEnum.permissions}</td>
              </tr>
              </tbody>
            </table>
            </>);
  }
};

export default PeopleModalContent;
