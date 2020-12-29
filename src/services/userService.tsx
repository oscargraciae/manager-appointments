import HttpClient from './HttpClient';
import { User, UserResponse } from "../types/User";
import { URL_API } from "../config/constants";

export class UserService extends HttpClient {

  public constructor() {
    super(URL_API);
  }

  public login = (data: User) => this.instance.post<UserResponse>('/users/auth', data);
  public logout = () => this.instance.get<UserResponse>('/users/auth/logout');

  public getMe = () => this.instance.get<UserResponse>('/users');
}