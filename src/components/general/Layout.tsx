// Libraries
import React, { useEffect, useState } from 'react'
import { Box, Flex, Spacer, Spinner, Text } from '@chakra-ui/react';
import { UserService } from '../../services/userService';
import { User } from '../../types/User';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = async () => {
    const { success, user } = await new UserService().getMe();
    if (!success || !user) {
      alert('Usuario no encotrado');
      return ;
      // Aqui se debe de enviar al login, cerrar sesion o mostrar alguna pantalla de error
    };

    setUser(user);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if(isLoading) {
    return (
      <Flex direction='column' justify='center' align='center' flex={1} w='100%' height='100vh'>
        <Spinner size='xl' color='primary' />
        <Text mt={4} fontWeight='bold' fontSize='2xl'>Cargando Boombook</Text>
      </Flex>
    )
  }

  // if (!user) {
  //   <Flex direction='column' justify='center' align='center' flex={1} w='100%' height='100vh'>
  //     <Text mt={4} fontWeight='bold' fontSize='2xl'>Usuario no disponible</Text>
  //   </Flex>
  // }

  return (
    <Box height='100vh' bg='background'>
      
  
      <Flex direction='row'>
        <Sidebar />
        <Box w='100%'>
          <Header user={user} />
          <Box>
            {children}
          </Box>
        </Box>
      </Flex>
      
    </Box>
  );
}