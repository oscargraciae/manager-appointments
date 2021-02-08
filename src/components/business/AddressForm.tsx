import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex, Input, VStack, Text, Progress, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

import { BusinessAddressService } from '../../services/businessAddressService';
import { TOKEN_MAPBOX } from '../../config/constants';
import { IBusiness } from '../../types/Business';
import { BusinessAddress, BusinessAddressResponse } from '../../types/BusinessAddress';
import { useGoogleMaps } from '../../hooks/useMap';

interface AddressFormProps {
  handleSaveAddress: any
  business: Required<IBusiness>
}

export const AddressForm: React.FC<AddressFormProps> = ({ handleSaveAddress, business }) => {
  
  const [address, setAddresss] = useState<BusinessAddress | null>(null);
  
  const [geoAddress, setGeoAddress] = useState<string>('');
  const [coords, setCoords] = useState({ lat: 25.6866142, lng: -100.3161126 });
  
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const { refContainer, addMarker, changeLocation } = useGoogleMaps({ coords, setCoords });
  
  const fetchAddress = async () => {
    const { success, address } = await new BusinessAddressService().get(business.id);
    if (success && address) {
      setAddresss(address);
      setGeoAddress(address.addressMap);
      setCoords({ lat: address.lat, lng: address.lng });
      changeLocation({ lat: address.lat, lng: address.lng });
      addMarker({ lat: address.lat, lng: address.lng });
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  const onSubmit = async () => {
    let response : BusinessAddressResponse;
    if (business.id) {
      if (address?.id) {
        response = await new BusinessAddressService().update({ lat: coords.lat, lng: coords.lng, addressMap: geoAddress, state, city }, business.id, address.id);
      } else {
        response = await new BusinessAddressService().create({ lat: coords.lat, lng: coords.lng, addressMap: geoAddress, state, city }, business.id);
      }
      if (response.success && response.address) {
        setAddresss(response.address);
      }
      
      if (handleSaveAddress) {
        handleSaveAddress();
      }
    }
  }

  const handleSelect = async (address: string) => {
    setGeoAddress(address);
    const results = await geocodeByAddress(address)
    fillInAddress(results[0]);
    
    const latLng = await getLatLng(results[0]);
    setCoords(latLng);
    changeLocation(latLng);
    addMarker(latLng);
  }

  const fillInAddress = (place: google.maps.GeocoderResult) => {
    const addressComponent : google.maps.GeocoderAddressComponent[] = place.address_components;
    for (var i = 0; i < addressComponent.length; i++) {
      if (addressComponent[i].types[0] === 'locality') {
        const locality : any = addressComponent[i];
        console.log('locality', locality.long_name);
        setCity(locality.long_name);
      }
      if (addressComponent[i].types[0] === 'administrative_area_level_1') {
        const administrativeArea : any = addressComponent[i];
        console.log('administrative_area_level_1', administrativeArea.long_name);
        setState(administrativeArea.long_name);
      }
    }
  }


  const initialValues = {
    street: '',
    area: '',
    city: '',
    state: ''
  }
  
  return (
    <Box>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        { (({ isSubmitting }) => (
          <Form>
            <Flex aling='center' justify='center' py={10}>
              <VStack w='100%' align='flex-start'>
                <Text fontWeight='bold'>Ingresa la dirección completa de tu negocio</Text>
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
              {/* <Text fontWeight='bold' fontSize='xs' mt={2}>Mueve el marcador si es necesario pero asegurate que este en el lugar correcto.</Text> */}
              <Text fontWeight='bold' fontSize='xs' mt={2}>Si es necesario, ajusta el mapa para que el pin aparezca en la ubicación correcta.</Text>
              
            </Box>

            <Flex mt={4} align='flex-end' justifyContent='flex-end'>
              <Button disabled={!geoAddress} isLoading={isSubmitting} size='lg' variant='primary' type='submit'>Siguiente</Button>
            </Flex>
          </Form>
        )) }
      </Formik>
      
      {/* <Box w='100%' h='200px' id='map'></Box> */}
    </Box>
  );
}