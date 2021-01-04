import { URL_API } from "../config/constants";
import { IBusiness, IBusinessResponse } from "../types/Business";
import { IHoursResponse } from "../types/IHour";
import { IService, IServiceResponse, IServicesResponse } from "../types/IService";
import HttpClient from "./HttpClient";

export class BusinessService extends HttpClient {
  constructor() {
    super(URL_API)
  }

  create = (data: IBusiness) => this.instance.post<IBusinessResponse>('/businesses', data);
  update = (data: IBusiness, businessId: number) => this.instance.put<IBusinessResponse>(`/businesses/${businessId}`, data);
  get = () => this.instance.get('/businesses');

  // Api de servicios
  createService = (data: IService, businessId: number) => this.instance.post<IServiceResponse>(`/businesses/${businessId}/services`, data);
  updateService = (data: IService, serviceId: number, businessId: number) => this.instance.put<IServiceResponse>(`/businesses/${businessId}/services/${serviceId}`, data);
  deleteService = (serviceId: number, businessId: number) => this.instance.delete<IServiceResponse>(`/businesses/${businessId}/services/${serviceId}`);
  getServices = (businessId:number) => this.instance.get<IServicesResponse>(`/businesses/${businessId}/services`);

  // Api de horas
  createHours = (data: any, businessId: number) => this.instance.post(`/businesses/${businessId}/hours`, data);
  getHours = (businessId: number) => this.instance.get<IHoursResponse>(`/businesses/${businessId}/hours`);

}