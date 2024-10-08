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
        Nessun riepilogo da visualizzare per l'anno selezionato.
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
          const monthIndex = recap.value.month; // Supponiamo che recap.value.month sia un numero da 1 a 12
          const monthId = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString(); // Formatta l'ID del mese
          const monthName = months.find(month => month.id === monthId)?.name; // Trova il nome del mese

          return (
            <tr key={index}>
              <td><strong>{monthName}</strong></td>
              <td>{DateUtility.fromMinuteToHourMinute(recap.value.oreLavorate)}</td>
              <td><em>{DateUtility.fromMinuteToHourMinute(recap.getResidualLastYearInit)}</em></td>
              <td><em>{DateUtility.fromMinuteToHourMinute(recap.value.initMonteOreAnnoCorrente)}</em></td>
              <td>{DateUtility.fromMinuteToHourMinute(
                recap.getResidualLastYearInit + recap.value.initMonteOreAnnoCorrente
              )}</td>
              <td style={{ color: recap.value.progressivoFinaleMese > 0 ? "darkblue" : "darkred" }}>
                {DateUtility.fromMinuteToHourMinute(recap.value.progressivoFinaleMese)}
              </td>
              <td style={{ color: "darkred" }}>
                {DateUtility.toHour(recap.value.straordinarioMinuti)}
              </td>
              <td>
                ({recap.value.recoveryDayUsed})&nbsp;
                <div style={{ color: "darkred", display: "inline" }}>
                  {DateUtility.fromMinuteToHourMinute(recap.value.riposiCompensativiMinutiPrint)}
                </div>
              </td>
              <td><em>{DateUtility.fromMinuteToHourMinute(recap.value.remainingMinutesLastYear)}</em></td>
              <td><em>{DateUtility.fromMinuteToHourMinute(recap.value.remainingMinutesCurrentYear)}</em></td>
              <td style={{ color: "darkblue" }}>
                {DateUtility.fromMinuteToHourMinute(
                  recap.value.remainingMinutesLastYear + recap.value.remainingMinutesCurrentYear
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PersonMonthsHourTable;
