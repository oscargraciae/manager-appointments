import React, { useState, useEffect, useContext } from 'react'
import { Heading, HStack, Text, Tooltip, FormControl, Select, IconButton, Box, Flex, VStack, Button, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa';

// Types
import { IBusiness } from '../types/Business';

// services
import { BusinessService } from '../services/businessService';
import { formatHoursDate } from '../utils/formatHoursDate';

// components
import { ContainerPage } from '../components/general/ContainerPage';
import { WrapperSettings } from '../components/general/WrapperSettings';
import { LoadingView } from '../components/general/LoadingView';
import { Form, Formik } from 'formik';
import { UserContext } from '../components/general/Layout';
import { IHour } from '../types/IHour';


interface SettingsHourProps {

}

export const SettingsHour: React.FC<SettingsHourProps> = () => {
  // context
  const businessContext = useContext(UserContext);

  // Hooks
  const history = useHistory()
  const toast = useToast();

  // states
  const [hours, setHours] = useState<string[]>([]);
  const [myHours, setMyHours] = useState<IHour[]>([]);
  
  useEffect(() => {
    const fetchHours = async () => {
      const response = await new BusinessService().getHours(businessContext.id);
      
      if (response.success && response.hours) {
        const newHours = formatHoursDate(response.hours);
        setMyHours(newHours);
      }
    }

    fetchHours();
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
    if (businessContext?.id) {
      const response = await new BusinessService().createHours(values, businessContext.id);
      if (response.success) {
        toast({
          title: "Datos actualizados.",
          status: "success",
          isClosable: true,
          position: 'top'
        });
      }
    }
  }

  const formDay = (values: any, handleChange: any, setFieldValue: any, label: string, dayOfWeek: number) => {
    const isOpen : boolean = values.days[dayOfWeek].isOpen;
    const { openFrom, openTill } = values.days[dayOfWeek];
    return (
      <HStack w='100%' direction='row' justify='center' align='center'>
        <Text fontSize={{ base: 'sm', md: 'md' }} w='250px' textAlign='left' fontWeight='semibold'>{label}</Text>
        <FormControl>
          <Select name={`days[${dayOfWeek}].openFrom`} size='lg' value={openFrom} onChange={handleChange}>
            { hours.map((time, key) => (
              <option key={key} value={time}>{time}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select name={`days[${dayOfWeek}].openTill`} size='lg' value={openTill} onChange={handleChange}>
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

  if (!businessContext || myHours.length === 0) {
    return <LoadingView />
  }

  const initialValue = {
    days: [
      { businessId: businessContext.id, openFrom: myHours[0] ? myHours[0].openFrom :  '9:00', openTill: myHours[0] ? myHours[0].openTill : '20:00', isOpen: myHours[0] ? myHours[0].isOpen : true, dayOfWeek: 0 },
      { businessId: businessContext.id, openFrom: myHours[1] ? myHours[1].openFrom :  '9:10', openTill: myHours[1] ? myHours[1].openTill : '20:00', isOpen: myHours[1] ? myHours[1].isOpen : true, dayOfWeek: 1 },
      { businessId: businessContext.id, openFrom: myHours[2] ? myHours[2].openFrom :  '9:00', openTill: myHours[2] ? myHours[2].openTill : '20:00', isOpen: myHours[2] ? myHours[2].isOpen : true, dayOfWeek: 2 },
      { businessId: businessContext.id, openFrom: myHours[3] ? myHours[3].openFrom :  '9:00', openTill: myHours[3] ? myHours[3].openTill : '20:00', isOpen: myHours[3] ? myHours[3].isOpen : true, dayOfWeek: 3 },
      { businessId: businessContext.id, openFrom: myHours[4] ? myHours[4].openFrom :  '9:00', openTill: myHours[4] ? myHours[4].openTill : '20:00', isOpen: myHours[4] ? myHours[4].isOpen : true, dayOfWeek: 4 },
      { businessId: businessContext.id, openFrom: myHours[5] ? myHours[5].openFrom :  '9:50', openTill: myHours[5] ? myHours[5].openTill : '20:00', isOpen: myHours[5] ? myHours[5].isOpen : true, dayOfWeek: 5 },
      { businessId: businessContext.id, openFrom: myHours[6] ? myHours[6].openFrom :  '9:00', openTill: myHours[6] ? myHours[6].openTill : '20:00', isOpen: myHours[6] ? myHours[6].isOpen : true, dayOfWeek: 6 },
    ]
  }

  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Box>
          <Heading as='h2' size='md' mb={2}>Horario</Heading>
        </Box>
        <Box>
        <Formik initialValues={initialValue} onSubmit={onSubmit}>
        { (({ isSubmitting, values, handleChange, setFieldValue }) => (
          <Form>
            <Flex w='100%' mt={10}>
              <VStack w={{ base: '100%', md: '80%' }} spacing={3}>
                { formDay(values, handleChange, setFieldValue, 'Domingo', 0) }
                { formDay(values, handleChange, setFieldValue, 'Lunes', 1) }
                { formDay(values, handleChange, setFieldValue, 'Martes', 2) }
                { formDay(values, handleChange, setFieldValue, 'Miercoles', 3) }
                { formDay(values, handleChange, setFieldValue, 'Jueves', 4) }
                { formDay(values, handleChange, setFieldValue, 'Viernes', 5) }
                { formDay(values, handleChange, setFieldValue, 'Sabado', 6) }
                <Button size='lg' alignSelf='flex-start' variant='primary' type='submit' isLoading={isSubmitting}>Guardar</Button>
              </VStack>
            </Flex>
          </Form>
        )) }
      </Formik>
        </Box>
      </WrapperSettings>
    </ContainerPage>
  );
}