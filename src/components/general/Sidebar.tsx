import React from 'react'
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import {
  CgCalendar,
  CgHome,
  CgUserList,
  CgToolbox
} from 'react-icons/cg';
import { Link as Lnk } from 'react-router-dom';
import { APP_NAME } from '../../config/constants';

interface SidebarProps {
  logout: any
}

const MenuLink: React.FC<{ title: string, icon: any, href: string }> = ({title, icon, href}) => (
  <Flex direction='row'>  
    <Link w='100%' _hover={{ bg: 'primary', color: '#FFFFFF' }} fontWeight='bold'>
      <Lnk to={href} style={{ background: 'red' }}>
        <Flex direction='row' align='center' p={3} >
          {icon()} <Text fontSize='sm' ml={3}>{title}</Text>
        </Flex>
      </Lnk>
    </Link>
  </Flex>
)

export const Sidebar: React.FC<SidebarProps> = ({ logout }) => {
  return (
    <Box w='270px' h='100vh' bg='surface' shadow='sm' borderRightWidth={1} borderRightColor='borders'>
      <Box padding={5} textAlign='center' borderBottomWidth={1} borderBottomColor='borders'>
        <Text fontWeight='bold'>{APP_NAME}</Text>
      </Box>

      <Box mt={3}>
        <MenuLink title='Inicio' icon={CgHome} href='/' />
        <MenuLink title='Calendario' icon={CgCalendar} href='/calendar' />
        <MenuLink title='Reservaciones' icon={CgCalendar} href='/bookings' />
        <MenuLink title='Clientes' icon={CgUserList} href='/customers' />
        <MenuLink title='Configuración' icon={CgToolbox} href='/settings' />
        <Link onClick={(logout)}>
          Salir
        </Link>
      </Box>
    </Box>
  );
}