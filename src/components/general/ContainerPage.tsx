import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

interface ContainerPageProps {
  title: string
}

export const ContainerPage: React.FC<ContainerPageProps> = ({ title, children }) => {
  return (
    <Box p={6} maxW='900px'>
      <Heading as='h3' size='lg'>{title}</Heading>

      <Box mt={3}>
        {children}
      </Box>
    </Box>
  );
}