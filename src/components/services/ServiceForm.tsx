import React, { useContext } from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, NumberInput, NumberInputField, Select, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { InputField, TextareaField } from '../general/InputField'
import { NewServiceSchema } from '../../validations/newServiceValidation'
import { IService, IServiceResponse } from '../../types/IService'
import { BusinessService } from '../../services/businessService'
import { UserContext } from '../general/Layout'

interface ServiceFormProps {
  realodList: any
  service?: IService
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ realodList, service }) => {
  const businessContext = useContext(UserContext);

  const onSubmit = async (values: IService) => {
    let response : IServiceResponse;
    if (service?.id) {
      response = await new BusinessService().updateService(values, service.id, businessContext.id);
    } else {
      response = await new BusinessService().createService(values, businessContext.id);
    }
    
    console.log('respuesta', response);
    if (response.success) {
      if (realodList) {
        realodList();
      }
    }
  }

  const initialValues = !service ? {
    name: '',
    description: '',
    price: '',
    time: '',
  } : service;


  return (
    <Box>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={NewServiceSchema}>
        { (({ isSubmitting, values, handleChange, setFieldValue, errors }) => (
          <Form>
            <VStack spacing={4}>
              <InputField name='name' label='Nombre' />
              <TextareaField name='description' label='Descripción (opcional)' />
              <HStack>
                <FormControl isInvalid={!!errors.price}>
                    <FormLabel fontWeight='bold' fontSize='sm'>Precio</FormLabel>
                    <NumberInput name='price' size='lg' onChange={(value) => setFieldValue('price', value)} value={values.price}>
                      <NumberInputField />
                    </NumberInput>
                    { errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage> }
                  </FormControl>
                <FormControl isInvalid={!!errors.time}>
                  <FormLabel fontWeight='bold' fontSize='sm'>Tiempo</FormLabel>
                  <Select name='time' size='lg' placeholder="Seleccioné una duración" value={values.time} onChange={handleChange}>
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
                  { errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage> }
                </FormControl>
              </HStack>
              <Button type='submit' isLoading={isSubmitting} variant='primary' alignSelf='end'>Guardar</Button>
            </VStack>
          </Form>
        )) }
      </Formik>
    </Box>
  );
}