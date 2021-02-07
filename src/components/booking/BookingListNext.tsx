import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Text, Flex, IconButton, Tooltip } from "@chakra-ui/react"
import moment from 'moment';

import { IBooking } from '../../types/IBooking';
import { formatDate } from '../../utils/formatDate';
import { minutesToHour } from '../../utils/minutesToHours';
import { BookingService } from '../../services/bookingService';
import { LoadingView } from '../general/LoadingView';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

interface BookingsListNextProps {}

export const BookingsListNext: React.FC<BookingsListNextProps> = ({}) => {
  // hooks
  const history = useHistory();
  // state
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const params = { status: 2, time: 10, dateEnd: moment(new Date()).toISOString() };
      
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
        <TableCaption>*Cálculos basados en el tiempo y precio de cada servicio</TableCaption>
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Fecha de servicio</Th>
            <Th>Tiempo de servicio*</Th>
            <Th>Total a cobrar*</Th>
          </Tr>
        </Thead>
        <Tbody>
          { bookings.map((item: IBooking) => (
            <Tr fontSize='14px'>
              <Td
                textDecor='underline'
                onClick={() => history.push(`/bookings/${item.id}`)}
                fontWeight='600'
                _hover={{ bg: 'primaryLight', cursor: 'pointer' }}
              >
                {item.customer?.firstName} {item.customer?.lastName}
              </Td>
              <Td>{item.bookingDate ? formatDate(item.bookingDate) : ''}</Td>
              <Td>{item.totalTime ? minutesToHour(item.totalTime) : ''}</Td>
              <Td>${item.totalPrice}MXN</Td>
            </Tr>
          )) }
        </Tbody>
      </Table>
  );
}