import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

import { APP_NAME } from '../../config/constants';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <Flex direction='column' justify='center' align='center' flex={1} w='100%' height='100vh'>
      <Spinner size='xl' color='primary' />
      <Text mt={4} fontWeight='bold' fontSize='2xl'>Cargando {APP_NAME}</Text>
    </Flex>
  );
}