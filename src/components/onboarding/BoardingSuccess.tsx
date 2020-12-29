import React from 'react'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { AiFillCheckCircle } from 'react-icons/ai';
import { APP_NAME } from '../../config/constants';
import { useHistory } from 'react-router-dom';

interface BoardingSuccessProps {}

export const BoardingSuccess: React.FC<BoardingSuccessProps> = ({}) => {
  const history = useHistory();
  return (
    <Flex align='center' direction='column' textAlign='center'>
      <AiFillCheckCircle size={90} color='#25CB67' />
      <Heading my={6} as='h2'>Completado</Heading>
      <Text fontSize='xl' fontWeight='500'>Gracias por registrate en {APP_NAME}, toda la información registrada anteriormente puede ser modificada desde la pagina de configuración.</Text>

      <Button variant='primary' size='lg' mt={6} px={16} onClick={() => history.push('/')}>
        Aceptar
      </Button>
    </Flex>
  );
}