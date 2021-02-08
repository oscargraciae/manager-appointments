import HttpClient from './HttpClient';

import { URL_API } from "../config/constants";
import { ICustomersResponse } from '../types/ICustomer';

export class CustomerService extends HttpClient {

  public constructor() {
    super(URL_API);
  }

  
  public getAll = () => this.instance.get<ICustomersResponse>('/customers');
}