import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormLabel, Text, useToast, Image } from '@chakra-ui/react';

import { BusinessService } from '../../services/businessService';

interface UploadCoverProps {
  onUpload?: any
}

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg';

export const UploadCover: React.FC<UploadCoverProps> = ({ onUpload }) => {
  // hooks
  const toast = useToast();

  // state
  const [cover, setCover] = useState('');
  const [isUploading, setIsUplaoding] = useState(false);

  const fetch = async () => {
    const response = await new BusinessService().get();
    setCover(response.business.cover);
  }

  useEffect(() => {
    fetch();
  }, [])

  const onChange = async (e :any) => {
    setIsUplaoding(true);

    const data = new FormData();
    data.append('file', e.target.files[0]);
    await new BusinessService().uplaodCover(data);

    fetch();   

    toast({
      title: "Datos actualizados.",
      status: "success",
      isClosable: true,
      position: 'top'
    });

    setIsUplaoding(false);

    if (onUpload) {
      onUpload();
    }

  }

  return (
    <>
      <Box w='60%' pr={10}>
        <Text fontWeight='bold' mb={4}>Foto de portada</Text>
        <Text fontSize='sm' color='subtext' mb={3}>Tu foto de portada es la primera impresión que tienen tus clientes de tu negocio.</Text>
        <Text fontSize='sm' color='subtext'>
          {/* Directrices importantes: Tamańo recomendado 930 x 620 píxeles; formato .jpg, .jpeg, o .png. */}
          Directrices importantes: Tamańo recomendado 780 x 520 píxeles; formato .jpg, .jpeg, o .png.
        </Text>
        <Button variant='primary-outline' isLoading={isUploading} p={0} mt={4}>
          <FormLabel w='100%' h='100%' htmlFor='file' m={0} p={2} px={4} >Cambiar foto</FormLabel>
        </Button>

        <input
          type="file"
          id="file" 
          name='file'
          accept={acceptedFileTypes} 
          multiple={false} 
          onChange={onChange}
          style={{ display: 'none' }}
        />
      </Box>
      <Flex w='40%' justify='center' alignItems='center'>
        <Image src={cover} w='300px' h='200px' objectFit="cover" loading='eager' />
      </Flex>
    </>
  );
}