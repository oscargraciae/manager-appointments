import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Button, Text, useDisclosure } from '@chakra-ui/react';
import { ServiceForm } from './ServiceForm';
import { IService } from '../../types/IService';

interface ModalNewServiceProps {
  isOpen: boolean
  onClose: any
  realodList: any
  service?: IService
}

export const ModalNewService: React.FC<ModalNewServiceProps> = ({ isOpen, onClose, realodList, service }) => {  
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo servicio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ServiceForm realodList={realodList} service={service} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}