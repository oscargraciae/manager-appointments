import { Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react'
import { APP_NAME } from '../../config/constants';
import { IBusiness } from '../../types/Business';
import { User } from '../../types/User';

interface HeaderProps {
  user: User | null
  business: IBusiness
}

export const Header: React.FC<HeaderProps> = ({ user, business }) => {

  if (!user) {
    return (
      <Flex bg='surface' align='center' justify='center' shadow='md' borderBottomColor='#DDD' borderWidth={1} py={4}>
        <Text>{APP_NAME}</Text>
        <Spacer />
        <Text>Iniciar sesion</Text>
      </Flex>
    )
  }
  
  return (
    <Flex h='50px' bg='surface' align='center' justify='center' borderBottomColor='borders' borderBottomWidth={1} py={4} px={8}>
      <Text fontWeight='bold'>{business.name}</Text>
      <Spacer />
      <Text>Hola, {user.firstName}</Text>
    </Flex>
  );
}