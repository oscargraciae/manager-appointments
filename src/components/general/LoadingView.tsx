import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react'

interface LoadingViewProps {}

export const LoadingView: React.FC<LoadingViewProps> = () => {
  return (
    <Flex direction='column' justify='center' align='center' flex={1} w='100%' height='100vh'>
      <Spinner size='md' color='primary' />
    </Flex>
  );
}