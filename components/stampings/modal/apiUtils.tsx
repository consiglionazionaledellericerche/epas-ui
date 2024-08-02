import { getSession } from 'next-auth/react';
import { CustomSession } from '../../../types/customSession';
import DateUtility from "../../../utils/dateUtility";

// Funzione per costruire la query string da un oggetto params
const buildQueryString = (params: Record<string, any>) => {
  return Object.entries(params)
    .map(([key, value]) => {
      // Controlla e converte il tipo del valore
      let encodedValue;
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        encodedValue = encodeURIComponent(value);
      } else {
        encodedValue = encodeURIComponent(String(value));
      }
      return `${encodeURIComponent(key)}=${encodedValue}`;
    })
    .join('&');
};


export const fetchData = async (setDataTab:any, setShow:any, setTitle:any, url:string, title:string) => {
  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }

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
    let dataFormat;

    if (setShow !== false){
      if (data.from){
        dataFormat = DateUtility.formatDate(data.from);
      }
      else {
        dataFormat = DateUtility.formatDate(data.date);
      }
      let person = data.person.surname + " " + data.person.name;
      let titleModal = title + dataFormat + " per " + person;
      setTitle(titleModal);
      setShow(true);
    }
  } catch (error) {
    console.error("unable to achieve this", error);
  }
}

// Funzione per fetchDataAbsence
export const fetchDataAbsence = async (params:any, setDataTab:any, setShow:any, setTitle:any) => {
  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/absencesGroups/groupsForCategory?${queryString}`;
  const title = "Nuovo codice assenza in data ";
  fetchData(setDataTab, setShow, setTitle, url, title);
};

// Funzione per fetchDataStamping
export const fetchDataStamping = async (params:any, setDataTab:any, setShow:any, setTitle:any) => {
  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/stampings/insert?${queryString}`;
  const title = "Inserisci timbratura del ";
  fetchData(setDataTab, setShow, setTitle, url, title);
};

// Funzione per simulateData
export const simulateData = async (dataTab:any, setSimDataTab:any) => {
  if (dataTab === null){
    return;
  }
  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }
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
export const saveDataStamping = async (dataTab:any, handleClose:any) => {};

// Funzione per simulateData
export const saveDataAbsence = async (dataTab:any, handleClose:any) => {
  if (dataTab === null){
    return;
  }
  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }

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

export const fetchFindCode = async (params:any, setData:any, setLoading:any, setError:any, setTotalRows:any) => {
  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }

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
