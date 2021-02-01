import { Flex, MenuButton, Spacer, Text, Menu, MenuList, MenuItem, Link } from '@chakra-ui/react';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { APP_NAME } from '../../config/constants';
import { IBusiness } from '../../types/Business';
import { User } from '../../types/User';

import logo from '../../assets/logo-reserly-2.png';

interface HeaderProps {
  user: User | null
  business: IBusiness
  logout: any
}

export const Header: React.FC<HeaderProps> = ({ user, business, logout }) => {

  if (!user) {
    return (
      <Flex bg='surface' align='center' justify='center' shadow='md' borderBottomColor='#DDD' borderWidth={1} py={4}>
        <Text>{APP_NAME}</Text>
        <Spacer />
        <Text>Iniciar sesion</Text>
      </Flex>
    )
  }
  
  return (
    <Flex h='50px' bg='surface' align='center' justify='center' borderBottomColor='borders' borderBottomWidth={1} py={4} px={8}>
      <Flex align='center' w='190px'>
        <Link href="/">
          <img src={logo} alt="uorder" width="120" height="40" />
        </Link>
      </Flex>
      <Text fontWeight='bold'>{business.name}</Text>
      <Text fontWeight='bold' fontSize='xs' ml={4} color='primary'>Publicado</Text>
      <Spacer />
      <Menu>
        <Link href='/' size="sm" variant="primary" mx={3}>Modo cliente</Link>
        <MenuButton as={Link} mx={3} variant='primary'>
          Cuenta
        </MenuButton>
        <MenuList zIndex={3} borderColor="#DDD">
          <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}