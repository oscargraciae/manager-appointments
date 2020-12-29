/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { UserService } from '../../services/userService';
import { User } from '../../types/User';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Loading } from './Loading';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const fetchMe = async () => {
    const { success, user } = await new UserService().getMe();
    if (!success || !user) {
      alert('Usuario no encotrado');
      return ;
      // Aqui se debe de enviar al login, cerrar sesion o mostrar alguna pantalla de error
    };

    if (!user.businessUser) {
      // alert('Este usuario no tiene tienda, favor de registrar una.')
      history.push('/new-business');
    }

    setUser(user);
    setIsLoading(false);
  }

  const logout = async () => {
    await new UserService().logout();
    history.push('/login');
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if(isLoading) {
    return <Loading />
  }

  // if (!user) {
  //   <Flex direction='column' justify='center' align='center' flex={1} w='100%' height='100vh'>
  //     <Text mt={4} fontWeight='bold' fontSize='2xl'>Usuario no disponible</Text>
  //   </Flex>
  // }

  return (
    <Box height='100vh' bg='background'>
      
  
      <Flex direction='row'>
        <Sidebar logout={logout} />
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