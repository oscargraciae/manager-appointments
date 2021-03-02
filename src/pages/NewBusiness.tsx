import { Box, Heading, Progress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Header } from '../components/general/Header';
import { Loading } from '../components/general/Loading';
import { BoardingCover } from '../components/onboarding/BoardingCover';
import { BoardingHours } from '../components/onboarding/BoardingHours';
import { BoardingInformation } from '../components/onboarding/BoardingInformation';
import { BoardingServices } from '../components/onboarding/BoardingServices';
import { BoardingSuccess } from '../components/onboarding/BoardingSuccess';
import { Welcome } from '../components/onboarding/Welcome';
import { BusinessService } from '../services/businessService';

import { UserService } from '../services/userService';
import { IBusiness } from '../types/Business';
import { User } from '../types/User';

interface NewBusinessParams {
  step?: string | undefined
}

export const NewBusiness: React.FC = () => {
  const params = useParams<NewBusinessParams>();
  const option = params.step !== undefined ? Number(params.step) : 1;

  const [step, setStep] = useState<number>(option || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Required<IBusiness> | null>(null);
  

  useEffect(() => {
    const option = params.step !== undefined ? Number(params.step) : 1;
    setStep(option)
  }, [option, params.step]);

  useEffect(() => {
    const getMe = async () => {
      const { success, user } = await new UserService().getMe();
      if (!user || !success) {
        return;
      }
      setUser(user);
    };
  
    const getBusiness = async () => {
      const { success, business }  = await new BusinessService().get();
      if (success) {
        setBusiness(business);
      }
    }
    getMe();
    getBusiness();
    setIsLoading(false);
    
  }, []);

  const handleSteps = (step: number) => {
    setStep(step)
  }

  const logout = async () => {
    await new UserService().logout();
    window.location.href = '/';
  }

  if (!user || isLoading) {
    return <Loading />
  }

  const buildOnboarding = () => {
    switch (step) {
      case 1:
        return <Welcome business={business} user={user} />
      case 2:
        return <BoardingInformation setStep={handleSteps} />
      case 3:
        return <BoardingServices />
      case 4:
        return <BoardingHours />
      case 5:
        return <BoardingCover />
      case 6:
        return <BoardingSuccess />
      default:
        return <Heading>No se pudo cargar la pagina</Heading>
    }
  }

  return (
    <Box bg='#FFFFFF' height='100vh'>
      { business && <Header user={user} business={business} logout={logout} /> }
      
      <Box mx='auto' w={{ base: '100%', md: '800px' }} py={4}>
        <Box>
          <Progress value={16.66 * step} colorScheme='green' />
        </Box>
        <Box mt={6} px={{ base: 4, md: 0 }}>
          { (user && !isLoading) && buildOnboarding() }
        </Box>
      </Box>
    </Box>
  );
}