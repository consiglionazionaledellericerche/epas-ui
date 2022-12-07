import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { CurrentDateContext, CurrentDateProvider } from '../../../contexts/currentDateContext';
import React from 'react'

import Link from 'next/link';

function ArrowLink({year, month, direction, setContextDate}) {

   console.log("arrowlink>>>", year, month, direction)

    function handleClick() {
        if (direction == 'left'){
          if (month == 1)
          {
            month = 12
            year = year -1
          }
          else {
            month = month -1
          }
        }
        else {
          if (month == 12)
          {
            month = 1
            year = year + 1
          }
          else {
            month = month + 1
          }
        }

        setContextDate(month, year)

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