import HttpClient from './HttpClient';

import { API_DOMAIN, URL_API } from "../config/constants";

export class CategoryService extends HttpClient {

  public constructor() {
    super(`${API_DOMAIN}/api/v1`);
  }

  public getAll = () => this.instance.get('/categories');
}