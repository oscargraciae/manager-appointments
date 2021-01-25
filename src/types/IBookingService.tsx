import { IService } from "./IService";

export interface IBookingService {
  id: number
  bookingId: number
  nameService?: string
  priceService?: string
  timeService?: string
  businessService: IService
}