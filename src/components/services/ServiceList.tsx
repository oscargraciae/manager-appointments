import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { IService } from '../../types/IService';
import { ServiceItem } from './ServiceItem';

interface ServiceListProps {
  services: IService[]
  handleEditService: any
  handleDeleteService: any
}

export const ServiceList: React.FC<ServiceListProps> = ({ services, handleEditService, handleDeleteService }) => {
  return (
    <Box shadow='sm'>
      { services.map((item) => (
        <ServiceItem
          service={item}
          handleEditService={handleEditService}
          handleDeleteService={handleDeleteService}
          key={item.id}
        />
      )) }
    </Box>
  );
}