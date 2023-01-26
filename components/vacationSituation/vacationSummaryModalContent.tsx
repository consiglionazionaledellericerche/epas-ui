import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
                <div></div>
              </Tab>
              <Tab eventKey="date" title="Date Utilizzo">
                <div></div>
              </Tab>
              <Tab eventKey="dateReduction" title="Date Riduzione" disabled>
                <div></div>
              </Tab>
              <Tab eventKey="calcTot" title="Calcolo Giorni Totali">
                <div></div>
              </Tab>
              <Tab eventKey="calcAcc" title="Calcolo Giorni Maturati">
                  <div></div>
              </Tab>
              </Tabs>
            </>
    );
}

export default VacationSummaryModalContent