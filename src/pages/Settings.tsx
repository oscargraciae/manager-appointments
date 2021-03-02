// libraries
import React, { useEffect, useState } from 'react'
import { Box, VStack, Select, Button, FormControl, FormLabel, Heading, FormErrorMessage, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { ContainerPage } from '../components/general/ContainerPage';
import { InputField, TextareaField } from '../components/general/InputField';
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
    description: business.description ? business.description : '',
    businessCategoryId: business.businessCategoryId ? business.businessCategoryId : 0,
    phone: business.phone ? business.phone : ''
  }

  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Box w={{ base: '100%', md: '70%' }}>
          <Heading as='h2' size='md' mb={8}>Datos básicos</Heading>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validate={businessValidation}>
            { (({ isSubmitting, values, handleChange, errors }) => (
              <Form>
                <VStack spacing={8} align='flex-start'>
                  <InputField inputSize='lg' name='name' label='Nombre del negocio' />
                  <TextareaField inputSize='lg' name='description' label='Descripción del negocio (opcional)' rows={4} />
                  <FormControl isInvalid={!!errors.businessCategoryId}>
                    <FormLabel fontWeight='bold' fontSize='sm'>Categoría</FormLabel>
                    <Select name='businessCategoryId' size='lg' value={values.businessCategoryId} onChange={handleChange}>
                      <option value='0' >Selecciona una categoría</option>
                    </Select>
                    { errors.businessCategoryId && <FormErrorMessage>{errors.businessCategoryId}</FormErrorMessage> }
                  </FormControl>
                  <InputField inputSize='lg' name='phone' label='Teléfono de contacto' />
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