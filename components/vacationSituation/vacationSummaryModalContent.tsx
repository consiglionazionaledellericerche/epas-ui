import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InfoTot from './modalSummary/infoTot'
import DateUse from './modalSummary/dateUse'
import DateReduction from './modalSummary/dateReduction'
import CalcTot  from './modalSummary/calcTot'
import CalcAcc  from './modalSummary/calcAcc'
import {PersonVacationSummary} from "../../types/personVacationSummary"

interface VacationSummaryModalContentProps {
  data: PersonVacationSummary;
  parameters:string;
}

const VacationSummaryModalContent: React.FC<VacationSummaryModalContentProps> = ({
data,
parameters
  }) => {

    return( <>

        <Tabs
              defaultActiveKey="infoTot"
              id="summaryVacationTabs"
              className="mb-3"
            >
              <Tab eventKey="infoTot" title="Riepilogo">
                <InfoTot data={data.vacationSummary}/>
              </Tab>
              <Tab eventKey="dateUse" title="Date Utilizzo">
                <DateUse data={data.vacationSummary}/>
              </Tab>
              {!data.vacationSummary.postPartumisEmpty ? (
                <Tab eventKey="dateReduction" title="Date Riduzione">
                  <DateReduction data={data.vacationSummary}/>
                </Tab>
              ) : ('')}

              <Tab eventKey="calcTot" title="Calcolo Giorni Totali">
                <CalcTot data={data.vacationSummary}/>
              </Tab>
              <Tab eventKey="calcAcc" title="Calcolo Giorni Maturati">
                  <CalcAcc data={data.vacationSummary}/>
              </Tab>
              </Tabs>
            </>
    );
}

export default VacationSummaryModalContent