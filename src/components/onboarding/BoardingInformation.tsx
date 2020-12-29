import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { BusinessService } from '../../services/businessService';
import { IBusiness } from '../../types/Business';
import { AddressForm } from '../business/AddressForm';
import { Loading } from '../general/Loading';

interface BoardingInformationProps {
  setStep: any
}

export const BoardingInformation: React.FC<BoardingInformationProps> = ({ setStep }) => {
  const [business, setBusiness] = useState<Required<IBusiness> | null>(null);
  const history = useHistory();
  
  const handleSaveAddress = () => {
    history.push('/new-business/3');
  }

  const getBusiness = async () => {
    const { success, business }  = await new BusinessService().get();
    if (success) {
      setBusiness(business);
    }
  }

  useEffect(() => {
    getBusiness();
  }, []);

  if (!business) {
    return <Loading />
  }

  return (
    <Box textAlign='center'>
      <Heading as='h2'>¿Cual es la dirección de tu negocio?</Heading>
      <Text fontSize='xl' fontWeight='500'>Ingresa la información lo más precisa posible para que tus clientes puedan llegar.</Text>
      { business && <AddressForm handleSaveAddress={handleSaveAddress} business={business} /> }
    </Box>
  );
}