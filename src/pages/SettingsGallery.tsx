import React, { HtmlHTMLAttributes, useEffect, useState } from 'react'
import { Text, Heading, Box, Flex, Image, Divider, Button, VStack, FormLabel, useToast } from '@chakra-ui/react';


import { ContainerPage } from '../components/general/ContainerPage';
import { WrapperSettings } from '../components/general/WrapperSettings';
import { BusinessService } from '../services/businessService';
import { LoadingView } from '../components/general/LoadingView';
import { UploadCover } from '../components/gallery/UploadCover';
import { UploadGallery } from '../components/gallery/UploadGallery';

interface SettingsGalleryProps {}

export const SettingsGallery: React.FC<SettingsGalleryProps> = () => {
  
  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Heading as='h2' size='md' mb={2}>Fotos</Heading>

        <Flex flexDirection={{ base: 'column', md: 'row' }} w='90%' justify='space-between' mt={4}>
          <UploadCover />
        </Flex>

        <Divider my={6} />

        <Flex w='100%' justify='space-between' direction='column'>
          <UploadGallery />
        </Flex>
      </WrapperSettings>
    </ContainerPage>
  );
}