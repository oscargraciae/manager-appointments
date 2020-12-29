import React from 'react'
import { useHistory } from 'react-router-dom';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
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

      <Formik initialValues={{ name: business ? business.name : '' }} onSubmit={onSubmit}>
        { ({ values, isSubmitting }) => (
          <Form>
            <Flex aling='center' justify='center' py={10} w='100%' direction='column' justifyContent='center' align='center'>
              <Box w='70%'>
                <InputField inputSize='lg' name='name' label='¿Cual es el nombre de tu negocio?' />
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