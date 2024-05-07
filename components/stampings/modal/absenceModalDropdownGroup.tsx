import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CategoryTab } from "../../../types/categoryTab";

interface AbsenceModalDropdownGroupProps {
 data: AbsenceForm;
}

const AbsenceModalDropdownGroup: React.FC<AbsenceModalDropdownGroupProps> = ({
    data
  }) => {
  // Definisci lo stato per tenere traccia del valore selezionato
  const [selectedValue, setSelectedValue] = useState('');

  // Funzione per gestire il cambiamento di selezione
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
// * Utilizza l'elemento <select> per creare il menu a discesa *//
      {/* Visualizza il valore selezionato */}
  return (
      <>
      <h2>Scegli un'opzione:</h2>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option></option>
        {Object.values(data.groupsByCategory).map((elem) => {
           console.log("ELEM>>>>", elem);
  	    }
      </select>
      {selectedValue && <p>Hai selezionato: {selectedValue}</p>}
    </>
  );
}

export default AbsenceModalDropdownGroup;