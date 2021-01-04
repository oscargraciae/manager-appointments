import React, { useContext } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, Button, Text, useToast } from '@chakra-ui/react';

import { IService } from '../../types/IService';
import { BusinessService } from '../../services/businessService';
import { UserContext } from '../general/Layout';

interface DeleteServiceDialogProps {
  service: IService
  isOpen: boolean
  onClose: any
  realodList: any
}

export const DeleteServiceDialog: React.FC<DeleteServiceDialogProps> = ({ isOpen, onClose, service, realodList }) => {
  const businessContext = useContext(UserContext);
  const toast = useToast();

  const deleteService = async () => {
    if(service?.id) {
      const { success } = await new BusinessService().deleteService(service.id, businessContext.id);
      if (success) {
        realodList()
        toast({
          title: "Datos actualizados.",
          status: "success",
          isClosable: true,
          position: 'top'
        });
      }
      onClose();
    }
    
  }

  const cancelRef = React.useRef<any>();
  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar servicio
            </AlertDialogHeader>

            <AlertDialogBody>
            <Text mb={2} fontWeight='bold' fontSize='sm'>¿Estas seguro que quieres eliminar este servicio?</Text>
            <Text fontSize='sm'>No es posible deshacer la operación.</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteService} ml={3}>
               Si, eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  );
}