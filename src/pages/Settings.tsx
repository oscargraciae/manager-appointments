// libraries
import { Box } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

// local components

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  return (
    <Box>
      <h1>Configuraciones</h1>
      <Link to='/'>Regresar</Link>
    </Box>
  );
}