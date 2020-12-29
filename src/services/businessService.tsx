import { URL_API } from "../config/constants";
import { IBusiness, IBusinessResponse } from "../types/Business";
import { IBusinessItemService } from "../types/BusinessService";
import HttpClient from "./HttpClient";

export class BusinessService extends HttpClient {
  constructor() {
    super(URL_API)
  }

  create = (data: IBusiness) => this.instance.post<IBusinessResponse>('/businesses', data);
  update = (data: IBusiness, businessId: number) => this.instance.put<IBusinessResponse>(`/businesses/${businessId}`, data);
  get = () => this.instance.get('/businesses');

  createService = (data: IBusinessItemService, businessId: number) => this.instance.post(`/businesses/${businessId}/services`, data);
  getServices = (businessId:number) => this.instance.get(`/businesses/${businessId}/services`);

}