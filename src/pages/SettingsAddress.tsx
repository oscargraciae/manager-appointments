import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Heading, HStack, useToast, VStack , Text} from '@chakra-ui/react';

import { ContainerPage } from '../components/general/ContainerPage';
import { WrapperSettings } from '../components/general/WrapperSettings';
import { BusinessAddress } from '../types/BusinessAddress';
import { Form, Formik } from 'formik';
import { UserContext } from '../components/general/Layout';
import { InputField } from '../components/general/InputField';
import { BusinessAddressService } from '../services/businessAddressService';
import { Loading } from '../components/general/Loading';
import { LoadingView } from '../components/general/LoadingView';

interface SettingsAddressProps {}

export const SettingsAddress: React.FC<SettingsAddressProps> = () => {
  const [address, setAddress] = useState<BusinessAddress | null>(null);
  const businessContext = useContext(UserContext);
  const toast = useToast();
  
  useEffect(() => {
    const fetchAddress = async () => {
      const { address } = await new BusinessAddressService().get(businessContext.id);
      if (address) {
        setAddress(address);
      }
      console.log('Direccion', address);
    }

    fetchAddress();
  }, []);

  const onSubmit = async (values: any) => {
    if (businessContext && businessContext.id && address?.id) {
      console.log('Id de negocio', businessContext.id, values);
      const { success } = await new BusinessAddressService().update(values, businessContext.id, address.id);
      if (success) {
        toast({
          title: "Datos actualizados.",
          status: "success",
          isClosable: true,
          position: 'top'
        });
      }
    }
  }

  if (!address) {
    return <LoadingView />
  }

  const initialValues = {
    street: address.street ? address.street : '',
    area: address.area ? address.area : '',
    city: address.city ? address.city : '',
    state: address.state ? address.state : '',
    zipcode: address.zipcode ? address.zipcode : '',
  }

  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Heading as='h2' size='md' mb={2}>Dirección</Heading>
        <Text fontSize='md' fontWeight='500' mb={8} pr={20}>Esta información es utilizada  si la ubicación por coordenadas no es precisa, así que es recomendable ingresarla.</Text>
        <Box w='80%'>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            { (({ isSubmitting }) => (
              <Form>
                <VStack spacing={8} align='flex-start'>
                <HStack spacing={4} w='100%'>
                  <InputField inputSize='lg' name='street' label='Calle y número' />
                  <InputField inputSize='lg' name='area' label='Colonia' />
                </HStack>
                <HStack spacing={4} w='100%'>
                  <InputField inputSize='lg' name='city' label='Municipio' />
                  <InputField inputSize='lg' name='state' label='Estado' />
                </HStack>
                <HStack spacing={4} w='49%'>
                  <InputField inputSize='lg' name='zipcode' label='Codigo postal' />
                </HStack>
                <Button variant='primary' type='submit' size='lg' isLoading={isSubmitting}>Guardar</Button>
                </VStack>
              </Form>
            )) }
          </Formik>
        </Box>
      </WrapperSettings>
    </ContainerPage>
  );
}