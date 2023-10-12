import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CurrentDateContext, CurrentDateProvider } from '../../../contexts/currentDateContext';
import React from 'react'

import Link from 'next/link';

function ArrowLink({year, month, direction, setContextDate}: { year: number, month: number, direction: string, setContextDate: Function }) {

   let yearN =  year
   let monthN =  month

    function handleClick() {
        if (direction == 'left'){
          if (monthN == 1)
          {
            monthN = 12
            yearN = yearN -1
          }
          else {
            monthN = monthN -1
          }
        }
        else {
          if (monthN == 12)
          {
            monthN = 1
            yearN = yearN + 1
          }
          else {
            monthN = monthN + 1
          }
        }
        setContextDate(monthN, yearN)
      }

    return (
          <>
          {(() => {
                  switch (direction) {
                    case 'left':
                      return <button className="arrow-nav text-white" onClick={handleClick}><FontAwesomeIcon icon={faArrowLeft}/></button>
                    case 'right':
                      return <button className="arrow-nav text-white" onClick={handleClick}><FontAwesomeIcon icon={faArrowRight}/></button>
                    default:
                      return null
                  }
                })()}
          </>
    )
}

export default React.memo(ArrowLink)