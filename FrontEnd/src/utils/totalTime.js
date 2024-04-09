import { constant } from "lodash";
import moment from "moment";

const TotalTime = (time) => {
    const duration = moment.duration(time, 'seconds');
    const hours = duration.hours();
    const minutes = duration.minutes();
    return `${hours} giờ, ${minutes} phút`;
}


export default TotalTime