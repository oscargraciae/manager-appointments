import moment from 'moment-timezone';
import { Event } from 'react-big-calendar';
import { IBooking } from '../types/IBooking';

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

export const formatBookingDate = (hours: IBooking[]) : Event[]=> {
  return hours.map((e) => ({
    ...e,
    title: e.customer ? e.customer.firstName : '',
    // openFrom: moment( '12:00' ).format('HH:MM'),
    start: moment(`${e.bookingDate}`).toDate(),
    end: moment(`${e.bookingDate}`).add(e.totalTime, 'minute').toDate(),
  }));
}