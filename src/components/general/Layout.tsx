/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { ImQrcode, ImCopy } from 'react-icons/im'

import QRCode from 'qrcode.react';

import { UserService } from '../../services/userService';
import { User } from '../../types/User';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Loading } from './Loading';
import { IBusiness } from '../../types/Business';
import { SocketProvider } from '../../context/socketContext';
import { generateName } from '../../utils/generateName';
import { Footer } from './Footer';

interface LayoutProps {}

export const UserContext = React.createContext<any>(null);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  // hooks
  const toast = useToast();

  // state
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();


  const fetchMe = async () => {
    const { success, user } = await new UserService().getMe();
    if (!success || !user) {
      alert('Usuario no encotrado');
      return ;
      // Aqui se debe de enviar al login, cerrar sesion o mostrar alguna pantalla de error
    };

    console.log('Datos de usuario', user);
    
    if (!user.businessUser || !user.businessUser.business?.isCompleted) {
      // alert('Este usuario no tiene tienda, favor de registrar una.')
      history.push('/new-business');
      return;
    }

    if (user.businessUser.business) {
      setBusiness(user.businessUser.business)
    }

    setUser(user);
    setIsLoading(false);
  }

  const copyUrl = (e :any) => {
    if (business && business.name) {
      const url : string = `${window.location.origin}/${generateName(business.name)}/${business.id}`;
      copy(url);
      toast({
        title: 'URL copiada',
        duration: 1000,
        position: 'top',
        status: 'success',
      })
    }
  }

  const downloadQR = () => {
    const canvas :any = document.getElementById("businessqr");
    if (canvas && business && business.name) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${generateName(business.name)}-qr`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  const logout = async () => {
    await new UserService().logout();
    history.push('/login');
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if(isLoading || !business || !business.name) {
    return <Loading />
  }

  // if (!user) {
  //   <Flex direction='column' justify='center' align='center' flex={1} w='100%' height='100vh'>
  //     <Text mt={4} fontWeight='bold' fontSize='2xl'>Usuario no disponible</Text>
  //   </Flex>
  // }

  
  return (
    <UserContext.Provider value={business}>
      <SocketProvider>
        <Box height='100vh' bg='background'>
          <Header user={user} business={business} logout={logout} />
          <Flex direction='row'>
            <Sidebar logout={logout} business={business} />
            <Box w='100%'>
              <Flex w='100%' bg='surface' px={6} py={2} alignItems='center'>
                <Text fontSize='sm' fontWeight='bold' mr={2}>Compartir</Text>
                <Text fontSize='sm' >{`${window.location.origin}/b/${generateName(business.name)}/${business.id}`}</Text>
                <Button size='xs' ml={3} leftIcon={<ImCopy />} onClick={copyUrl}>
                  Copiar URL
                </Button>
                <Button leftIcon={<ImQrcode />} size='xs' ml={3} onClick={downloadQR}>
                  Descargar QR
                </Button>
              </Flex>
              <Box>
                <QRCode value={`${window.location.origin}/${generateName(business.name)}/${business.id}`} id='businessqr' style={{ display: 'none' }} />
                {children}
              </Box>
            </Box>
          </Flex>
          <Footer />
        </Box>
      </SocketProvider>
    </UserContext.Provider>
  );
}