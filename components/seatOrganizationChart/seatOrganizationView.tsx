import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PanelAccordion from "./panelAccordion";
import DescriptionModal from "./descriptionModal";
import DateUtility from "../../utils/dateUtility";
import { useTranslations } from 'next-intl';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserShow } from "../../types/userShow";
import { SeatOrganizationChart } from "../../types/seatOrganizationChart";

interface UserListType {
  [key: string]: UserShow[];
}

interface RoleListProps {
  data: UserListType;
  trans: (key: string) => string;
  handleRoleSelect: (role: any) => void;
}

const RoleList: React.FC<RoleListProps> = ({ data, trans, handleRoleSelect }) => {
  const [role, setRole] = useState(null);

  return (
    <>
      {Object.entries(data).map(([key, userList]) => (
        <div key={key}>
          {userList.length === 0 ? (
            <div className="alert alert-warning">
              Non è stato ancora impostato alcun {trans(key)}!
            </div>
          ) : (
            <>
              <h4>{trans(key)}</h4>
              <ul className="list-group">
                {userList.map((user) => (
                  <li key={user.id} className="list-group-item clearfix">
                    <span className="label label-primary">{user.fullname}</span>
                    <a
                      className="label label-badge label-info pull-right"
                      href="#"
                      onClick={() => handleRoleSelect(key)}
                      data-async-modal="#modalViewRole"
                      data-webui-popover-hover
                      data-content="Vedi azioni che può compiere"
                    >
                      <strong><FontAwesomeIcon icon={faExclamation}/> Cosa può fare</strong>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </>
  );
};

interface SeatOrganizationViewProps {
        data: SeatOrganizationChart;
}

const SeatOrganizationView: React.FC<SeatOrganizationViewProps> = ({
    data
  }) => {
  const [showModal, setShowModal] = useState(false);
  const [roleModal, setRoleModal] = useState("");

  const trans = useTranslations('Message');

const handleClose = () => {
                     setShowModal(false);
                     setRoleModal("");
                   };

const handleRoleSelect = (role:string) => {
                     if (role) {
                             setRoleModal(role);
                             setShowModal(true);
                           }
                   };
  let content = <>
                  <DescriptionModal tmpshow={showModal} closeModal={handleClose} role={roleModal} />
                  <div className="col-sm-offset-1 col-sm-10" id="uroList">
                      <div className="accordion-group" id="generic">
                        <PanelAccordion open={false} title={`Ruoli di ${data.currentPerson?.surname} ${data.currentPerson?.name} sulla sede`}>
                          <ul className="list-group">
                            {data.roles?.map((role) => (
                                                      <li key={role} className="list-group-item clearfix">
                                                        <span className="label label-primary">{trans(role)}</span>
                                                        <a
                                                          className="label label-badge label-info pull-right"
                                                          href="#"
                                                          onClick={() => handleRoleSelect(role)}
                                                          data-async-modal="#modalViewRole"
                                                          data-webui-popover-hover
                                                          data-content="Vedi azioni che può compiere"
                                                        >
                                                          <strong><FontAwesomeIcon icon={faExclamation}/> Cosa può fare</strong>
                                                        </a>
                                                      </li>
                                                    ))}
                          </ul>
                        </PanelAccordion>

                        <PanelAccordion open={true} title="Altri ruoli in ePAS">
                                        {['seatSupervisors', 'personnelAdmins', 'technicalAdmins', 'registryManagers', 'mealTicketsManagers', 'personnelAdminsMini', 'shiftManagers', 'reperibilityManagers'].map(roleKey => (
                                          <RoleList
                                            key={roleKey}
                                            data={(data[roleKey as keyof SeatOrganizationChart] as { [key: string]: Array<UserShow> }) || {}}
                                            trans={trans}
                                            handleRoleSelect={handleRoleSelect}
                                          />
                                        ))}
                        </PanelAccordion>
                      </div>
                    </div>
                    </>;

  return (
      <>
      <Container fluid>
          <Row>
            <Col sm={1} />
            <Col sm={9}>
          <div className="page-header">
              <h2>Ruoli in ePAS per la sede {data?.currentPerson?.office?.name} </h2>
              <br/>
          </div>
          {content}
            </Col>
            <Col sm={2} />
          </Row>
      </Container>
      </>
  );
}

export default SeatOrganizationView