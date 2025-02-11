import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"
import { CustomSession } from "../../types/customSession";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../pages/api/auth/[...nextauth]';

interface DropItem {
  id:number,
  description:string
}

const DropdownReperibilityType: React.FC<{ onChange: (selectedOption: {label: string, value: number}) => void, apiUrl:string }> = ({ onChange,apiUrl }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState<{ value: any; label: any; } | null>(null);

  const { data: session, status } = useSession();
  let accessToken: string | null = null;

  if (status === "authenticated" && session) {
    accessToken = (session as CustomSession).accessToken;
  }

  useEffect(() => {
      // Esegui la chiamata API per ottenere le opzioni
      fetch(apiUrl, {
                          method: 'GET',
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              Authorization: 'Bearer '+accessToken
                          }
                      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Errore nella chiamata API');
          }
          return response.json();
        })
        .then((data) => {
          const formattedOptions = data.reperibilities.map((item:DropItem) => ({
            value: item.id,
            label: item.description,
          }));
          setOptions(formattedOptions);
          setSelectedOption({
            value: data.reperibilitySelected.id,
            label: data.reperibilitySelected.description,
          } as { value: any; label: any; });

        })
        .catch((error) => {
          console.error('Errore nella chiamata API:', error);
        });
    }, [apiUrl, accessToken]);

  const handleSelectChange = (option:any) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      isSearchable={true}
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
export default DropdownReperibilityType;
