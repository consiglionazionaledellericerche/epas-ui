import React from "react";
import { Col, Row } from 'react-bootstrap';
import {useTranslations} from 'next-intl';
import { RecapReperibility } from "../../types/recapReperibility";

interface RecapCalendarProps {
    recapData: RecapReperibility;
}

const RecapCalendar: React.FC<RecapCalendarProps> = ({
    recapData
  }) => {

    const t = useTranslations('Message');

    let classNameApproved1 = recapData?.reperibilityTypeMonth?.approved ? "list-group-item-warning":"list-group-item-info"
    let classNameApproved2 = recapData?.reperibilityTypeMonth?.approved ? "list-group-item-warning":"list-group-item-danger"
    let classNameRecap1 = `list-group-item clearfix ${classNameApproved1}`;
    let classNameRecap2 = `list-group-item clearfix ${classNameApproved2}`;
    let divApproved = recapData?.reperibilityTypeMonth?.approved ? (
                        <>
                        <div>
                        <em className="text-muted">{t("competencesApproved")}</em>
                      </div>
                      <br/></>) :
                        (<><div>
                          <em className="text-muted">{t("competencesToBeApproved")}</em>
                        </div>
                        <br/></>);
    return(
    <>
      <Col md={2}>
      <div id="external-events" style={{
                                          padding: "10px",
                                          width: "80%",
                                          height: "auto",
                                          maxHeight: "-webkit-fill-available"
                                        }}>
        <h3>Giorni di {recapData.reperibility?.monthlyCompetenceType?.name} feriale validi</h3>
        <br/>
        <ul className="list-group">
          {recapData.workDaysReperibilityCalculatedCompetences?.map(recap => (
          <li key={`li-${recap.fullname}-1`} className={classNameRecap1}>
            {recap.fullname} <span className="label label-info pull-right">{recap.count}</span>
          </li>
          ))}
        </ul>
        <br/>
        <h3>Giorni di {recapData.reperibility?.monthlyCompetenceType?.name} festiva validi</h3>
        <br/>
        <ul className="list-group">
          {recapData.holidaysReperibilityCalculatedCompetences?.map(recap => (
          <li key={`li-${recap.fullname}-2`} className={classNameRecap2}>
            {recap.fullname} <span className="label label-danger pull-right">{recap.count}</span>
          </li>
          ))}
        </ul>
        <br/>
        {divApproved}
      </div>
    </Col>
     </>
    );
    }

export default RecapCalendar