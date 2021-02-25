import React, { useState, useEffect, useContext } from 'react'
import { Heading, HStack, Text, Tooltip, FormControl, Select, Switch, IconButton, Box, Flex, VStack, Button, useToast, Stack, Spacer, Divider } from '@chakra-ui/react';
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


interface SettingsAdvancedProps {

}

export const SettingsAdvanced: React.FC<SettingsAdvancedProps> = () => {
  // context
  const businessContext = useContext(UserContext);

  // Hooks
  const history = useHistory()
  const toast = useToast();

  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [hasBookingConfimation, setHasBookingConfimation] = useState(false);
  const [hasParallelBookings, setHasParallelBookings] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const fetchBusiness = async () => {
      const { business } = await new BusinessService().get();
      console.log('Datos de negocio', business);
      if (business) {
        setBusiness(business);
        setHasBookingConfimation(business.hasBookingConfimation);
        setHasParallelBookings(business.hasParallelBookings);
        setIsPublic(business.isPublic);
      }
      
    }
    fetchBusiness();
  }, []);

  const onSubmit = async () => {
    setIsSubmitting(true);
    if (business && business.id) {
      const response = await new BusinessService().update({ isPublic, hasBookingConfimation, hasParallelBookings }, business.id);
      if (response.success) {
        toast({
          title: "Datos actualizados.",
          status: "success",
          isClosable: true,
          position: 'top'
        });
      }
      console.log('Respuesta de ', response);
    }
    setIsSubmitting(false);
  }
  
  const initialValue = {}

  if (!business) {
    return <LoadingView />
  }

  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Box>
          <Heading as='h2' size='md' mb={2}>Configuraciones avanzadas</Heading>
        </Box>
        <Flex w='100%' mt={10}>
          <VStack align="flex-start" direction="row" divider={<Divider />} spacing={6}>
            <Flex w='450px'>
              <Text fontWeight='500'>Permitir varias reservaciones a la misma hora</Text>
              <Spacer />
              <Switch size="md" isChecked={hasParallelBookings} onChange={(e) => setHasParallelBookings(!hasParallelBookings)} />
            </Flex>
            {/* <Flex w='450px'>
              <Text fontWeight='500'>Confirmar reservaciones</Text>
              <Spacer />
              <Switch size="md" isChecked={hasBookingConfimation} onChange={(e) => setHasBookingConfimation(!hasBookingConfimation)} />
            </Flex> */}
            <Flex w='450px'>
              <Text fontWeight='500'>Negocio público</Text>
              <Spacer />
              <Switch size="md" isChecked={isPublic} onChange={(e) => setIsPublic(!isPublic)} />
            </Flex>
            <Button variant='primary' size='lg' onClick={onSubmit} isLoading={isSubmitting}>
              Guardar
            </Button>
          </VStack>
        </Flex>
      </WrapperSettings>
    </ContainerPage>
  );
}