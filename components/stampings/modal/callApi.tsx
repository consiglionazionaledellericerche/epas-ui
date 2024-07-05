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

  let forceInsert = null;

  console.log("params>>> ", params);

  if ('forceInsert' in params) {
    forceInsert = params['forceInsert'];
    delete params['forceInsert'];
  }
  console.log("forceInsert>>> ", forceInsert);
  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/absencesGroups/groupsForCategory?${queryString}`;

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
    console.log("data1>>> ", data);
    if (forceInsert != null){
      data['forceInsert'] = forceInsert;
    }

    console.log("data2>>> ", data);
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
    forceInsert: dataTab?.forceInsert || false,
    to: dataTab?.to || null,
    recoveryDate: dataTab?.recoveryDate || null,
    justifiedTypeName: dataTab?.justifiedTypeSelected || null,
    absenceTypeCode: dataTab?.absenceTypeSelected?.code || null,
    groupAbsenceTypeName: dataTab?.groupSelected?.name || null,
    minutes: dataTab?.minutes || null,
    hours: dataTab?.hours || null,
  };

  const url = '/api/rest/v4/absencesGroups/simulateInsert';

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
    setSimDataTab(data);
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};

// Funzione per simulateData
export const saveData = async (dataTab, handleClose) => {
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
    justifiedTypeName: dataTab?.justifiedTypeSelected || null,
    absenceTypeCode: dataTab?.absenceTypeSelected?.code || null,
    groupAbsenceTypeName: dataTab?.groupSelected?.name || null,
    minutes: dataTab?.minutes || null,
    hours: dataTab?.hours || null,
  };

  const url = '/api/rest/v4/absencesGroups/save';

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
    handleClose();
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};

export const fetchFindCode = async (params, setData, setLoading, setError, setTotalRows) => {
  const session = await getSession();
  let accessToken = session?.accessToken || null;

  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/absencesGroups/findCode?${queryString}`;

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
    setData(data);
    setTotalRows(data.length);
    setLoading(false);
  } catch (error) {
    setError('Errore durante il caricamento dei dati.');
    setLoading(false);
  }
};
