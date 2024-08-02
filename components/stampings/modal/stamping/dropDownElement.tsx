import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { CustomSession } from "../../../../types/customSession";
import { StampingForm } from "../../../../types/stampingForm";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import {useTranslations} from 'next-intl';

const customStyles: StylesConfig = {
  option: (provided:any, state:any) => ({
    ...provided,
    fontSize: '14px', // Dimensione del testo
  }),
  groupHeading: (provided:any, state:any) => ({
    ...provided,
    fontSize: '14px', // Dimensione del testo più grande per l'optgroup
    fontWeight: 'bold', // Grassetto per l'optgroup
  }),
};

interface ModifiedSelectedOption {
  value: any;
  label: any;
}

interface DropDownElementProps {
data: StampingForm;
onChange: (elementOption: ModifiedSelectedOption) => void;
}

const DropDownElement: React.FC<DropDownElementProps> = ({
data,
onChange
}) => {
  const [options, setOptions] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const t = useTranslations('Message');


useEffect(() => {
  let selectedOption;
  let formattedOptions;
console.log('data.StampTypes.length',data.stampTypes.length);
    if (data.stampTypes && data.stampTypes.length > 0) {
      let options = data.stampTypes.map((item) => ({
                                                      value: item,
                                                      label: item
                                                    })
                                        );
      formattedOptions = [{ options: options }];
      console.log("StampTypes", data.stampTypes);
     selectedOption = {
               value: null,
               label: "-"
             };

    }
    if (formattedOptions) {
        setOptions(formattedOptions);
        setSelectedOption(selectedOption);
      }
  },[data.StampTypes]);

    const handleSelectChange = (selectedOption: any) => {
      onChange(selectedOption);
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
export default DropDownElement;
