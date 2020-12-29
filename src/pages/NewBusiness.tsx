import { Box, Heading, Progress } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../components/general/Loading';
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
  const history = useHistory();
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
    // if (step === 4) {
    //   history.push('/');
    //   return;
    // }
    setStep(step)
  }

  if (!user || isLoading || !business) {
    return <Loading />
  }

  const buildOnboarding = () => {
    switch (step) {
      case 1:
        return <Welcome business={business} user={user} />
      case 2:
        return <BoardingInformation setStep={handleSteps} />
      case 3:
        return <BoardingServices businessId={business.id} user={user} />
      case 4:
        return <BoardingSuccess />
      default:
        return <Heading>No se pudo cargar la pagina</Heading>
    }
  }

  return (
    <Box bg='#FFFFFF' height='100vh'>
      <Box mx='auto' w='800px' py={10}>
        <Box>
          <Progress value={25 * step} colorScheme='green' />
        </Box>
        <Box mt={10}>
          { (user && !isLoading) && buildOnboarding() }
        </Box>
        {/* <Flex direction='row' mt={6}>
          <Button variant='link' onClick={goBack}>
            Atras
          </Button>
          <Spacer />
          <Button size='lg' variant='primary'>
            Siguiente
          </Button>
        </Flex> */}
        
      </Box>
    </Box>
  );
}