import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, NumberInput, NumberInputField, Select, Text, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { User } from '../../types/User';
import { Form, Formik } from 'formik';
import { InputField } from '../general/InputField';
import { BusinessService } from '../../services/businessService';
import { IBusinessItemService } from '../../types/BusinessService';

interface BoardingServicesProps {
  user: User
  businessId: number
}

export const BoardingServices: React.FC<BoardingServicesProps> = ({ businessId }) => {
  const [services, setServices] =  useState<IBusinessItemService[]>([]);
  const history = useHistory()

  const onSubmit = async (values: IBusinessItemService) => {
    const { success } = await new BusinessService().createService(values, businessId)
    if (success) {
      history.push('/new-business/4');
    }
  }

  const initialValue = {
    name: '',
    description: '',
    time: '',
    price: '',
  }

  return (
    <Box textAlign='center'>
    <Heading as='h2'>¿Qué servicios realizas?</Heading>
      <Text fontSize='xl' fontWeight='500'>Añade un servicio para empezar a utilizar Boombook</Text>
      
      <Formik initialValues={initialValue} onSubmit={onSubmit}>
        { (({ isSubmitting, values, handleChange, setFieldValue }) => (
          <Form>
            <Flex align='center' w='100%' justify='center' mt={10}>
              <VStack w='70%' spacing={3}>
                <InputField inputSize='lg' name='name' label='Nombre del servicio' />
                <InputField inputSize='lg' name='description' label='Descripción' />
                <HStack w='100%' direction='row' justify='space-between'>
                  <FormControl>
                    <FormLabel fontWeight='bold' fontSize='sm'>Precio</FormLabel>
                    <NumberInput name='price' size='lg' onChange={(value) => setFieldValue('price', value)} value={values.price}>
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                  {/* <InputNumberField inputSize='lg' name='Precio' label='Tiempo que dura (minutos)' placeholder='Ej. 45' /> */}
                  {/* <InputField inputSize='lg' name='time' label='Tiempo que dura (minutos)' placeholder='Ej. 45' /> */}
                  <FormControl>
                    <FormLabel fontWeight='bold' fontSize='sm'>Tiempo</FormLabel>
                    <Select name='time' size='lg' placeholder="Seleccione la duración" value={values.time} onChange={handleChange}>
                      <option value="15">15 min.</option>
                      <option value="30">30 min.</option>
                      <option value="45">45 min.</option>
                      <option value="45">45 min.</option>
                      <option value="60">1:00 hr.</option>
                      <option value="75">1:15 hr.</option>
                      <option value="90">1:30 hr.</option>
                      <option value="105">1:45 hr.</option>
                      <option value="120">2:00 hr.</option>
                    </Select>
                  </FormControl>
                </HStack>
                <Button variant='primary' type='submit' isLoading={isSubmitting}>Siguiente</Button>
              </VStack>
            </Flex>
          </Form>
        )) }
      </Formik>
    </Box>
  );
}