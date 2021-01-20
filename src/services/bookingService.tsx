import { URL_API } from "../config/constants";
import { IBooking } from "../types/IBooking";
import { propsToParams } from "../utils/propsToParams";
import HttpClient from "./HttpClient";

export class BookingService extends HttpClient {
  constructor() {
    super(URL_API);
  }

  getAll = (params? :any) => this.instance.get(`/bookings?${propsToParams(params)}`);
  update = (id :number, data :IBooking) => this.instance.put(`/bookings/${id}`, data);
}