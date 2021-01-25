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
import { IBusiness } from '../../types/Business';
import { SocketProvider } from '../../context/socketContext';

interface LayoutProps {}

export const UserContext = React.createContext<any>(null);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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

    if (!user.businessUser) {
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

  const logout = async () => {
    await new UserService().logout();
    history.push('/login');
  }

  useEffect(() => {
    fetchMe();
  }, []);

  if(isLoading || !business) {
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
              <Box>
                {children}
              </Box>
            </Box>
          </Flex>
        </Box>
      </SocketProvider>
    </UserContext.Provider>
  );
}