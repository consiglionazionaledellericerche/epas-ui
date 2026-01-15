import React, { useState } from "react";
import { faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PanelAccordionProps {
  open: boolean;
  title: string;
  children: any;
}

const PanelAccordion: React.FC<PanelAccordionProps> = ({ open, title, children }) => {

  const [isOpen, setIsOpen] = useState(open);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="panel panel-info">
      <div className="panel-heading" onClick={togglePanel} style={{ cursor: "pointer" }}>
        <h4 className="panel-title">
          <span className="pull-left">
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronUp}/>
            ) : (
              <FontAwesomeIcon icon={faChevronDown}/>
            )}
          </span>
          &nbsp;&nbsp;{title}
        </h4>
      </div>
      {isOpen && <div className="panel-body">{children}</div>}
    </div>
  );
};

export default PanelAccordion;
