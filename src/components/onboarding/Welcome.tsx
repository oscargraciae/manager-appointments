import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Select, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { BusinessService } from '../../services/businessService';
import { IBusiness } from '../../types/Business';
import { User } from '../../types/User';
import { InputField, TextareaField } from '../general/InputField';
import { welcomeValidationSchema } from '../../validations/welcomeValidation';
import { CategoryService } from '../../services/categoryService';

interface WelcomeProps {
  user: User
  business?: IBusiness | null
}

export const Welcome: React.FC<WelcomeProps> = ({ user, business }) => {
  const history = useHistory();

  // state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await new CategoryService().getAll();
      if (response.success) {
        setCategories(response.categories);
      }
    }
    fetchCategories();
  }, []);

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

      <Formik initialValues={{ name: business ? business.name : '', businessCategoryId: business ? business.businessCategoryId : 0 }} onSubmit={onSubmit} validationSchema={welcomeValidationSchema}>
        { ({ values, isSubmitting, handleChange, errors }) => (
          <Form>
            <Flex aling='center' justify='center' py={10} w='100%' direction='column' justifyContent='center' align='center'>
              <Box w='70%'>
                <VStack spacing={5} align='flex-start'>
                  <InputField inputSize='lg' name='name' label='¿Cual es el nombre de tu negocio?'/>
                  <FormControl isInvalid={!!errors.businessCategoryId}>
                      <FormLabel fontWeight='bold' fontSize='sm'>Categoría</FormLabel>
                      <Select name='businessCategoryId' size='lg' value={values.businessCategoryId} onChange={handleChange}>
                        <option value='0' >Selecciona una categoría</option>
                        { categories.map((item: any) => (
                          <option value={item.id} key={item.id}>{item.name}</option>
                        )) }
                      </Select>
                      { errors.businessCategoryId && <FormErrorMessage>{errors.businessCategoryId}</FormErrorMessage> }
                    </FormControl>
                    <TextareaField inputSize='lg' name='description' label='Descripción del negocio (opcional)' rows={3} />
                    <InputField inputSize='lg' name='phone' label='Teléfono del negocio' />
                  <Box textAlign='right' alignSelf='flex-end'>
                    <Button
                      variant='primary'
                      size='lg'
                      type='submit'
                      isLoading={isSubmitting}
                    >
                      Siguiente
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </Flex>
          </Form>
        ) }
      </Formik>
    </Box>
  );
}