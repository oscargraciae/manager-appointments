// libraries
import React, { useEffect, useState } from 'react'
import { Box, VStack, Select, Button, FormControl, FormLabel, Heading, FormErrorMessage, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { ContainerPage } from '../components/general/ContainerPage';
import { InputField } from '../components/general/InputField';
import { WrapperSettings } from '../components/general/WrapperSettings';
import { BusinessService } from '../services/businessService';
import { IBusiness } from '../types/Business';
import { businessValidation } from '../validations/businessValidation';
import { Loading } from '../components/general/Loading';
import { LoadingView } from '../components/general/LoadingView';

// local components

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = () => {
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchBusiness = async () => {
      const { business } = await new BusinessService().get();
      console.log('Business', business);
      
      setBusiness(business);
    }
    fetchBusiness();
  }, []);

  const onSubmit = async (values: IBusiness) => {
    if (business && business.id) {
      const response =await new BusinessService().update(values, business.id)
      if (response.success) {
        toast({
          title: "Datos actualizados.",
          status: "success",
          isClosable: true,
          position: 'top'
        });
      }
      console.log('respuesta', response);
    }
  }

  if(!business) {
    return <LoadingView />
  }

  const initialValues : IBusiness = {
    name: business.name ? business.name : '',
    businessCategoryId: business.businessCategoryId ? business.businessCategoryId : 0,
    phone: business.phone ? business.phone : ''
  }

  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Box w='70%'>
          <Heading as='h2' size='md' mb={8}>Datos básicos</Heading>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validate={businessValidation}>
            { (({ isSubmitting, values, handleChange, errors }) => (
              <Form>
                <VStack spacing={8} align='flex-start'>
                  <InputField inputSize='lg' name='name' label='Nombre del negocio' />
                  <FormControl isInvalid={!!errors.businessCategoryId}>
                    <FormLabel fontWeight='bold' fontSize='sm'>Categoría</FormLabel>
                    <Select name='businessCategoryId' size='lg' value={values.businessCategoryId} onChange={handleChange}>
                      <option value='0' >Selecciona una categoría</option>
                      <option value='1' >Salon</option>
                      <option value='2' >Spa</option>
                      <option value='3' >Barberia</option>
                      <option value='4' >Tatuajes</option>
                      <option value='5' >Maquillaje</option>
                      <option value='6' >Podologia</option>
                      <option value='7' >Servicios para el hogar</option>
                      <option value='8' >Servicios para el mascotas</option>
                    </Select>
                    { errors.businessCategoryId && <FormErrorMessage>{errors.businessCategoryId}</FormErrorMessage> }
                  </FormControl>
                  <InputField inputSize='lg' name='phone' label='Teléfono de contacto (opcional)' />
                  {/* <HStack spacing={3} w='100%'>
                    <InputField inputSize='lg' name='category' label='Horario de apertura' />
                    <InputField inputSize='lg' name='category' label='Horario de clausura' />
                  </HStack> */}
                  <Button variant='primary' size='lg' type='submit' isLoading={isSubmitting}>
                    Guardar
                  </Button>
                </VStack>
              </Form>
            )) }
          </Formik>
        </Box>
      </WrapperSettings>
    </ContainerPage>
  );
}