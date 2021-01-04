export interface IService {
  id?: number
  name?: string
  description?: string
  price?: string
  time?: string
}

export interface IServiceResponse {
  success: boolean
  message?: string
  service?: IService
}

export interface IServicesResponse {
  success: boolean
  message?: string
  services?: IService[]
}