export interface ICustomer {
  firstName: string
  lastName: string
  phone: string
}

export interface ICustomersResponse {
  customers: ICustomer[]
  success: boolean
  message?: string
}