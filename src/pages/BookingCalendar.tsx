import React from 'react'
import { Box } from '@chakra-ui/react';
import { ContainerPage } from '../components/general/ContainerPage';
import { Calendar } from '../components/calendar/Calendar';

interface BookingCalendarProps {}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({}) => {
  return (
    <ContainerPage title='Calendario'>
      <Box>
        <Calendar />
      </Box>
    </ContainerPage>
  );
}