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


export const fetchData = async (url:string, title:string, setShow:any, showError:any=null) => {
  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }

  console.log("fetchData URL ", url);
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
      if (response.status == 409){
        if (showError){
           showError(`Timbratura già presente.`);
        }
        console.log("conflict 409 elemento già presente");
      }
      else {
            const errorMessage = `Errore durante la richiesta API: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
      }
    }

    const data = await response.json();
    let dataFormat;
    let show = false;
    let titleModal = "";

    if (setShow !== false){
      if (data.from){
        dataFormat = DateUtility.formatDate(data.from);
      }
      else {
        dataFormat = DateUtility.formatDate(data.date);
      }
       let person = data.person ? `${data.person.surname} ${data.person.name}`: '';
       titleModal = `${title} ${dataFormat} per ${person}`;
       show = true;
    }
      return { data, show, title: titleModal };
  } catch (error) {
    console.error("unable to achieve this", error);
    throw error;
  }
}

// Funzione per fetchDataAbsence
export const fetchDataAbsence = async (params:any, setShow:any, showError:any=null) => {
  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/absencesGroups/groupsForCategory?${queryString}`;
  const title = "Nuovo codice assenza in data ";
  var result = fetchData(url, title, setShow);
  return result;
};

// Funzione per fetchDataStamping
export const fetchDataStamping = async (params:any, setShow:any, showError:any=null) => {

  var mode = params['mode'];
  delete params['mode'];

  if (mode == 'edit'){
    delete params['personId'];
  }

  const queryString = buildQueryString(params);
  const url = `/api/rest/v4/stampings/${mode}?${queryString}` ;
  var titleMode = mode =='insert' ? 'Inserisci':'Modifica';
  const title = `${titleMode} timbratura del `;
  var result  = fetchData(url, title, setShow);
  params['mode'] = mode;
  return result;
};

// Funzione per simulateData
export const simulateData = async (dataTab:any) => {
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
    return data;
    //setSimDataTab(data);
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};

export const saveDataStamping = async (dataTab:any, handleClose:any, showError:any, showSuccess:any) => {

  if (dataTab.time == null || dataTab.way == null){
    return;
  }

  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }

  let action;
  if (dataTab['serviceReasons']){
    action = '/saveServiceReasons';
  } else if (dataTab['offSiteWork'] || dataTab['insertOffsite'] || dataTab['mode'] ==='insertOffSite'){
    action = '/saveOffSite';
  } else if (dataTab['mode'] == 'edit'){
    action = '/update';
  } else {
  action='';
  }
  console.log("saveDataStamping>>> ", dataTab['offSiteWork'], dataTab['insertOffsite'], action);
  const url = '/api/rest/v4/stampings'+action;
  delete dataTab['mode'];
  delete dataTab['serviceReasons'];
  delete dataTab['offSiteWork'];
  delete dataTab['insertOffsite'];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataTab)
    });
    if (!response.ok) {
      if (response.status == 409){
            showError(`Timbratura ignorata perchè già presente`);
      }
      else {
            throw new Error('Errore durante la richiesta API');
      }
    }
    else {
        const data = await response.json();
        showSuccess(data.message);
    }
    handleClose();
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};
export const deleteStamping = async (stampingId:number, handleClose:any, showError:any, showSuccess:any) => {

  const session = await getSession()  as CustomSession;
  let accessToken = null;
  if (session) {
    accessToken = session.accessToken;
   }
  const url = '/api/rest/v4/stampings/'+stampingId;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
     throw new Error('Errore durante la richiesta API');
    }
    else {
        const data = await response.json();
        showSuccess(data.message);
    }
    handleClose();
  } catch (error) {
    console.error("unable to achieve this", error);
  }
};

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
