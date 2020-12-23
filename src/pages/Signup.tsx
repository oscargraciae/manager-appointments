import React, { useState } from 'react'
import { Box, Button, Heading, Text, VStack, Link, Divider } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { Wrapper } from '../components/general/Wrapper';
import { InputField, PasswordInputField } from '../components/general/InputField';
import { UserService } from '../services/userService';
import { User } from '../types/User';
import { AlertError } from '../components/general/AlertError';

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
  const [error, setError] = useState('');

  const onSubmit = async (values: User) => {
    const userService = new UserService();
    const response = await userService.login(values);

    if (!response.success && response.message) {
      setError(response.message);
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
        <Heading as='h1'>Bienvenido</Heading>
        <Text mt={2} fontWeight='bold'>Registrate y obten 3 meses gratis.</Text>
        <Box mt={4}>
          <Formik initialValues={initialState} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <VStack spacing={4}>
                  <InputField name='firstName' label='Nombre' />
                  <InputField name='lastName' label='Apellido' />
                  <InputField name='email' label='Correo eletrónico' />
                  <PasswordInputField name='password' label='Contraseña' />
                  <Button isLoading={isSubmitting} type='submit' size='lg' variant='primary' isFullWidth>Registrate</Button>

                  { error && <AlertError description={error} /> }

                  <Text as="em" fontSize='sm'>Al registrarte, confirmas que aceptas los <Link href='#' color="teal.500">Términos y condiciones</Link> y la <Link href='#' color="teal.500">Política de privacidad</Link>.</Text>

                  <Divider orientation='horizontal' my={4} />
                  <Text mb={2}>¿Ya tienes tu cuenta?{" "}
                    <Button variant='link' color='brand.400' fontWeight='bold'>Iniciar sesion</Button>
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