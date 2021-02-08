import { Box, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { ContainerPage } from '../components/general/ContainerPage';
import { UserContext } from '../components/general/Layout';
import { LoadingView } from '../components/general/LoadingView';
import { IService } from '../types/IService';
import { CustomerService } from '../services/customerService';
import { ICustomer } from '../types/ICustomer';
import { CustomerList } from '../components/customers/CustomerList';

interface CustomersProps {
  
}

export const Customers: React.FC<CustomersProps> = ({ }) => {
  // Hooks

  // States
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [isLoading, setIsLoading] = useState(true);
  
  const fetch = async  () => {
    const { success, customers } = await new CustomerService().getAll();
    console.log('Clientes', customers);
    
    if (success && customers) {
      setCustomers(customers);
    }

    setIsLoading(false);
  }

  useEffect(() => {  
    fetch();
  }, []);


  // Metodos para elimianar, pausar y editar

  if(isLoading) {
    return <LoadingView />
  }

  return (
    <>
      <ContainerPage title={`Clientes (${customers.length})`}>
        <Flex direction='row' align='center'>
          {/* <Box>
            <Text fontSize='md' fontWeight='500' mb={8} pr={20}>Añade tantos servicios necesites para que tus clientes sepan todo lo que ofreces.</Text>
          </Box> */}
          <Spacer />
        </Flex>
        <Box bg='surface' borderBottomWidth={1} borderColor='borders' py={3}>
          <CustomerList customers={customers} />
        </Box>
      </ContainerPage>
    </>
  );
}