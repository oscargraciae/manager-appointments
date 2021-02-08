import { useEffect, useRef } from "react";

export const useGoogleMaps = ({ coords, setCoords } : any) : any => {
  const refContainer = useRef<any>();
  const refMap = useRef<google.maps.Map>();
  const refMarker = useRef<google.maps.Marker>();
  
  useEffect(() => {
    const uluru = { lat: coords.lat, lng: coords.lng };
    const map = new google.maps.Map(refContainer.current, {
      center: uluru,
      zoom: 17,
      scrollwheel: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControl: true,
      disableDoubleClickZoom: true,
      zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT }
    });

      refMap.current = map;

      map.addListener('dragend', () => {
        const { lat, lng } = map.getCenter();
        console.log('DRAGGEG', lat, lng);
        
        setCoords({ lat: lat(), lng: lng() });
      });

  }, []);

  const addMarker = ({ lat, lng } : any) => {
    if (refMap.current) {
      const mark = new google.maps.Marker({ position: { lat, lng }, map: refMap.current, draggable: true })
      refMarker.current = mark;
      if (mark) {
        mark.addListener('dragend', (e: any) => {
          setCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        });
      }
    } 
  }

  const changeLocation = (coords :any) => {
    if (refMap.current) {
      refMap.current.setCenter(coords);
    }
  }

  return {
    refContainer,
    addMarker,
    changeLocation,
  }
}