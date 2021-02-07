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

interface SettingsLocationProps {

}

export const SettingsLocation: React.FC<SettingsLocationProps> = () => {
  // Contexto
  const businessContext = useContext(UserContext);
  
  // Hooks
  const toast = useToast();
  const mapContainer = useRef<any>(null);

  // States
  const [address, setAddress] = useState<BusinessAddress | null>(null);
  const [geoAddress, setGeoAddress] = useState<string>('');
  const [latLng, setLatLng] = useState({ lng: -74.5, lat: 40 });
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [mrk, setMrk] = useState<mapboxgl.Marker | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  
  const fetchAddress = async (map: Map) => {
    const { success, address } = await new BusinessAddressService().get(businessContext.id);
    if (success && address) {
      setAddress(address);
      setGeoAddress(address.addressMap);
      setLatLng({ lat: address.lat, lng: address.lng });
      
      if (map) {
        map.jumpTo({ center: [address.lng, address.lat], zoom: 16 });
        const marker : Marker = new mapboxgl.Marker({ draggable: true }).setLngLat([address.lng, address.lat]).addTo(map);
        marker.on('dragend', () => onDragEnd(marker));
        // const marker : Marker = new mapboxgl.Marker({ draggable: true }).setLngLat([latLng.lng, latLng.lat]).addTo(map);
        setMrk(marker);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    mapboxgl.accessToken = TOKEN_MAPBOX;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-100.3161126, 25.6866142], // starting position [lng, lat]
      zoom: 16 // starting zoom
    });
    setMap(map);

    
    map.on('load', function() {
      fetchAddress(map);
    });

  }, [])

  const onSubmit = async () => {
    let response : BusinessAddressResponse;
    if (businessContext.id && address?.id) {
      response = await new BusinessAddressService().update({ lat: latLng.lat, lng: latLng.lng, addressMap: geoAddress }, businessContext.id, address.id);
      if (response.success) {
        // setAddress(response.address);
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
    setLatLng(latLng);
    if (map) {
      
      // map.jumpTo({ 'center': [latLng.lng, latLng.lat], 'zoom': 14 });
      map.jumpTo({ center: [latLng.lng, latLng.lat], zoom: 16 });
      if (mrk) {
        mrk.setLngLat([latLng.lng, latLng.lat]);
      }
      // console.log('viejo marcado');
      
      // marker.on('dragend', () => onDragEnd(marker));
    }
  }

  const onDragEnd = (marker: Marker) => {
    var lngLat = marker.getLngLat();
    setLatLng(lngLat);
  }

  // if (isLoading) {
  //   return <LoadingView />
  // }

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
                <Box w='100%' h='300px' ref={el => (mapContainer.current = el)}></Box>
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