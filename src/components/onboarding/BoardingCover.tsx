import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { UploadCover } from '../gallery/UploadCover';

interface BoardingCoverProps {

}

export const BoardingCover: React.FC<BoardingCoverProps> = ({}) => {
  const history = useHistory();

  const handleOnUpload = () => {
    history.push('/new-business/6');
  }

  return (
    <Box textAlign='center'>
      <Heading as='h2'>Foto de portada</Heading>
      <Text fontSize='xl' fontWeight='500'>Esta es la primera imagen que verán las personas, puede ser el logotipo de tu negocio, imagen de tu local o una imagen de un servicio.</Text>
      <Flex w='100%' justify='space-between' mt={10}>
        <UploadCover onUpload={handleOnUpload} />
      </Flex>

      <Button mt={10} variant='outline' onClick={() => history.push('/new-business/6')}>
        Saltar
      </Button>
    </Box>
  );
}