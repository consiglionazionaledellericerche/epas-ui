import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InfoTot from './modalSummary/infoTot'
import DateUse from './modalSummary/dateUse'
import DateReduction from './modalSummary/dateReduction'
import CalcTot  from './modalSummary/calcTot'
import CalcAcc  from './modalSummary/calcAcc'

interface VacationSummaryModalContentProps {
  data;
}

const VacationSummaryModalContent: React.FC<VacationSummaryModalContentProps> = ({
data
  }) => {
    console.log('VacationSummaryModalContent', data);

    return( <>

        <Tabs
              defaultActiveKey="infoTot"
              id="summaryVacationTabs"
              className="mb-3"
            >
              <Tab eventKey="infoTot" title="Riepilogo">
                <InfoTot data={data}/>
              </Tab>
              <Tab eventKey="dateUse" title="Date Utilizzo">
                <DateUse data={data}/>
              </Tab>
              {!data.postPartumisEmpty ? (
                <Tab eventKey="dateReduction" title="Date Riduzione">
                  <DateReduction data={data}/>
                </Tab>
              ) : ('')}

              <Tab eventKey="calcTot" title="Calcolo Giorni Totali">
                <CalcTot data={data}/>
              </Tab>
              <Tab eventKey="calcAcc" title="Calcolo Giorni Maturati">
                  <CalcAcc data={data}/>
              </Tab>
              </Tabs>
            </>
    );
}

export default VacationSummaryModalContent