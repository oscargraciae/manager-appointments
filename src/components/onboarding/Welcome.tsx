import React from 'react'
import { useHistory } from 'react-router-dom';

import { Box, Button, Flex, FormControl, FormLabel, Heading, Select, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { BusinessService } from '../../services/businessService';
import { IBusiness } from '../../types/Business';
import { User } from '../../types/User';
import { InputField } from '../general/InputField';

interface WelcomeProps {
  user: User
  business?: IBusiness | null
}

export const Welcome: React.FC<WelcomeProps> = ({ user, business }) => {
  const history = useHistory();

  const onSubmit = async (values: IBusiness) => {
    if (business && business.id) {
      await new BusinessService().update(values, business.id);
    } else {
      await new BusinessService().create(values);
    }
    history.push('/new-business/2');
  }

  return (
    <Box textAlign='center'>
      <Heading as='h2'>Estamos contentos de que estes aquí {user.firstName}.</Heading>
      <Text fontSize='xl' fontWeight='500'>Estas a un paso de comenzar a organizar tus clientes.</Text>

      <Formik initialValues={{ name: business ? business.name : '', category: 0 }} onSubmit={onSubmit}>
        { ({ values, isSubmitting, handleChange }) => (
          <Form>
            <Flex aling='center' justify='center' py={10} w='100%' direction='column' justifyContent='center' align='center'>
              <Box w='70%'>
                <InputField inputSize='lg' name='name' label='¿Cual es el nombre de tu negocio?' />
                <FormControl>
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
                  </FormControl>
                <Box textAlign='right'>
                  <Button
                    mt={10}
                    variant='primary'
                    size='lg'
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Siguiente
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Form>
        ) }
      </Formik>
    </Box>
  );
}