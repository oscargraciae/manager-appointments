import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Text, Flex, IconButton, Tooltip, useToast } from "@chakra-ui/react"

import { IBooking } from '../../types/IBooking';
import { formatDate } from '../../utils/formatDate';
import { minutesToHour } from '../../utils/minutesToHours';
import { BookingService } from '../../services/bookingService';
import { LoadingView } from '../general/LoadingView';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface BookingsListProps {}

// Añadir toolt tip al tiempo y precio indicando que es el calculo basado en lo que registro el negocio

// Este monto se basa en el precio de los servicios que registraste

export const BookingsList: React.FC<BookingsListProps> = ({}) => {
  // hooks
  const toast = useToast();

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId, setBookingId] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      const params = { status: 1, time: 10 };
      
      const { bookings } = await new BookingService().getAll(params);
      setBookings(bookings);
      setIsLoading(false);
    }
    fetchBookings();
  }, []);

  if (isLoading) {
    return <LoadingView />
  }

  const handleToAcept = async (index :number, id? :number) => {
    console.log('Booking id', id);
    if (id) {
      setBookingId(id);
      const response = await new BookingService().update(id, { bookingStatusId: 2 });
      if (response.success) {
        setBookings([
          ...bookings.slice(0, index),
          ...bookings.slice(index + 1)
        ]);

        toast({
          status: 'success',
          title: 'Servicio aceptado',
          position: 'top',
        })
      }
      setBookingId(0);
    }    
  }

  const handleToCancel = async (index :number, id? :number) => {
    if (id) {
      setBookingId(id);
      const response = await new BookingService().update(id, { bookingStatusId: 3 });
      if (response.success) {
        setBookings([
          ...bookings.slice(0, index),
          ...bookings.slice(index + 1)
        ]);

        toast({
          status: 'error',
          title: 'Servicio rechazado',
          position: 'top',
        })
      }
      setBookingId(0);
    }    
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
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          { bookings.map((item: IBooking, index :number) => (
            <Tr fontSize='14px'>
              <Td>{item.customer?.firstName} {item.customer?.lastName}</Td>
              <Td>{item.bookingDate ? formatDate(item.bookingDate) : ''}</Td>
              <Td>{item.totalTime ? minutesToHour(item.totalTime) : ''}</Td>
              <Td>$0MXN</Td>
              <Td>
                <Flex>
                  <Tooltip label="Aceptar" fontSize="md">
                    <IconButton
                      aria-label="Aceptar"
                      variant="ghost"
                      size='lg'
                      fontSize="36px"
                      icon={<AiOutlineCheckCircle />}
                      mr={1}
                      onClick={() => handleToAcept(index, item.id)}
                      isLoading={bookingId === item.id}
                    />
                  </Tooltip>
                  <Tooltip label="Rechazar" fontSize="md">
                    <IconButton
                      aria-label="Aceptar"
                      variant="ghost"
                      size='lg'
                      fontSize="36px"
                      icon={<AiOutlineCloseCircle />}
                      mr={1}
                      onClick={() => handleToCancel(index, item.id)}
                      isLoading={bookingId === item.id}
                    />
                  </Tooltip>
                </Flex>
              </Td>
            </Tr>
          )) }
        </Tbody>
      </Table>
  );
}