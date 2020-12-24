import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

interface ContainerPageProps {
  title: string
}

export const ContainerPage: React.FC<ContainerPageProps> = ({ title, children }) => {
  return (
    <Box p={6}>
      <Heading as='h1'>{title}</Heading>

      <Box mt={3}>
        {children}
      </Box>
    </Box>
  );
}