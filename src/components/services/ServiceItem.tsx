import { Box, Button, Divider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react'
import { CgChevronDoubleDown } from 'react-icons/cg';
import { CgMoreVerticalAlt } from 'react-icons/cg';
import { IService } from '../../types/IService';

interface ServiceItemProps {
  service: IService
  handleEditService: any
  handleDeleteService: any
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service, handleEditService, handleDeleteService }) => {
  return (
    <Flex shadow='md' bg='surface' px={4} py={4} borderBottomWidth={1} borderBottomColor='borders' align='center'>
      <Box w='50%'>
        <Text size='xs' fontWeight='bold'>{service.name}</Text>
        <Text fontSize='xs' display={{ base: 'none', md: 'block' }}>{service.description}</Text>
      </Box>
      <Text size='sm' fontWeight='semibold' w='25%' textAlign='left'>{service.time} min.</Text>
      <Text size='sm' fontWeight='semibold' w='25%' textAlign='left'>${service.price}</Text>
      <Box>
        <Menu>
          <MenuButton as={IconButton} icon={<CgMoreVerticalAlt />}/>
          <MenuList>
            {/* <MenuItem>Pausar</MenuItem> */}
            <MenuItem onClick={() => handleEditService(service)} >Editar</MenuItem>
            <MenuItem onClick={() => handleDeleteService(service)}>Eliminar</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}