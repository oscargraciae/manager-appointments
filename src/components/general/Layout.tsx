// Libraries
import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react';
import { UserService } from '../../services/userService';
import { User } from '../../types/User';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMe = async () => {
    setIsLoading(true);
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
    console.log('creando el componenten por primera vez');
    fetchMe();
  }, []);

  return (
    <Box>
      { (isLoading || !user) ? <h1>Cargando pagina</h1> :  <Box>
        <h1>Hola {user.email}</h1>
        {children}
      </Box> }
    </Box>
  );
}