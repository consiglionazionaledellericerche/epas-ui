import moment from "moment";
import 'moment/locale/it';

export default function formatDateShort(date: Date) {
    return moment(date).locale('it-IT').format('DD ddd');
}