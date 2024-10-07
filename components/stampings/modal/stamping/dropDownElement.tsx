import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { CustomSession } from "../../../../types/customSession";
import { StampingForm } from "../../../../types/stampingForm";
import { StampingEditForm } from "../../../../types/stampingEditForm";
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

interface DropDownElementProps {
data: StampingForm | StampingEditForm;
setStampType: (type: string) => void;
}

const DropDownElement: React.FC<DropDownElementProps> = ({
data,
setStampType
}) => {
  const [options, setOptions] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const t = useTranslations('Message');

useEffect(() => {
  let selectedOption;
  let formattedOptions;
    if (data.stampTypes && data.stampTypes.length > 0) {
      let options = data.stampTypes.map((item) => ({
                                                      value: item.name,
                                                      label: item.description
                                                    })
                                        );
      formattedOptions = [{ options: options }];

      if ('stampTypeOpt' in data) {
        selectedOption = {
          value: data.stampTypeOpt?.name || null,
          label: data.stampTypeOpt?.description || null,
        };
      } else {
        // Gestione per il caso in cui data è di tipo StampingForm
        selectedOption = {
          value: null,
          label: null,
        };
      }
    }
    if (formattedOptions) {
        setOptions(formattedOptions);
        setSelectedOption(selectedOption);
      }
  },[data.stampTypes]);

    const handleSelectChange = (selectedOption: any) => {
      setSelectedOption(selectedOption);
      setStampType(selectedOption.value);
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
