import React, { HTMLAttributes, useContext, useEffect, useState } from 'react'
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Calendar, Event, EventPropGetter, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { IBooking } from '../../types/IBooking';
import { BookingService } from '../../services/bookingService';
import { formatBookingDate, formatHoursDate } from '../../utils/formatHoursDate';
import { messages } from '../../config/calendarText';
import { CalendarItem } from './CalendarItem';

import './BookingCalendar.css';
import { BusinessService } from '../../services/businessService';
import { UserContext } from '../general/Layout';
import { getMin, getMax } from '../../utils/hoursFilters';
import { useHistory } from 'react-router-dom';

const localizer = momentLocalizer(moment)

interface BookingCalendarProps {}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({}) => {
  // hooks
  const history = useHistory();

  // context
  const businessContext = useContext(UserContext);
  
  // state
  const [bookings, setBookings] = useState<Event[]>([]);
  const [rangeTime, setRangeTime] = useState({ min: '00:00', max: '23:30' });

  useEffect(() => {
    const fetchHours = async () => {
      const response = await new BusinessService().getHours(businessContext.id);
      
      if (response.success && response.hours) {
        const hours1 = response.hours;
        const hours2 = [...response.hours];
        const min = getMin(hours1);
        const max = getMax(hours2);

        if (min && max) {
          setRangeTime({ min, max });
        }
        
        const newHours = formatHoursDate(response.hours);
        // console.log('Horas', newHours);
      }
    }

    fetchHours();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await new BookingService().getAll({ statuses: [1, 2] });
      if (response.success) {
        const bookingEvents = formatBookingDate(response.bookings);
        setBookings(bookingEvents);
      }
    }
    fetch();
  }, []);

  const onSelectEvent = (event :any) => {
    console.log('Click en el evento', event);
    if (event.id) {
      history.push(`/bookings/${event.id}`);
    }
  }

  const eventPropGetter = (event: any, _start: any, _end: any, _isSelected: any) : React.HTMLAttributes<HTMLDivElement> => {
    
    const style : React.CSSProperties = {
      backgroundColor: event.bookingStatusId === 2 ? '#BDEFD1' : '#FEFCBF',
      borderRadius: 0,
      opacity: 1,
      borderWidth: 0,
      fontSize: '12px',
      color: event.bookingStatusId === 2 ? '#16793D' : '#D69E2E',
      borderLeftWidth: 5,
      borderLeftColor: event.bookingStatusId === 2 ? '#05AF3C' : '#ECC94B',
      flexDirection: 'column',
      fontWeight: 'bold',
    }
    return {
      style
    }
  }

  const slotPropGetter = () : React.HTMLAttributes<HTMLDivElement> => {
    const style : React.CSSProperties = {}
    return {
      style
    }
  }

  const slotGroupPropGetter = () : React.HTMLAttributes<HTMLDivElement> => {
    const style : React.CSSProperties = {
      minHeight: '80px',
    }
    return {
      style
    }
  }

  const dayPropGetter = () : React.HTMLAttributes<HTMLDivElement> => {
    const style : React.CSSProperties = {
      backgroundColor: '#FFF',
    }
    return {
      style
    }
  }
  
  return (
    <Box h='80vh'>
      <Flex pb={2}>
        <Flex mb={1}>
          <HStack mr={3}>
            <Box bg='primary' w={4} h={4} />
            <Text fontSize='sm'>Aceptado</Text>
          </HStack>
          <HStack>
            <Box bg='yellow.300' w={4} h={4} />
            <Text fontSize='sm'>Pendiente</Text>
          </HStack>
        </Flex>
      </Flex>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        timeslots={2}
        step={15}
        messages={messages}
        eventPropGetter={eventPropGetter}
        slotPropGetter={slotPropGetter}
        slotGroupPropGetter={slotGroupPropGetter}
        dayPropGetter={dayPropGetter}
        components={{
          event: CalendarItem
        }}
        defaultView='day'
        views={{ week: true, day: true, agenda: true }}
        min={moment(rangeTime.min, [moment.ISO_8601, 'HH:mm']).toDate()}
        max={moment(rangeTime.max, [moment.ISO_8601, 'HH:mm']).toDate()}
        onSelectEvent={onSelectEvent}
      />
    </Box>
  );
}