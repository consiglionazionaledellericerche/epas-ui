import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { CustomSession } from "../../../../types/customSession";
import { AbsenceForm } from "../../../../types/absenceForm";
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
  const [options, setOptions] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const t = useTranslations('Message');


useEffect(() => {
  let formattedOptions;
  let selectedOption;

  if (typeElem === "ABSENCE") {
    if (data.absenceTypes && data.absenceTypes.length > 0) {
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
    if (data.groupsByCategory && Object.keys(data.groupsByCategory).length > 0) {
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

      let valueData = data.groupSelected ? data.groupSelected.name : "";
      let descrData = data.groupSelected ? data.groupSelected.description : "";
      selectedOption = {
        value: valueData,
        label: descrData,
        from: typeElem
      };
    }
  } else if (typeElem === "JUSTIFYTYPE") {
    if (data.justifiedTypes && data.justifiedTypes.length > 0) {
      let options = data.justifiedTypes.map((item) => ({
        value: item,
        label: t(item),
        from: typeElem
      }));
      formattedOptions = [{ options: options }];

      let valueData = data.justifiedTypeSelected ? data.justifiedTypeSelected : "";

      selectedOption = {
        value: valueData,
        label: t(valueData),
        from: typeElem
      };
    }
  } else if (typeElem === "HOUR") {
       if (data.selectableHours && data.selectableHours.length > 0) {
         let options = data.selectableHours.map((item) => ({
           value: item,
           label: item,
           from: typeElem
         }));
         formattedOptions = [{ options: options }];

      let valueData = data.hours ? data.hours : "";

         selectedOption = {
           value: valueData,
           label: valueData,
           from: typeElem
         };
       }
     } else if (typeElem === "MINUTE") {
         if (data.selectableMinutes && data.selectableMinutes.length > 0) {
           let options = data.selectableMinutes.map((item) => ({
             value: item,
             label: item,
             from: typeElem
           }));
           formattedOptions = [{ options: options }];

            let valueData = data.minutes ? data.minutes : "";

           selectedOption = {
             value: valueData,
             label: valueData,
             from: typeElem
           };
         }
     }

  if (formattedOptions) {
    setOptions(formattedOptions);
    setSelectedOption(selectedOption);
  }
}, [typeElem, data.absenceTypes, data.absenceTypeSelected,
 data.groupsByCategory, data.groupSelected, data.justifiedTypes,
 data.justifiedTypeSelected, data, t]);

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
