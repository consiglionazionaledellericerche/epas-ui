import { GetStaticProps } from "next";
import { render } from "react-dom";
import MonthRecap from "../components/monthRecap";
import { PersonDay } from "../types/personDay";

export const getStaticProps : GetStaticProps<{personDays : PersonDay[]}> = async () => {
    const res = await fetch('http://localhost:8080/rest/v4/persondays?personId=146&year=2022&month=2')
    const personDays: PersonDay[] = await res.json()
    console.log("personDays = " + personDays)
    return {
      props: {
        personDays,
      },
    }
}
  
function Stampings( { personDays }: { personDays: PersonDay[] } ) {
    return(
        <MonthRecap personDays={personDays} />
    )
  }
  
export default Stampings;