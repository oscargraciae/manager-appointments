import { Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react'
import { User } from '../../types/User';

interface HeaderProps {
  user: User | null
}

export const Header: React.FC<HeaderProps> = ({ user }) => {

  if (!user) {
    return (
      <Flex bg='surface' align='center' justify='center' shadow='md' borderBottomColor='#DDD' borderWidth={1} p={4}>
        <Text>Boombook</Text>
        <Spacer />
        <Text>Iniciar sesion</Text>
      </Flex>
    )
  }
  
  return (
    <Flex h='65px' bg='surface' align='center' justify='center' borderBottomColor='borders' borderBottomWidth={1} p={4}>
      <Text>Barberia Oscar's</Text>
      <Spacer />
      <Text>Hola, {user.firstName}</Text>
    </Flex>
  );
}