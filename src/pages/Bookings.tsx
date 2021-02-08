import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BookingsListHistory } from '../components/booking/BookingHistoryList';
import { BookingsListNext } from '../components/booking/BookingListNext';
import { BookingsList } from '../components/booking/BookingsList';
import { ContainerPage } from '../components/general/ContainerPage';

interface BookingsProps {}

const MenuLink: React.FC<{ title: string, onClick: any, isActive: boolean }> = ({title, onClick, isActive}) => (
  <Button bg={isActive ? 'primary' : ''} variant='ghost' fontWeight='bold' pr={6} onClick={onClick}>
    <Text color={isActive ? '#FFF' : ''} fontSize='md'>{title}</Text>
  </Button>
)

export const Bookings: React.FC<BookingsProps> = ({}) => {
  const [tab, setTab] = useState(1);

  return (
    <ContainerPage title='Reservaciones'>
      <Box bg='surface' borderBottomWidth={1} borderColor='borders' py={3}>
        <Box>
          <HStack mt={4} borderBottomWidth={1} borderColor='borders' p={3}>
            <MenuLink title='Pendientes' onClick={() => setTab(1)} isActive={tab === 1} />
            <MenuLink title='Próximas' onClick={() => setTab(2)} isActive={tab === 2} />
            <MenuLink title='Todas' onClick={() => setTab(3)} isActive={tab === 3} />
          </HStack>
          { tab === 1 && <BookingsList /> }
          { tab === 2 && <BookingsListNext /> }
          { tab === 3 && <BookingsListHistory /> }
        </Box>
      </Box>
    </ContainerPage>
  );
}