import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Text, Flex, IconButton, Tooltip } from "@chakra-ui/react"
import moment from 'moment';

import { IBooking } from '../../types/IBooking';
import { formatDate } from '../../utils/formatDate';
import { minutesToHour } from '../../utils/minutesToHours';
import { BookingService } from '../../services/bookingService';
import { LoadingView } from '../general/LoadingView';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface BookingsListHistoryProps {}

export const BookingsListHistory: React.FC<BookingsListHistoryProps> = ({}) => {

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const params = { startDate: moment(new Date()).toISOString() };
      
      const { bookings } = await new BookingService().getAll(params);
      setBookings(bookings);
      setIsLoading(false);
    }
    fetchBookings();
  }, []);

  if (isLoading) {
    return <LoadingView />
  }

  return (
    <Table variant="simple" size="md">
        <TableCaption>*Calculos basados en el tiempo y precio de cada servicio</TableCaption>
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Fecha de servicio</Th>
            <Th>Tiempo de servicio*</Th>
            <Th>Total a cobrar*</Th>
            <Th>Estatus</Th>
          </Tr>
        </Thead>
        <Tbody>
          { bookings.map((item: IBooking) => (
            <Tr fontSize='14px'>
              <Td>{item.customer?.firstName} {item.customer?.lastName}</Td>
              <Td>{item.bookingDate ? formatDate(item.bookingDate) : ''}</Td>
              <Td>{item.totalTime ? minutesToHour(item.totalTime) : ''}</Td>
              <Td>${item.totalPrice}MXN</Td>
              <Td>{item.bookingStatusId === 3 ? 'Cancelada' : 'Terminada'}</Td>
            </Tr>
          )) }
        </Tbody>
      </Table>
  );
}