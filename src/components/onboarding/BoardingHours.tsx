import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, Heading, HStack, IconButton, Select, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { BusinessService } from '../../services/businessService';
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa';
import { IBusiness } from '../../types/Business';
import { Loading } from '../general/Loading';

interface BoardingHoursProps {}

export const BoardingHours: React.FC<BoardingHoursProps> = () => {
  const history = useHistory()
  const [business, setBusiness] = useState<Required<IBusiness> | null>(null);

  const [hours, setHours] = useState<string[]>([]);

  const getBusiness = async () => {
    const { success, business }  = await new BusinessService().get();
    if (success) {
      setBusiness(business);
    }
  }

  useEffect(() => {
    getBusiness();
    getHours();
  }, []);

  const getHours = () => {
    var arr = [], i, j;
    for(i=0; i<24; i++) {
      for(j=0; j<2; j++) {
        arr.push(i + ":" + (j===0 ? "00" : 30*j) );
      }
    }
    setHours(arr);
  }

  const onSubmit = async (values: any) => {
    if (business) {
      const response = await new BusinessService().createHours(values, business.id);
      if (response.success) {
        history.push('/new-business/5');
      }
    }
  }

  const formDay = (values: any, handleChange: any, setFieldValue: any, label: string, dayOfWeek: number) => {
    const isOpen : boolean = values.days[dayOfWeek].isOpen;
    const { openFrom, openTill } = values.days[dayOfWeek];
    return (
      <HStack w='100%' direction='row' justify='center' align='center'>
        <Text w='250px' textAlign='left' fontWeight='semibold'>{label}</Text>
        <FormControl>
          <Select name={`days[${dayOfWeek}].openFrom`} size='lg' value={openFrom} onChange={handleChange} isDisabled={!isOpen}>
            { hours.map((time, key) => (
              <option key={key} value={time}>{time}</option>
            ))}
          </Select>
        </FormControl>
        
        <FormControl>
          <Select name={`days[${dayOfWeek}].openTill`} size='lg' value={openTill} onChange={handleChange} isDisabled={!isOpen}>
            { hours.map((time, key) => (
              <option key={key} value={time}>{time}</option>
            ))}
          </Select>
        </FormControl>
        <Tooltip label={isOpen ? 'Cerrar este día' : 'Abrir este día'} fontSize="md">
          <IconButton
            colorScheme={isOpen ? 'blue' : 'red'}
            aria-label="Call Segun"
            size="lg"
            icon={isOpen ? <FaDoorOpen /> : <FaDoorClosed />}
            onClick={() => setFieldValue(`days[${dayOfWeek}].isOpen`, !isOpen )}
          />
        </Tooltip>
      </HStack>
    )
  }

  if (!business) {
    return <Loading />
  }

  const initialValue = {
    days: [
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 0 },
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 1 },
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 2 },
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 3 },
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 4 },
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 5 },
      { businessId: business.id, openFrom: '9:00', openTill: '20:00', isOpen: true, dayOfWeek: 6 },
    ]
  }

  return (
    <Box textAlign='center'>
    <Heading as='h2'>¿Cuál es el horario de tu negocio?</Heading>
      <Text fontSize='xl' fontWeight='500'>Ingresa el horario de tu negocio ya que será la hora disponible para hacer reservaciones.</Text>
      
      <Formik initialValues={initialValue} onSubmit={onSubmit}>
        { (({ isSubmitting, values, handleChange, setFieldValue }) => (
          <Form>
            <Flex align='center' w='100%' justify='center' mt={10}>
              <VStack w='80%' spacing={3}>
                { formDay(values, handleChange, setFieldValue, 'Lunes', 0) }
                { formDay(values, handleChange, setFieldValue, 'Martes', 1) }
                { formDay(values, handleChange, setFieldValue, 'Miércoles', 2) }
                { formDay(values, handleChange, setFieldValue, 'Jueves', 3) }
                { formDay(values, handleChange, setFieldValue, 'Viernes', 4) }
                { formDay(values, handleChange, setFieldValue, 'Sábado', 5) }
                { formDay(values, handleChange, setFieldValue, 'Domingo', 6) }
                <Button size='lg' alignSelf='flex-end' variant='primary' type='submit' isLoading={isSubmitting}>Siguiente</Button>
              </VStack>
            </Flex>
          </Form>
        )) }
      </Formik>
    </Box>
  );
}