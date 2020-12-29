// Libraries
import React, { useState } from 'react'
import { Box, Button, Heading, Text, VStack, Link, Divider } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Link as Lnk, useHistory } from 'react-router-dom';

// Local libraries
import { loginValidation } from '../validations/loginValidation';
import { UserService } from '../services/userService';
import { User } from '../types/User';

// Components
import { Wrapper } from '../components/general/Wrapper';
import { InputField, PasswordInputField } from '../components/general/InputField';
import { AlertError } from '../components/general/AlertError';

export const Login: React.FC = () => {
  const [error, setError] = useState('');

  const history = useHistory();

  const onSubmit = async (values: User) => {
    const userService = new UserService();
    const response = await userService.login(values);

    if (!response.success && response.message) {
      setError(response.message);
    } else {
      console.log('cambio de pagina login');
      history.push('/test');
    }
  };

  const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  return (
    <Wrapper variant="small">
      <Box shadow='md' my={0} mx="auto" textAlign='center' p={10} bg='surface'>
        <Heading as='h1'>Inicia sesión</Heading>
        <Box mt={6}>
          <Formik initialValues={initialState} onSubmit={onSubmit} validate={loginValidation}>
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing={4}>
                  {/* <InputField name='firstName' label='Nombre' />
                  <InputField name='lastName' label='Apellido' /> */}
                  <InputField name='email' label='Correo eletrónico' />
                  <PasswordInputField name='password' label='Contraseña' />
                  <Button mt={40} isLoading={isSubmitting} type='submit' size='lg' variant='primary' isFullWidth>Iniciar sesión</Button>
                  <Button alignSelf='flex-end' textAlign='right' size='sm' variant='link'>¿Olvidaste tu contraseña?</Button>
                  { error && <AlertError description={error} /> }

                  <Divider orientation='horizontal' my={4} />
                  <Text mb={2}>¿No tienes cuenta?{" "}
                    <Lnk to='/signup'>
                      <Link color='primary' fontWeight='bold'>Registrate</Link>
                    </Lnk>
                  </Text>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Wrapper>
  );
}