import React, { useEffect, useState } from 'react';
import Select, { Styles } from 'react-select';
import { useRequest } from "../../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { CustomSession } from "../../../types/customSession";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import {useTranslations} from 'next-intl';

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

interface ModifiedSelectedOption {
  value: any;
  label: any;
  from: any; // Aggiungi il campo personalizzato
}

interface DropDownElementProps {
typeElem: string;
data: AbsenceForm;
onChange: (elementOption: ModifiedSelectedOption) => void;
}

const DropDownElement: React.FC<DropDownElementProps> = ({
typeElem,
data,
onChange
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState<ModifiedSelectedOption | null>(null);
  const t = useTranslations('Message');


useEffect(() => {
  let formattedOptions;
  let selectedOption;

  if (typeElem === "ABSENCE") {
    if (data.absenceTypes.length > 0) {
      let options = data.absenceTypes.map((item) => ({
        value: item.code,
        label: item.code + " - " + item.description,
        from: typeElem
      }));
      formattedOptions = [
        {
          label: "Inserimento Automatico",
          options: [
            {
              value: null,
              label: "Codice selezionato da ePAS",
            },
          ],
        },
        {
          label: "Codice Specifico",
          options: options,
        },
      ];
      console.log("absenceTypeSelected", data.absenceTypeSelected);
      if (data.absenceTypeSelected == null)
      {      selectedOption = {
               value: null,
               label: "Codice selezionato da ePAS",
               from: typeElem
             };
      }
      else {
            selectedOption = {
                           value: data.absenceTypeSelected.code,
                           label: data.absenceTypeSelected.code + " - " + data.absenceTypeSelected.description,
                           from: typeElem
                         };
      }

    }
  } else if (typeElem === "GROUPABS") {
    if (Object.keys(data.groupsByCategory).length > 0) {
      formattedOptions = Object.entries(data.groupsByCategory).map(
        ([category, values]) => ({
          label: category,
          options: values.map((item) => ({
            value: item.name,
            label: item.description,
            from: typeElem
          })),
        })
      );

      selectedOption = {
        value: data.groupSelected.name,
        label: data.groupSelected.description,
        from: typeElem
      };
    }
  } else if (typeElem === "JUSTIFYTYPE") {
    if (data.justifiedTypes.length > 0) {
      let options = data.justifiedTypes.map((item) => ({
        value: item,
        label: t(item),
        from: typeElem
      }));
      formattedOptions = [{ options: options }];

      selectedOption = {
        value: data.justifiedTypeSelected,
        label: t(data.justifiedTypeSelected),
        from: typeElem
      };
    }
  }

  if (formattedOptions) {
    setOptions(formattedOptions);
    setSelectedOption(selectedOption);
  }

}, [typeElem, data.absenceTypes, data.absenceTypeSelected, data.groupsByCategory, data.groupSelected, data.justifiedTypes, data.justifiedTypeSelected]);

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
