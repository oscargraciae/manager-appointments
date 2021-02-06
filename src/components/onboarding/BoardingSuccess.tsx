import React, { useEffect, useState } from 'react'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import { AiFillCheckCircle } from 'react-icons/ai';
import { APP_NAME } from '../../config/constants';
import { useHistory } from 'react-router-dom';
import { BusinessService } from '../../services/businessService';
import { IBusiness } from '../../types/Business';

interface BoardingSuccessProps {
  
}

export const BoardingSuccess: React.FC<BoardingSuccessProps> = ({ }) => {
  const history = useHistory();

  const [business, setBusiness] = useState<Required<IBusiness> | null>(null);
  
  const getBusiness = async () => {
    const { success, business }  = await new BusinessService().get();
    if (success) {
      setBusiness(business);
    }
  }

  useEffect(() => {
    getBusiness();
  }, []);

  const publishBusiness = async () => {
    const data : IBusiness = { isCompleted: true, isPublic: true };
    if (business) {
      const response = await new BusinessService().update(data, business.id);
      if (response.success) {
        history.push('/');
      }
    }
  }

  return (
    <Flex align='center' direction='column' textAlign='center'>
      <AiFillCheckCircle size={90} color='#25CB67' />
      <Heading my={6} as='h2'>Completado</Heading>
      <Text fontSize='xl' fontWeight='500' mb={3}>
        Gracias por registrate en {APP_NAME}, toda la información registrada anteriormente puede ser modificada desde la página de configuración.
      </Text>
      <Text fontSize='md' fontWeight='500'>
        Te sugerimos ir al módulo de configuración para que añadas más servicios y publiques tu galería de fotos.
      </Text>
      

      <Button variant='primary' size='lg' mt={6} px={16} onClick={publishBusiness}>
        Aceptar y publicar
      </Button>
    </Flex>
  );
}