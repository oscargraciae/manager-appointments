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

  createHours = (data: any, businessId: number) => this.instance.post(`/businesses/${businessId}/hours`, data);
  getHours = (businessId: number) => this.instance.get<IHoursResponse>(`/businesses/${businessId}/hours`);

  uplaodCover = (data :any) => this.instance.post('/businesses/upload/cover', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });

  uplaodGallery = (data :any) => this.instance.post('/businesses/upload/photos', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });

  deletePhoto = (id :number) => this.instance.delete(`/businesses/upload/photos/${id}`);
  getPhotos = () => this.instance.get('/businesses/upload/photos');

  // API DE SERVICIOS
  createService = (data: IService, businessId: number) => this.instance.post<IServiceResponse>(`/businesses/${businessId}/services`, data);
  updateService = (data: IService, serviceId: number, businessId: number) => this.instance.put<IServiceResponse>(`/businesses/${businessId}/services/${serviceId}`, data);
  deleteService = (serviceId: number, businessId: number) => this.instance.delete<IServiceResponse>(`/businesses/${businessId}/services/${serviceId}`);
  getServices = (businessId:number) => this.instance.get<IServicesResponse>(`/businesses/${businessId}/services`);
}