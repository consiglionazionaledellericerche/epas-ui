import React, { useState } from "react";
import { faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PanelAccordion = ({ open, title, children }) => {

  const [isOpen, setIsOpen] = useState(open);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="panel panel-info">
      {/* Panel Heading */}
      <div className="panel-heading" onClick={togglePanel} style={{ cursor: "pointer" }}>
        <h4 className="panel-title">
          {title}{" "}
          <span className="pull-right">
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronUp}/>
            ) : (
              <FontAwesomeIcon icon={faChevronDown}/>
            )}
          </span>
        </h4>
      </div>

      {/* Panel Body */}
      {isOpen && <div className="panel-body">{children}</div>}
    </div>
  );
};

export default PanelAccordion;
