import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_DOMAIN, URL_API } from '../config/constants';


export const useSocket = () => {
    
    const socket : Socket = io(API_DOMAIN, { transports: ['websocket'] });
    const [ online, setOnline ] = useState(false);
    
    // socket.on('saludo', (data :any) => {
    //   console.log('Datos de saludo', data);
    // })

    // useEffect(() => {
    //     setOnline( socket.connected );
    // }, [socket])

    // useEffect(() => {
    //     socket.on('connect', () => {
    //       console.log('Socket conectado');
          
    //     });
    // }, [ socket ])

    // useEffect(() => {
    //     socket.on('disconnect', () => setOnline( false ));
    // }, [ socket ])

    return {
        socket,
        online
    }
}