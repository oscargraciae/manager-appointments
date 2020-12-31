export interface BusinessAddress {
  id?: number
  street?: string
  area?: string
  city?: string
  state?: string
  zipcode?: string
  lat: number
  lng: number
  addressMap: string
}

export interface BusinessAddressResponse {
  success: boolean
  message?: string
  address?: BusinessAddress
}