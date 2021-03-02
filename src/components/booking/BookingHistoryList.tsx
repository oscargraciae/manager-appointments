import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"

import { IBooking } from '../../types/IBooking';
import { formatDate } from '../../utils/formatDate';
import { minutesToHour } from '../../utils/minutesToHours';
import { BookingService } from '../../services/bookingService';
import { LoadingView } from '../general/LoadingView';

interface BookingsListHistoryProps {}

export const BookingsListHistory: React.FC<BookingsListHistoryProps> = ({}) => {

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      // const params = { startDate: moment(new Date()).toISOString() };
      const params = {};
      
      const { bookings } = await new BookingService().getAll(params);
      setBookings(bookings);
      setIsLoading(false);
    }
    fetchBookings();
  }, []);

  if (isLoading) {
    return <LoadingView />
  }

  const statusColor = (id: number) : string => {
    switch (id) {
      case 1:
        return 'yellow.500'
      case 2:
        return 'primary'
      case 3:
        return 'red.500'
      default:
        return 'primary'
    }
}

  return (
    <Table variant="simple" size="md">
        <TableCaption>*Cálculos basados en el tiempo y precio de cada servicio</TableCaption>
        <Thead>
          <Tr>
            <Th display={{ base: 'none', md: 'block' }}>#</Th>
            <Th>Cliente</Th>
            <Th>Fecha de servicio</Th>
            <Th display={{ base: 'none', md: 'block' }}>Tiempo de servicio*</Th>
            <Th display={{ base: 'none', md: 'block' }}>Total a cobrar*</Th>
            <Th display={{ base: 'none', md: 'block' }}>Estatus</Th>
          </Tr>
        </Thead>
        <Tbody>
          { bookings.map((item: IBooking) => (
            <Tr fontSize='14px'>
              <Td display={{ base: 'none', md: 'block' }}>{item.id}</Td>
              <Td>{item.customer?.firstName} {item.customer?.lastName}</Td>
              <Td>{item.bookingDate ? formatDate(item.bookingDate) : ''}</Td>
              <Td display={{ base: 'none', md: 'block' }}>{item.totalTime ? minutesToHour(item.totalTime) : ''}</Td>
              <Td display={{ base: 'none', md: 'block' }}>${item.totalPrice}MXN</Td>
              <Td display={{ base: 'none', md: 'block' }} color={statusColor(item.bookingStatus.id)}>{item.bookingStatus.name}</Td>
            </Tr>
          )) }
        </Tbody>
      </Table>
  );
}