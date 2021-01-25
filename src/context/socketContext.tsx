import { position, useToast } from '@chakra-ui/react';
import React from 'react';
import { useSocket } from '../hooks/useSocket';
import { formatDate } from '../utils/formatDate';
import { formatBookingDate } from '../utils/formatHoursDate';

export const SocketContext = React.createContext<any>(null);

export const SocketProvider: React.FC = ({ children }) => {
  // hooks
  const toast = useToast();
  const { socket, online } = useSocket();
  
  socket.on('new-booking', (data :any) => {
    console.log('Socket data', data);
    
    toast({
      title: 'Nueva reservación',
      description: `${formatDate(data.bookingDate)}`,
      status: 'success',
      position: 'top',
    })
  });
  
  return (
    <SocketContext.Provider value={{ socket, online }}>
      { children }
    </SocketContext.Provider>
  );
}