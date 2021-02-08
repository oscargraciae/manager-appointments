import React from 'react'
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import { ICustomer } from '../../types/ICustomer';
import { formatDate } from '../../utils/formatDate';

interface CustomerListProps {
 customers: ICustomer[]
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <Table variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Telefono</Th>
          <Th>Ultima solicitud</Th>
        </Tr>
      </Thead>
      <Tbody>
        { customers.map((customer: any, index: number) => (
          <Tr key={index}>
            <Td>{customer.firstName} {customer.lastName}</Td>
            <Td>{customer.phone}</Td>
            <Td>{formatDate(customer.bookingCreatedAt)}</Td>
          </Tr>
        )) }
      </Tbody>
    </Table>
  );
}