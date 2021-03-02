import React from 'react'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Image, Link, Text, useDisclosure } from '@chakra-ui/react';
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
  isOpen: boolean
  onClose: any
  logout: any
  // logout: any
  // business: IBusiness
}

const MenuLink: React.FC<{ title: string, icon: any, href: string }> = ({title, icon, href}) => (
  <Flex direction='row' py={2}>  
    <Link as={Lnk} to={href} w='100%' _hover={{ bg: 'primary', color: '#FFFFFF' }} fontWeight='bold'>
      <Flex direction='row' align='center' p={3} >
        {icon()} <Text fontSize='sm' ml={5}>{title}</Text>
      </Flex>
    </Link>
  </Flex>
)

export const DrawerSidebar: React.FC<SidebarProps> = ({ isOpen, onClose, logout }) => {
  const btnRef = React.useRef<any>()
  return (
    <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            {/* <DrawerHeader>Create your account</DrawerHeader> */}

            <DrawerBody>
              <Box mt={3}>
                <MenuLink title='Calendario' icon={CgCalendarDates} href='/' />
                {/* <MenuLink title='Calendario' icon={CgCalendar} href='/calendar' /> */}
                <MenuLink title='Reservaciones' icon={CgCalendar} href='/bookings' />
                <MenuLink title='Servicios' icon={CgList} href='/services' />
                {/* <MenuLink title='Clientes' icon={CgUserList} href='/customers' /> */}
                {/* <MenuLink title='Clientes' icon={CgUserList} href='/customers' /> */}
                <MenuLink title='Configuración' icon={CgToolbox} href='/settings' />
                <Flex direction='row' py={2}>  
                  <Button onClick={logout} w='100%' _hover={{ bg: 'primary', color: '#FFFFFF' }} fontWeight='bold'>
                    <Flex direction='row' align='center' p={3} >
                      <Text fontSize='sm' ml={5}>Cerrar sesión</Text>
                    </Flex>
                  </Button>
                </Flex>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
  );
}