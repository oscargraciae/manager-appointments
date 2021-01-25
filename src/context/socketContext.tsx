import React from 'react';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = React.createContext<any>(null);

export const SocketProvider: React.FC = ({ children }) => {
    const { socket, online } = useSocket();
    
    // useEffect(() => {
    //   return socket.emit('end');
    // })

    return (
      <SocketContext.Provider value={{ socket, online }}>
        { children }
      </SocketContext.Provider>
    );
}