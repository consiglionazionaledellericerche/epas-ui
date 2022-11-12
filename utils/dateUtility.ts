import moment from "moment";
import 'moment/locale/it';

class DateUtility {
 
    //Minuti in un'ora
    static MINUTE_IN_HOUR = 60;

    static formatDateShort(date : Date) {
        return moment(date).locale('it-IT').format('DD ddd');
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
}

export default DateUtility