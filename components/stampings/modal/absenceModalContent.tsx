import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AbsenceForm } from "../../../types/absenceForm";

interface AbsenceModalContentProps {
  data: AbsenceForm;
  parameters: string;
}

const AbsenceModalContent: React.FC<AbsenceModalContentProps> = ({
data,
parameters
  }) => {
const element =(<span><FontAwesomeIcon icon={faMagnifyingGlass} /> Ricerca Codici</span>);
console.log("data.tabsVisibile", data.tabsVisibile);
    return( <>
            <Tabs
              defaultActiveKey={data.categoryTabSelected.name}
              id="absenceTabs"
              className="mb-3"
            >
              {Object.values(data.tabsVisibile).map((elem) => {
                      return (
                            <Tab eventKey={elem.name} title={elem.description}>
                            {elem.description}
                            </Tab>
                            );
                        })
              }
              <Tab eventKey="FIND_CODE" title={element}>
                Ricerca Codici
              </Tab>
            </Tabs>
            </>
    );
}

export default AbsenceModalContent