import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@chakra-ui/react';

interface AlertErrorProps {
  title?: string
  description?: string
}

export const AlertError: React.FC<AlertErrorProps> = ({ title, description }) => {
  return (
    <Alert status='error' >
      { title && <AlertTitle>{title}</AlertTitle> }
      { description && <AlertDescription fontSize='sm' textAlign='left'>{description}</AlertDescription> }
    </Alert>
  );
}