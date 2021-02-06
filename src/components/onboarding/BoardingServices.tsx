import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, NumberInput, NumberInputField, Select, Text, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { Form, Formik } from 'formik';
import { InputField } from '../general/InputField';
import { BusinessService } from '../../services/businessService';
import { IService } from '../../types/IService';
import { IBusiness } from '../../types/Business';
import { NewServiceSchema } from '../../validations/newServiceValidation';

interface BoardingServicesProps {}

export const BoardingServices: React.FC<BoardingServicesProps> = ({}) => {
  const [business, setBusiness] = useState<Required<IBusiness> | null>(null);

  const history = useHistory()

  const getBusiness = async () => {
    const { success, business }  = await new BusinessService().get();
    if (success) {
      setBusiness(business);
    }
  }

  useEffect(() => {
    getBusiness();
  }, []);

  const onSubmit = async (values: IService) => {
    if (business) {
      const { success } = await new BusinessService().createService(values, business.id)
      if (success) {
        history.push('/new-business/4');
      }
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
      
      <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={NewServiceSchema}>
        { (({ isSubmitting, values, handleChange, setFieldValue, errors }) => (
          <Form>
            <Flex align='center' w='100%' justify='center' mt={10}>
              <VStack w='70%' spacing={3}>
                <InputField inputSize='lg' name='name' label='Nombre del servicio' />
                <InputField inputSize='lg' name='description' label='Descripción' />
                <HStack w='100%' direction='row' justify='space-between'>
                  <FormControl isInvalid={!!errors.price}>
                    <FormLabel fontWeight='bold' fontSize='sm'>Precio</FormLabel>
                    <NumberInput name='price' size='lg' onChange={(value) => setFieldValue('price', value)} value={values.price}>
                      <NumberInputField />
                    </NumberInput>
                    { errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage> }
                  </FormControl>
                  {/* <InputNumberField inputSize='lg' name='Precio' label='Tiempo que dura (minutos)' placeholder='Ej. 45' /> */}
                  {/* <InputField inputSize='lg' name='time' label='Tiempo que dura (minutos)' placeholder='Ej. 45' /> */}
                  <FormControl isInvalid={!!errors.time}>
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
                      <option value="135">2:15 hr.</option>
                      <option value="140">2:30 hr.</option>
                    </Select>
                    <FormErrorMessage>{errors.time}</FormErrorMessage>
                  </FormControl>
                </HStack>
                <Button size='lg' alignSelf='flex-end' variant='primary' type='submit' isLoading={isSubmitting}>Siguiente</Button>
              </VStack>
            </Flex>
          </Form>
        )) }
      </Formik>
    </Box>
  );
}