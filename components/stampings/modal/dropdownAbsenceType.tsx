import React, { useEffect, useState } from 'react';
import Select, { Styles } from 'react-select';
import { useRequest } from "../../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { CustomSession } from "../../../types/customSession";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

const customStyles: Styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px', // Dimensione del testo
  }),
  groupHeading: (provided, state) => ({
    ...provided,
    fontSize: '14px', // Dimensione del testo più grande per l'optgroup
    fontWeight: 'bold', // Grassetto per l'optgroup
  }),
};

interface DropdownAbsenceTypeProps {
data: AbsenceForm;
onChange: (selectedOption: {label: string, value: number}) => void;
 }

const DropdownAbsenceType: React.FC<DropdownAbsenceTypeProps> = ({
data,
onChange
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState<{ value: any; label: any; } | null>(null);

  console.log(data.absenceTypes);

  useEffect(() => {
      const formattedOptions = data.absenceTypes.map((item) => ({
          value: item.id,
          label: item.code + " - " +item.description,
        }
      ));
      setOptions([{
                   label: "Inserimento Automatico",
                   options: [{
                               value: null,
                               label: "Codice selezionato da ePAS",
                             }]
                   },
                   {
                    label: "Codice Specifico",
                    options: formattedOptions}
               ]);

      setSelectedOption({
        value: null,
        label: "Codice selezionato da ePAS",
      } as { value: any; label: any; });
    }, [data.absenceTypes, data.absenceTypeSelected]);

    const handleSelectChange = (option: any) => {
      setSelectedOption(option);
      onChange(option);
    };

    return (
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        isSearchable={true}
        styles={customStyles}
      />
    );
};

export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
}
export default DropdownAbsenceType;
