import React from 'react'
import { Box } from '@chakra-ui/react';

// local components
import { ContainerPage } from '../components/general/ContainerPage';
import { BookingCalendar } from '../components/booking/BookingCalendar';


interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <ContainerPage>
      <Box>
        <BookingCalendar />
      </Box>
    </ContainerPage>
  );
}