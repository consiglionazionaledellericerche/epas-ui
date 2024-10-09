import moment from "moment";
import 'moment/locale/it';

class DateUtility {
 
    //Minuti in un'ora
    static MINUTE_IN_HOUR = 60;

    static formatPeriodType(periodType : string) {
        return periodType == 'year' ? 'anno' : 'mese'
    }

    static areDatesEqual(date1, date2) {
      const d1 = new Date(date1);
      const d2 = new Date(date2);

      return d1.getTime() === d2.getTime();
    }

    static areMonthEqual(date, month) {
      const d1 = new Date(date);
      return d1.getMonth() + 1 === month;
    }

    static areYearEqual(date, year) {
      const d1 = new Date(date);
      return d1.getFullYear() === year;
    }

    static subtractMonth(date) {
      const newDate = new Date(date); // Crea una copia della data
      newDate.setMonth(newDate.getMonth() - 1); // Sottrai un mese
      return newDate;
    }
    static getMonthName(month: number) {
      const date = new Date();
      date.setMonth(month - 1); // Imposta il mese nell'oggetto Date (i mesi in JavaScript sono indicizzati da 0 a 11)
      const monthName = date.toLocaleString('it-IT', { month: 'long' }); // Ottieni il nome del mese
      return monthName;
    }

    static formatDateShort(date : Date | undefined) {
        if (date) {
          return moment(date).locale('it-IT').format('DD ddd');
        } else {
          return "";
        }
    }

    static formatDateYear(date : Date | undefined) {
        if (date) {
          return moment(date).locale('it-IT').format('YYYY');
        } else {
          return "";
        }
    }

    static formatDateMonth(date : Date | undefined) {
        if (date) {
          return moment(date).locale('it-IT').format('MM');
        } else {
          return "";
        }
    }

    static formatDateDay(date : Date | undefined) {
        if (date) {
          return moment(date).locale('it-IT').format('DD');
        } else {
          return "";
        }
    }

    static formatDate(date : Date | undefined) {
        if (date) {
          return moment(date).locale('it-IT').format('DD/MM/YYYY');
        } else {
          return "";
        }
    }

    static formatDateLocal(date : Date | undefined) {
        //return moment(date).locale('it-IT').format('DD-MM-YYYY');
        if (date) {
          return moment(date).format('YYYY-MM-DD')
        } else {
          return "";
        }
    }

    static getLastDayOfMonth(month : number, year : number) {
        var d = new Date(year, month, 0);
        return DateUtility.formatDateDay(d);
    }

    static textToDate(day : number, month : number, year : number) {
        console.log("textToDate",day,month,year);
        var d = new Date(year, month, day);
        return DateUtility.formatDateLocal(d);
    }

    static toHour(minutes:number) {
        const hour = Math.abs(Math.floor(minutes / 60));
        return `${hour}`;
    }


    static fromMinuteToHourMinute(minute : number) {
        if (minute == 0) {
          return "00:00";
        }
        let string = "";
        let positiveMinute = minute;
        if (minute < 0) {
          string = string + "-";
          positiveMinute = minute * -1;
        }
        let hour : number = Math.trunc(positiveMinute / this.MINUTE_IN_HOUR);
        let min : number = positiveMinute % this.MINUTE_IN_HOUR;

        if (hour < 10) {
          string = string + "0" + hour;
        } else {
          string = string + hour;
        }
        string = string + ":";
        if (min < 10) {
          string = string + "0" + min;
        } else {
          string = string + min;
        }
        return string;
      }

            /**
   * La stringa contenente ore e minuti col "+" davanti se positivo.
   *
   * @param minutes il numero dei minuti
   * @return il numero di ore e miunti col "+" davanti se positivo.
   */
  static toHourTimeWithPlus(minutes : number) : string {
    let hourTime = DateUtility.fromMinuteToHourMinute(minutes);
    if (minutes < 0) {
      return hourTime;
    }
    return "+" + hourTime;
  }

  /**
   * La stringa contenente ore e minuti col "-" davanti se negativo.
   *
   * @param minutes il numero dei minuti
   * @return il numero di ore e miunti col "-" davanti se negativo.
   */
  static toHourTimeWithMinus(minutes : number) {
    let hourTime = DateUtility.fromMinuteToHourMinute(minutes);
    if (minutes < 0) {
      return hourTime;
    }
    return "-" + hourTime;
  }

  static fromMinuteToHour(minute : number, amountType : string) {
      if (minute == 0) {
        return "0 ore";
      }
      let string = "";
      let positiveMinute = minute;
      if (minute < 0) {
        //string = string + "-";
        positiveMinute = minute * -1;
      }
      let hours : number = Math.trunc(positiveMinute / this.MINUTE_IN_HOUR);
      let minutes : number = positiveMinute % this.MINUTE_IN_HOUR;

      if (hours > 0 && minutes > 0) {
        string = hours + " ore " + minutes + " minuti";
      } else if (hours > 0) {
        string = hours + " ore";
      } else if (minutes > 0) {
        string = minutes + " minuti";
      }

      return string;
    }

  static formatAmount(amount : number, amountType : string) {
    if (amountType == null) {
      return "";
    }
    let format = "";
    if (amountType == "units") {
      if (amount == 0) {
        return "0 giorni"; // giorno lavorativo";
      }
      let units = amount / 100;
      let percent = amount % 100;
      let label = " giorni lavorativi";
      if (units == 1) {
        label = " giorno lavorativo";
      }
      if (units > 0 && percent > 0) {
        return units + label + " + " + percent + "% di un giorno lavorativo";
      } else if (units > 0) {
        return units + label;
      } else if (percent > 0) {
        return percent + "% di un giorno lavorativo";
      }
      return (amount / 100) + " giorni";
    }
    if (amountType == "minutes") {
      if (amount == 0) {
        return "0 minuti";
      }
      let hours = amount / 60; //since both are ints, you get an int
      let minutes = amount % 60;

      if (hours > 0 && minutes > 0) {
        format = hours + " ore " + minutes + " minuti";
      } else if (hours > 0) {
        format = hours + " ore";
      } else if (minutes > 0) {
        format = minutes + " minuti";
      }
    }
    return format;
  }

  static formattedHour(time:string) {
      if (typeof time !== 'string' || time.length !== 4 || isNaN(Number(time))) {
          throw new Error('Invalid time format. Expected a string in "HHMM" format.');
      }
      const hours = time.slice(0, 2);
      const minutes = time.slice(2, 4);
      if (parseInt(hours, 10) > 23 || parseInt(minutes, 10) > 59) {
          throw new Error('Invalid time value. Hours must be between 00 and 23 and minutes between 00 and 59.');
      }
      return `${hours}:${minutes}`;
  }


}


export default DateUtility