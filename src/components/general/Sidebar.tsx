import React from 'react'
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import {
  CgCalendar,
  CgHome,
  CgUserList,
  CgToolbox,
  CgList,
  CgCalendarDates,
} from 'react-icons/cg';
import { Link as Lnk } from 'react-router-dom';

import ReserlyLogo from './../../assets/Reserly.png';
import { IBusiness } from '../../types/Business';

interface SidebarProps {
  logout: any
  business: IBusiness
}

const MenuLink: React.FC<{ title: string, icon: any, href: string }> = ({title, icon, href}) => (
  <Flex direction='row'>  
    <Link as={Lnk} to={href} w='100%' _hover={{ bg: 'primary', color: '#FFFFFF' }} fontWeight='bold'>
      <Flex direction='row' align='center' p={3} >
        {icon()} <Text fontSize='sm' ml={5}>{title}</Text>
      </Flex>
    </Link>
  </Flex>
)

export const Sidebar: React.FC<SidebarProps> = ({ logout }) => {
  return (
    <Box w='210px' h='100vh' bg='surface' shadow='sm' borderRightWidth={1} borderRightColor='borders' pos='sticky' top='0' left='0' display={{ base: 'none', md: 'block' }} >
      <Box mt={3}>
        <MenuLink title='Calendario' icon={CgCalendarDates} href='/' />
        {/* <MenuLink title='Calendario' icon={CgCalendar} href='/calendar' /> */}
        <MenuLink title='Reservaciones' icon={CgCalendar} href='/bookings' />
        <MenuLink title='Servicios' icon={CgList} href='/services' />
        <MenuLink title='Clientes' icon={CgUserList} href='/customers' />
        {/* <MenuLink title='Clientes' icon={CgUserList} href='/customers' /> */}
        <MenuLink title='Configuración' icon={CgToolbox} href='/settings' />
      </Box>
    </Box>
  );
}