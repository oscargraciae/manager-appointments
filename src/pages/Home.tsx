import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { Layout } from '../components/general/Layout';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Layout>
      <Text>Home</Text>
    </Layout>
  );
}