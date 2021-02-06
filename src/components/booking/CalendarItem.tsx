import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { User } from '../../types/User';

interface CalendarItemProps {
  event: any
}

export const CalendarItem: React.FC<CalendarItemProps> = ({ event }) => {
  const { customer } = event;
  return (
    <Box>
      <Text fontWeight='semibold' isTruncated>{customer.firstName} {customer.lastName}</Text>
    </Box>
  );
}