import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// local components
import { Layout } from '../components/general/Layout';


interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Box>
      <Text>Home</Text>
      <Link to='/settings' >Ir a configuración</Link>
    </Box>
  );
}