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

interface DropdownGroupTypeProps {
data: AbsenceForm;
onChange: (selectedOption: {label: string, value: number}) => void;
 }

const DropdownGroupType: React.FC<DropdownGroupTypeProps> = ({
data,
onChange
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState<{ value: any; label: any; } | null>(null);

  console.log(data.groupsByCategory);

  useEffect(() => {
      const formattedOptions = Object.entries(data.groupsByCategory).map(([category, values]) => ({
        label: category,
        options: values.map((item) => ({
          value: item.id,
          label: item.description,
        }))
      }));
      setOptions(formattedOptions);

      setSelectedOption({
        value: data.groupSelected.id,
        label: data.groupSelected.description,
      } as { value: any; label: any; });
    }, [data.groupsByCategory, data.groupSelected]);

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
export default DropdownGroupType;
