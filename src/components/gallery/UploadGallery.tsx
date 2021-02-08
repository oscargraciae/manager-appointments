import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormLabel, Text, useToast, Image, Wrap, IconButton } from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri'

import { BusinessService } from '../../services/businessService';
import { LoadingView } from '../general/LoadingView';

interface UploadGalleryProps {}

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg';

export const UploadGallery: React.FC<UploadGalleryProps> = ({}) => {
  // hooks

  // state
  const [photos, setPhotos] = useState<object[]>([]);
  const [isUploading, setIsUplaoding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    const response = await new BusinessService().getPhotos();
    if (response.success) {
      const files = response.photos.map((item :any) => ({
        image: item.file,
        id: item.id,
      }))

      setPhotos(files);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetch();
  }, [])

  

  const onChangeGallery = async (e :any) => {
    setIsUplaoding(true);
    setIsLoading(true);
    const files : FileList = e.target.files;
    const newFiles = Array.from(files).map((item:any) => ({
      image: URL.createObjectURL(item),
      id: item.id,
    }))
    
    const newPhotos = [...photos, ...newFiles]
    setPhotos(newPhotos);

    
    for (let i = 0; i < files.length; i++) {
      const dataFiles = new FormData();
      dataFiles.append('file', files[i]);
      const response = await new BusinessService().uplaodGallery(dataFiles);
      console.log('Respuesta imagenes', response);
    }
    
    

    // if (response.success) {
    //   toast({
    //     title: "Datos actualizados.",
    //     status: "success",
    //     isClosable: true,
    //     position: 'top'
    //   });
    // }
    setIsUplaoding(false);
    setIsLoading(false);
  }

  const handleDeletePhoto = async (id :number, index :number) => {
    setIsLoading(true);
    if (id) {
      const response = await new BusinessService().deletePhoto(id);
      if (response.success) {
        setPhotos([
          ...photos.splice(0, index),
          ...photos.splice(index + 1),
        ]);
      }
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingView />
  }
  
  return (
    <>
      <Box w='60%'>
        <Text fontWeight='bold' mb={4}>Galeria</Text>
        <Text fontSize='sm' color='subtext' mb={3}>Añade las fotos de tu negocio y local para que los usuarios conozcan tus servicios.</Text>
        <Button variant='primary-outline' isLoading={isUploading} p={0} mt={4}>
          <FormLabel w='100%' h='100%' htmlFor='files' m={0} p={2} px={4} >Añadir imagenes +</FormLabel>
        </Button>
        <input
          type="file"
          id="files" 
          name='files'
          accept={acceptedFileTypes} 
          multiple
          onChange={onChangeGallery}
          style={{ display: 'none' }}
        />
      </Box>
      <Box w='90%'>
        <Wrap direction='row' flex={1} mt={4}>
          { photos.map((photo :any, index :number) => (
            <Box p={2} key={index} pos='relative' role='group'>
              <Flex pos='absolute' w='200px' alignItems='flex-end' justifyContent='flex-end' p={2} display='none' _groupHover={{ display: 'flex' }}>
                <IconButton size='sm' aria-label='Delete photo' icon={<RiDeleteBin6Line size={20} />} onClick={() => handleDeletePhoto(photo.id, index)} />
              </Flex>
              <Image w='200px' h='133px' objectFit="cover" src={photo.image} />
            </Box>
          )) }
        </Wrap>
      </Box>
    </>
  );
}