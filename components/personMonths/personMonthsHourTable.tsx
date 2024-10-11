import React from "react";
import { Table } from "react-bootstrap";
import DateUtility from "../../utils/dateUtility";
import { PersonMonth } from "../../types/personMonth";

interface PersonMonthsHourTableProps {
  personMonthsData: PersonMonth[];
  year: number;
}

const PersonMonthsHourTable: React.FC<PersonMonthsHourTableProps> = ({
  personMonthsData,
  year,
}) => {
  const months = [
    { id: "01", name: "Gennaio" },
    { id: "02", name: "Febbraio" },
    { id: "03", name: "Marzo" },
    { id: "04", name: "Aprile" },
    { id: "05", name: "Maggio" },
    { id: "06", name: "Giugno" },
    { id: "07", name: "Luglio" },
    { id: "08", name: "Agosto" },
    { id: "09", name: "Settembre" },
    { id: "10", name: "Ottobre" },
    { id: "11", name: "Novembre" },
    { id: "12", name: "Dicembre" },
  ];

  if (personMonthsData.length === 0) {
    return (
      <p className="alert-info">
        Nessun riepilogo da visualizzare per l&apos;anno selezionato.
      </p>
    );
  }

  return (
    <Table id="hourRecap" className="table hour-recap table-condensed center">
      <caption className="sr-only">Riepilogo Ore {year}</caption>
      <thead>
        <tr className="warning">
          <th rowSpan={2}>Mese</th>
          <th rowSpan={2}>Ore<br />Lavorate</th>
          <th colSpan={3}>Monte ore inizio mese</th>
          <th rowSpan={2}>Progressivo<br />a fine mese</th>
          <th rowSpan={2}>Ore<br />Straord.</th>
          <th rowSpan={2}>Riposi<br />Comp.</th>
          <th colSpan={3}>Monte ore fine mese</th>
        </tr>
        <tr>
          <th className="warning">Anno<br />passato</th>
          <th className="warning">Anno<br />corrente</th>
          <th className="warning">Totale</th>
          <th className="warning">Anno<br />passato</th>
          <th className="warning">Anno<br />corrente</th>
          <th className="warning">Totale</th>
        </tr>
      </thead>
      <tbody>
        {personMonthsData.map((recap: PersonMonth, index: number) => {
          const monthIndex = recap?.value?.month ?? 0; // Usa 0 come valore predefinito
          const monthId = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString(); // Formatta l'ID del mese
          const monthName = months.find(month => month.id === monthId)?.name || 'Unknown'; // Usa 'Unknown' se il mese non è trovato

          const oreLavorate = DateUtility.fromMinuteToHourMinute(recap?.value?.oreLavorate ?? 0);
          const residualLastYearInit = DateUtility.fromMinuteToHourMinute(recap?.getResidualLastYearInit ?? 0);
          const initMonteOreAnnoCorrente = DateUtility.fromMinuteToHourMinute(recap?.value?.initMonteOreAnnoCorrente ?? 0);
          const totalResidualAndInit = DateUtility.fromMinuteToHourMinute(
            (recap?.getResidualLastYearInit ?? 0) + (recap?.value?.initMonteOreAnnoCorrente ?? 0)
          );
          const progressivoFinaleMese = DateUtility.fromMinuteToHourMinute(recap?.value?.progressivoFinaleMese ?? 0);
          const straordinarioMinuti = DateUtility.toHour(recap?.value?.straordinarioMinuti ?? 0);
          const recoveryDayUsed = recap?.value?.recoveryDayUsed ?? 0;
          const riposiCompensativiMinutiPrint = DateUtility.fromMinuteToHourMinute(recap?.value?.riposiCompensativiMinutiPrint ?? 0);
          const remainingMinutesLastYear = DateUtility.fromMinuteToHourMinute(recap?.value?.remainingMinutesLastYear ?? 0);
          const remainingMinutesCurrentYear = DateUtility.fromMinuteToHourMinute(recap?.value?.remainingMinutesCurrentYear ?? 0);
          const totalRemainingMinutes = DateUtility.fromMinuteToHourMinute(
            (recap?.value?.remainingMinutesLastYear ?? 0) + (recap?.value?.remainingMinutesCurrentYear ?? 0)
          );

          return (
            <tr key={index}>
              <td><strong>{monthName}</strong></td>
              <td>{oreLavorate}</td>
              <td><em>{residualLastYearInit}</em></td>
              <td><em>{initMonteOreAnnoCorrente}</em></td>
              <td>{totalResidualAndInit}</td>
              <td style={{ color: (recap?.value?.progressivoFinaleMese ?? 0) > 0 ? "darkblue" : "darkred" }}>
                {progressivoFinaleMese}
              </td>
              <td style={{ color: "darkred" }}>
                {straordinarioMinuti}
              </td>
              <td>
                ({recoveryDayUsed})&nbsp;
                <div style={{ color: "darkred", display: "inline" }}>
                  {riposiCompensativiMinutiPrint}
                </div>
              </td>
              <td><em>{remainingMinutesLastYear}</em></td>
              <td><em>{remainingMinutesCurrentYear}</em></td>
              <td style={{ color: "darkblue" }}>
                {totalRemainingMinutes}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PersonMonthsHourTable;
