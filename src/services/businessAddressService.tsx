import { URL_API } from "../config/constants";
import { BusinessAddress, BusinessAddressResponse } from "../types/BusinessAddress";
import HttpClient from "./HttpClient";

export class BusinessAddressService extends HttpClient {
  constructor() {
    super(URL_API)
  }

  get = (businessId: number) => this.instance.get<BusinessAddressResponse>(`/businesses/${businessId}/addresses`);
  create = (data: BusinessAddress, businessId: number) => this.instance.post(`/businesses/${businessId}/addresses`, data);
  update = (data: BusinessAddress, businessId: number, id: number) => this.instance.put<BusinessAddressResponse>(`/businesses/${businessId}/addresses/${id}`, data);
}