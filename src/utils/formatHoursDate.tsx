import moment from 'moment';

import { IHour } from "../types/IHour";

// let dateAndTime = moment(component.props.data.value, [moment.ISO_8601, 'HH:mm']);
export const formatHoursDate = (hours: IHour[]) : IHour[]=> {
    return hours.map((e) => ({
      ...e,
      // openFrom: moment( '12:00' ).format('HH:MM'),
      openFrom: moment(e.openFrom, [moment.ISO_8601, 'HH:mm']).format('H:mm'),
      openTill: moment(e.openTill, [moment.ISO_8601, 'HH:mm']).format('H:mm'),
    }));

}