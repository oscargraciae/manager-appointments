import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Flex, Heading, HStack, IconButton, Spacer, Stack, Text, Tooltip, useToast, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

import { ContainerPage } from '../components/general/ContainerPage';
import { IBooking } from '../types/IBooking';
import { BookingService } from '../services/bookingService';
import { formatDateLG } from '../utils/formatDate';
import { minutesToHour } from '../utils/minutesToHours';
import { LoadingView } from '../components/general/LoadingView';
import { IBookingService } from '../types/IBookingService';

interface BookingProps {}

// Datos de clioente
/**
 Nombre
 Telefono,

 Fecha
 Hora
 Mensaje

 Servicios

 Acciones
  Aceptar
  Rechazar
  Contactar
*/

export const Booking: React.FC<BookingProps> = ({}) => {

  // hooks
  const { id } :any = useParams();
  const toast = useToast();

  // state
  const [booking, setBooking] = useState<Required<IBooking>>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooking = async () => {
    const { success, booking } = await new BookingService().get(id)
    if (success) {
      setBooking(booking);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleToAcept = async () => {
    if (id) {
      setIsLoading(true);
      const response = await new BookingService().update(id, { bookingStatusId: 2 });
      if (response.success) {
        fetchBooking();
      }
      setIsLoading(false);
      console.log('respues de reservacion', response);
    }    
  }

  const handleToCancel = async () => {
    if (id) {
      setIsLoading(true);
      const response = await new BookingService().update(id, { bookingStatusId: 3 });
      if (response.success) {
        fetchBooking();
      }
      console.log('Respuesta de servicio', response);
      setIsLoading(false);
      toast({
        status: 'error',
        title: 'Servicio rechazado',
        position: 'top',
      })
      
    }
  }    

  if (isLoading) {
    return <LoadingView />
  }

  if (!booking) {
    return (
      <Text>Servicio no encontrado</Text>
    )
  }

  const colorStatus = (statusId :number) => {
    switch (statusId) {
      case 1:
        return '#D69E2E'
      case 2:
        return 'primary'
      case 3:
        return 'error'
      default:
        break;
    }
  }
  
  return (
    <>
      <Box bg={colorStatus(booking.bookingStatusId)} color='#FFF' py={6} px={12} borderBottomWidth={1} borderColor='borders'>
        <VStack align='left' justify='flex-start'>
          <Heading as='h1'>{booking.customer.firstName} {booking.customer.lastName}</Heading>
          <Text color='#FFF'>Teléfono: {booking.customer.phone}</Text>
          <Text color='#FFF'>Fecha de solicitud: {formatDateLG(booking.createdAt)}</Text>
        </VStack>
      </Box>
      
      <ContainerPage>
        <Flex justify='space-between'>
          <Flex direction='column' w='62%'>
            <Box bg='surface' py={6} px={6} borderWidth={1} borderColor='borders' mb={6}>
              <Heading as='h4' fontSize='2xl' mb={6}>Resumen del servicio</Heading>

              { booking.message &&
              <VStack textAlign='left' align='flex-start' justify='flex-start' spacing={1} mb={4}>
                <Text fontSize='sm' fontWeight='600' color='subtext'>Comentario</Text>
                <Text as='cite'>{booking.message}</Text>
              </VStack>
              }
              <HStack>
                <VStack textAlign='left' align='flex-start' justify='flex-start' spacing={1} mb={4}>
                  <Text fontSize='sm' fontWeight='600' color='subtext'>Fecha de servicio</Text>
                  <Text fontWeight='600'>{formatDateLG(booking.bookingDate)}</Text>
                </VStack>
              </HStack>
              <HStack spacing={10}>
                <VStack textAlign='left' align='flex-start' justify='flex-start' spacing={1} mb={4}>
                  <Text fontSize='sm' fontWeight='600' color='subtext'>Tiempo de servicio</Text>
                  <Text fontWeight='600'>{minutesToHour(booking.totalTime)}</Text>
                </VStack>
                <VStack textAlign='left' align='flex-start' justify='flex-start' spacing={1} mb={4}>
                  <Text fontSize='sm' fontWeight='600' color='subtext'>Total a cobrar</Text>
                  <Text fontWeight='600'>${booking.totalPrice}MXN</Text>
                </VStack>
              </HStack>
            </Box>

            <Box bg='surface' py={6} px={6} w='100%' borderWidth={1} borderColor='borders'>
              <Heading as='h4' fontSize='2xl' mb={6}>Servicios</Heading>
              <Stack mb={3} w='100%'>
                { booking.bookingService.map((item: IBookingService) => (
                  <Flex align='center' justify='space-evenly' flex='100%'>
                    <Text fontSize='md' fontWeight='semibold' w='260px'>{item.nameService}</Text>
                    <Spacer />
                    <Flex alignSelf='center'>
                      <Box w='15px' />
                      <Flex direction='column'>
                        <Text fontSize='xs' pr='10px'>${item.priceService}MXN</Text>
                        <Text fontSize='xs' pr='10px'>{item.timeService}min</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                )) }
              </Stack>
            </Box>
          </Flex>

          <Box w='35%'>
            { booking.bookingStatusId === 1 &&
            <Box bg='surface' py={6} px={6} borderWidth={1} borderColor='borders'>
              <Flex justifyContent='center' direction='column' alignItems='center'>
                <Heading as='h4' fontSize='2xl'>Solicitud</Heading>
                <Text mt={10} textAlign='center'>Oscar Alberto esta interesado en hacer una reservación. ¿Lo aceptas?</Text>
                <VStack my={6} w='100%'>
                  <Button variant='primary' isFullWidth size='lg' onClick={handleToAcept}>
                    Aceptar
                  </Button>
                  <Button variant='outline' colorScheme='red' isFullWidth size='lg' onClick={handleToCancel}>
                    Rechazar
                  </Button>
                </VStack>
              </Flex>
            </Box>
            }
          </Box>

        </Flex>
      </ContainerPage>
    </>
  );
}