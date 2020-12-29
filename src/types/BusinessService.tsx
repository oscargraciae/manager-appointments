export interface IBusinessItemService {
  name?: string
  description?: string
  price?: string
  time?: string
}

export interface BusinessServiceResponse {
  success: boolean
  message?: string
  businessAddress?: IBusinessItemService
}