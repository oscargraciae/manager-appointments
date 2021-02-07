import { AlertDialog, Box, Button, Flex, Heading, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { ContainerPage } from '../components/general/ContainerPage';
import { UserContext } from '../components/general/Layout';
import { LoadingView } from '../components/general/LoadingView';
import { WrapperSettings } from '../components/general/WrapperSettings';
import { DeleteServiceDialog } from '../components/services/DeleteServiceDialog';
import { ModalNewService } from '../components/services/ModalNewService';
import { ServiceList } from '../components/services/ServiceList';
import { BusinessService } from '../services/businessService';
import { IService } from '../types/IService';

interface ServicesProps {
  
}

export const Services: React.FC<ServicesProps> = ({ }) => {
  // Hooks
  const { onOpen, isOpen, onClose } = useDisclosure()
  const businessContext = useContext(UserContext);

  // States
  const [services, setServices] = useState<IService[]>([])
  const [service, setService] = useState<IService>()
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const fetchServices = async  () => {
    const { success, services } = await new BusinessService().getServices(businessContext.id);
    if (success && services) {
      setServices(services);
    }
    setIsLoading(false);
  }

  useEffect(() => {  
    fetchServices();
  }, []);

  const realodList = () => {
    fetchServices();
    onClose();
  }

  const handleCreateService = () => {
    setService(undefined)
    onOpen();
  }

  const handleEditService = (service: IService) => {
    setService(service);
    onOpen()
    
  }

  const handleDeleteService = (service: IService) => {
    setService(service);
    setIsDeleteModal(true);
  }

  // Metodos para elimianar, pausar y editar

  if(isLoading) {
    return <LoadingView />
  }

  return (
    <>
      <ModalNewService isOpen={isOpen} onClose={onClose} realodList={realodList} service={service} />
      { service &&  <DeleteServiceDialog isOpen={isDeleteModal} realodList={realodList} service={service} onClose={() => setIsDeleteModal(!isDeleteModal)} /> }
      <ContainerPage title='Servicios'>
        <Flex direction='row' align='center'>
          <Box>
            <Text fontSize='md' fontWeight='500' mb={8} pr={20}>Añade tantos servicios necesites para que tus clientes sepan todo lo que ofreces.</Text>
          </Box>
          <Spacer />
          <Box>
            <Button variant='primary' onClick={handleCreateService}>Nuevo servicio</Button>
          </Box>
        </Flex>
        <Box>
          <ServiceList
            services={services}
            handleEditService={handleEditService}
            handleDeleteService={handleDeleteService}
            />
        </Box>
      </ContainerPage>
    </>
  );
}