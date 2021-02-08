import React, { useContext, useRef, useState, useEffect } from 'react'
import { Box, Flex, Input, VStack, Text, Progress, Button, useToast, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { ContainerPage } from '../components/general/ContainerPage';
import { UserContext } from '../components/general/Layout';
import { WrapperSettings } from '../components/general/WrapperSettings';
import { BusinessAddressService } from '../services/businessAddressService';
import { BusinessAddress, BusinessAddressResponse } from '../types/BusinessAddress';
import { TOKEN_MAPBOX } from '../config/constants';
import { LoadingView } from '../components/general/LoadingView';
import { useGoogleMaps } from '../hooks/useMap';

interface SettingsLocationProps {

}

export const SettingsLocation: React.FC<SettingsLocationProps> = () => {
  // Contexto
  const businessContext = useContext(UserContext);
  
  // Hooks
  const toast = useToast();
  

  // States
  const [address, setAddress] = useState<BusinessAddress | null>(null);
  const [geoAddress, setGeoAddress] = useState<string>('');
  const [coords, setCoords] = useState({ lat: 25.6866142, lng: -100.3161126 });

  const [isLoading, setIsLoading] = useState(true);
  
  const { refContainer, addMarker, changeLocation } = useGoogleMaps({ coords, setCoords });
  
  const fetchAddress = async () => {
    const { success, address } = await new BusinessAddressService().get(businessContext.id);
    if (success && address) {
      setAddress(address);
      setGeoAddress(address.addressMap);
      setCoords({ lat: address.lat, lng: address.lng });
      changeLocation({ lat: address.lat, lng: address.lng });
      addMarker({ lat: address.lat, lng: address.lng });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAddress();
  }, [])


  const onSubmit = async () => {
    let response : BusinessAddressResponse;
    if (businessContext.id && address?.id) {
      response = await new BusinessAddressService().update({ lat: coords.lat, lng: coords.lng, addressMap: geoAddress }, businessContext.id, address.id);
      if (response.success) {
        toast({
          title: "Datos actualizados.",
          status: "success",
          isClosable: true,
          position: 'top'
        });
      }
    }
  }

  const handleSelect = async (address: string) => {
    setGeoAddress(address);
    const results = await geocodeByAddress(address)
    const latLng = await getLatLng(results[0]);
    
    setCoords(latLng);
    changeLocation(latLng);
    addMarker(latLng);
  }

  const initialValues = {
    street: '',
    area: '',
    city: '',
    state: ''
  }

  return (
    <ContainerPage title='Configuración'>
      <WrapperSettings>
        <Heading as='h2' size='md' mb={2}>Ubicación</Heading>
        <Text fontSize='md' fontWeight='500' mb={8} pr={20}>Ingresa correctamente esta información, es la que visualizarán las personas para poder llegar a tu negocio</Text>
        <Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
          { (({ isSubmitting }) => (
            <Form>
              <Flex aling='center' justify='center' mb={2}>
                <VStack w='100%' align='flex-start'>
                  <PlacesAutocomplete
                    value={geoAddress}
                    onChange={(geoaddress) => setGeoAddress(geoaddress)}
                    onSelect={handleSelect}
                    searchOptions={{ componentRestrictions: { country: ['mx'] } }}
                  >
                    { (({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <Box w='100%'>
                          <Input {...getInputProps()} placeholder='Dirección ' size='lg' />
                          <Box shadow='md' background='#FFFFFF'>
                            { loading && <Progress size="xs" isIndeterminate colorScheme='green' /> }
                            {suggestions.map(suggestion => {
                              return (
                                <Box {...getSuggestionItemProps(suggestion, { key: suggestion.id })} textAlign='left' p={2}>
                                  <Text fontWeight='bold'>{suggestion.description}</Text>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                    )) }
                  </PlacesAutocomplete>
                </VStack>
              </Flex>
              <Box>
                <Box ref={refContainer} h='200px' w='100%' />
                <Text fontWeight='bold' fontSize='xs' mt={2}>Si es necesario, ajusta el mapa para que el pin aparezca en la ubicación correcta.</Text>
                
              </Box>

              <Flex mt={4} align='flex-start' justifyContent='flex-start'>
                <Button disabled={!geoAddress} isLoading={isSubmitting} size='lg' variant='primary' type='submit'>Guardar</Button>
              </Flex>
            </Form>
          )) }
        </Formik>
        </Box>
      </WrapperSettings>
    </ContainerPage>
  );
}