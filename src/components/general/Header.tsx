import { Flex, MenuButton, Spacer, Text, Menu, MenuList, MenuItem, Link, Button, IconButton } from '@chakra-ui/react';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { ImMenu } from 'react-icons/im';

import { APP_NAME } from '../../config/constants';
import { IBusiness } from '../../types/Business';
import { User } from '../../types/User';

import logo from '../../assets/logo-reserly-2.png';

interface HeaderProps {
  user: User | null
  business: IBusiness
  logout: any
  onOpen?: any
}


export const Header: React.FC<HeaderProps> = ({ user, business, logout, onOpen }) => {

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
    <>
      <Flex h='66px' bg='surface' align='center' justify='center' borderBottomColor='borders' borderBottomWidth={1} py={4} px={8} display={{ base: 'none', md: 'flex' }}>
        <Flex align='center' w='190px'>
          <Link href="/">
            <img src={logo} alt="uorder" width="120" height="40" />
          </Link>
        </Flex>
        <Text fontWeight='semibold' color='subtext'>{business.name}</Text>
        <Text fontWeight='bold' fontSize='xs' ml={4} color={business.isPublic ? 'primary' : 'yellow.300'}>
          { business.isPublic ? 'Publicado' : 'No publicado' }
          
        </Text>
        <Spacer />
        <Menu>
          <MenuButton as={Link} mx={3} variant='primary'>
            Mi Cuenta
          </MenuButton>
          <MenuList zIndex={3} borderColor="#DDD">
            <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex h='66px' bg='surface' align='center' justify='center' borderBottomColor='borders' borderBottomWidth={1} py={4} px={{ base: 4, md: 8 }} display={{ base: 'flex', md: 'none' }}>
        <IconButton onClick={onOpen} aria-label='Menu' icon={<ImMenu />} />
        {/* <Spacer /> */}
        <Flex align='center' w='90%' justifyContent='center' pr='20px'>
          <Link href="/">
            <img src={logo} alt="uorder" width="120" height="40" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
}