import moment from "moment";
import 'moment/locale/it';

class DateUtility {
 
    //Minuti in un'ora
    static MINUTE_IN_HOUR = 60;

    static formatPeriodType(periodType : string) {
        return periodType == 'year' ? 'anno' : 'mese'
    }

    static formatDateShort(date : Date) {
        return moment(date).locale('it-IT').format('DD ddd');
    }

    static formatDate(date : Date) {
        return moment(date).locale('it-IT').format('DD/MM/YYYY');
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

}


export default DateUtility