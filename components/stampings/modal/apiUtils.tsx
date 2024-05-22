import { getSession } from 'next-auth/react';
import { CustomSession } from '../../../types/customSession';
import DateUtility from "../../../utils/dateUtility";

// Funzione per costruire la query string da un oggetto params
const buildQueryString = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

// Funzione per fetchData
export const fetchData = async (params, setDataTab, setShow, setTitle) => {
  const session = await getSession();
  let accessToken = session?.accessToken || null;

  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/absencesGroups/groupsForCategory?${queryString}`;
  console.log("URL", url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Errore durante la richiesta API');
    }

    const data = await response.json();
    setDataTab(data);
    if (setShow !== false){
      let person = data.person.surname + " " + data.person.name;
      let title = "Nuovo codice assenza in data " + DateUtility.formatDate(data.from) + " per " + person;
      setTitle(title);
      setShow(true);
    }
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};

// Funzione per simulateData
export const simulateData = async (dataTab, setSimDataTab) => {
if (dataTab === null){
return;
}
  const session = await getSession();
  let accessToken = session?.accessToken || null;

  let params = {
    idPerson: dataTab?.person.id || null,
    from: dataTab?.from || null,
    categoryTabName: dataTab?.categoryTabSelected.name || null,
    forceInsert: false,
    to: dataTab?.to || null,
    recoveryDate: dataTab?.recoveryDate || null,
    justifiedTypeName: dataTab?.justifiedTypeName || null,
    absenceTypeCode: dataTab?.absenceTypeSelected?.code || null,
    groupAbsenceTypeName: dataTab?.groupSelected?.name || null,
    minutes: dataTab?.minutes || null,
    hours: dataTab?.hours || null,
  };

  console.log("PARAMS>>>> ", params);
  const url = '/api/rest/v4/absencesGroups/simulateInsert';
  console.log("URL", url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Errore durante la richiesta API');
    }

    const data = await response.json();
    console.log("SIMULATION>>>>>> ", data);
    setSimDataTab(data);
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};
