import { createContext, useState } from 'react'

// Definisci il contesto
export interface CurrentDateContextType {
  year: number;
  month: number;
  setDateP: (year: number, month: number) => void;
}

// Create Context object.
const CurrentDateContext = createContext<CurrentDateContextType | undefined>(undefined);

const CurrentDateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const cd = new Date()
  const [year, setYear] = useState(cd.getFullYear())
  const [month, setMonth] = useState(cd.getMonth() + 1)

  const setDateP = (getyear: number, getmonth: number) => {
    setYear(getyear);
    setMonth(getmonth);
  };

  return <CurrentDateContext.Provider value={{year, month, setDateP}}>{children}</CurrentDateContext.Provider>
}

export {CurrentDateContext, CurrentDateProvider}
