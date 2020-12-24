import { Box, Text } from '@chakra-ui/react';
import React from 'react'

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
  return (
    <Box>
      <Text>Not found</Text>
    </Box>
  );
}