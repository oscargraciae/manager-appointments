import React from 'react'
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import {
  CgCalendar,
  CgHome,
  CgUserList,
  CgToolbox
} from 'react-icons/cg';

interface SidebarProps {}

const MenuLink: React.FC<{ title: string, icon: any }> = ({title, icon}) => (
  <Flex direction='row'>
    <Link w='100%' p={3} _hover={{ bg: 'primary', color: '#FFFFFF' }} fontWeight='bold'>
      <Flex direction='row' align='center'>
        {icon()} <Text fontSize='sm' ml={3}>{title}</Text>
      </Flex>
    </Link>
  </Flex>
)

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Box w='270px' h='100vh' bg='surface' shadow='sm' borderRightWidth={1} borderRightColor='borders'>
      <Box padding={5} textAlign='center' borderBottomWidth={1} borderBottomColor='borders'>
        <Text fontWeight='bold'>Boombook</Text>
      </Box>

      <Box mt={3}>
        <MenuLink title='Inicio' icon={CgHome} />
        <MenuLink title='Calendario' icon={CgCalendar} />
        <MenuLink title='Reservaciones' icon={CgCalendar} />
        <MenuLink title='Clientes' icon={CgUserList} />
        <MenuLink title='Configuración' icon={CgToolbox} />
      </Box>
    </Box>
  );
}