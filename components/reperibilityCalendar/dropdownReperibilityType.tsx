import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRequest } from "../../request/useRequest"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react"

const DropdownReperibilityType = ({ onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  let apiUrl = "/api/rest/v4/reperibilitycalendar/show";

  const { data: session, status } = useSession();
  const accessToken = session.accessToken;

  //const {data, error} = useRequest('/vacations');

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
          console.log("DATA", data);
          const formattedOptions = data.reperibilities.map((item) => ({
            value: item.id,
            label: item.description,
          }));
          setOptions(formattedOptions);
           setSelectedOption({
                  value: data.reperibilitySelected.id,
                  label: data.reperibilitySelected.description,
                });
        })
        .catch((error) => {
          console.error('Errore nella chiamata API:', error);
        });
    }, [apiUrl, accessToken]);

  const handleSelectChange = (option) => {
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

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions)
    }
  }
}
export default DropdownReperibilityType;
