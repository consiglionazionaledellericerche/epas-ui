import { createContext, useState } from 'react'

// Create Context object.
const CurrentDateContext = createContext()

const CurrentDateProvider = ({ children }) => {

  const cd = new Date()
  const [year, setYear] = useState(cd.getFullYear())
  const [month, setMonth] = useState(cd.getMonth() + 1)

  const setDateP = (getyear, getmonth) => {
    setYear(getyear);
    setMonth(getmonth);
  };

  return <CurrentDateContext.Provider value={{year, month, setDateP}}>{children}</CurrentDateContext.Provider>
}

export {CurrentDateContext, CurrentDateProvider}