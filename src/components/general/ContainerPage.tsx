import { Box, Heading } from '@chakra-ui/react';
import React from 'react'

interface ContainerPageProps {
  title?: string
}

export const ContainerPage: React.FC<ContainerPageProps> = ({ title, children }) => {
  return (
    <Box p={6} w='100%' maxW='1920px'>
      { title && <Heading as='h3' size='lg'>{title}</Heading> }
      

      {/* <div style={{ backgroundColor }}></div> */}

      <Box mt={3}>
        {children}
      </Box>
    </Box>
  );
}