import { IBookingService } from "./IBookingService";
import { IService } from "./IService";
import { User } from "./User";

export interface IBooking {
  id?: number
  bookingDate?: Date
  bookingTime?: string
  message?: string
  businessId?: number
  totalTime?: number
  totalPrice?: number
  businessServices?: IService[]
  bookingService?: IBookingService[]
  customer?: User
  createdAt?: Date
  bookingStatusId?: number
}